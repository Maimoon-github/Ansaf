"""
Django blog models — reorganized for clarity.
No behavioral changes: same fields, same methods, same defaults/indexes.

Classes:
- Category
- Post
- Comment
- Reaction
- MediaAsset
"""

from django.conf import settings
from django.db import models
from django.utils import timezone
from django.utils.text import slugify

from taggit.managers import TaggableManager

import uuid


# ---------------------------------------------------------------------------
# Category
# ---------------------------------------------------------------------------
class Category(models.Model):
    """
    Hierarchical category for posts.
    Keeps a unique slug and optional parent pointer.
    """
    name = models.CharField(max_length=120, unique=True)
    slug = models.SlugField(max_length=140, unique=True, blank=True)
    parent = models.ForeignKey(
        "self",
        related_name="children",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ["name"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        """
        Auto-generate a unique slug if missing. Keeps slug <= 140 chars.
        """
        if not self.slug:
            base = slugify(self.name)[:140]
            slug = base
            i = 1
            while Category.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                suffix = f"-{i}"
                trim = 140 - len(suffix)
                slug = f"{base[:trim]}{suffix}"
                i += 1
            self.slug = slug
        super().save(*args, **kwargs)


# ---------------------------------------------------------------------------
# Post
# ---------------------------------------------------------------------------
class Post(models.Model):
    """
    Blog post model.
    Includes legacy and new SEO/listing fields while preserving existing behaviour.
    """
    # Status constants
    STATUS_DRAFT = "draft"
    STATUS_PUBLISHED = "published"
    STATUS_ARCHIVED = "archived"
    STATUS_CHOICES = (
        (STATUS_DRAFT, "Draft"),
        (STATUS_PUBLISHED, "Published"),
        (STATUS_ARCHIVED, "Archived"),
    )

    # Core content
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="posts",
    )
    content = models.TextField()  # sanitized HTML expected
    excerpt = models.CharField(max_length=512, blank=True)  # legacy summary
    summary = models.TextField(blank=True)  # short summary for listings/SEO

    # Publishing metadata
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=STATUS_DRAFT)
    published_at = models.DateTimeField(null=True, blank=True, help_text="When the post becomes public")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Versioning / analytics
    version = models.PositiveIntegerField(default=1, help_text="Version for optimistic locking")
    cover_image = models.ImageField(upload_to="posts/covers/", null=True, blank=True)
    featured_image_url = models.URLField(blank=True)  # for CDN/external asset references
    views_count = models.PositiveBigIntegerField(default=0, editable=False)
    likes_count = models.PositiveIntegerField(default=0, editable=False)
    reading_time_minutes = models.PositiveIntegerField(null=True, blank=True)
    allow_comments = models.BooleanField(default=True)

    # SEO fields
    meta_title = models.CharField(max_length=255, blank=True)
    meta_description = models.CharField(max_length=320, blank=True)
    canonical_url = models.URLField(blank=True)

    # Taxonomy
    categories = models.ManyToManyField(Category, related_name="posts", blank=True)
    tags = TaggableManager(blank=True)

    class Meta:
        ordering = ["-published_at", "-created_at"]
        indexes = [
            models.Index(fields=["status", "published_at"]),
            models.Index(fields=["slug"]),
        ]

    def __str__(self):
        return self.title

    def is_published(self):
        """
        Returns True if post is published and its published_at is in the past (or now).
        """
        return (
            self.status == self.STATUS_PUBLISHED
            and self.published_at is not None
            and self.published_at <= timezone.now()
        )

    def save(self, *args, **kwargs):
        """
        - Auto-generate a unique slug on first save (keeps <= 255 chars).
        - If moving to published without published_at, set published_at to now.
        - Increment version on updates (only when pk exists).
        """
        if not self.slug:
            base = slugify(self.title)[:255]
            slug = base
            i = 1
            while Post.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                suffix = f"-{i}"
                trim = 255 - len(suffix)
                slug = f"{base[:trim]}{suffix}"
                i += 1
            self.slug = slug

        if self.status == self.STATUS_PUBLISHED and not self.published_at:
            self.published_at = timezone.now()

        if self.pk:
            self.version += 1

        super().save(*args, **kwargs)

    def get_absolute_url(self):
        """
        Returns canonical path used by the API/frontend.
        Keep this method if frontend or sitemap expects /blogs/posts/{slug}/
        """
        return f"/blogs/posts/{self.slug}/"


# ---------------------------------------------------------------------------
# Comment
# ---------------------------------------------------------------------------
class Comment(models.Model):
    """
    Comments tied to posts. Supports anonymous/minimal author details for privacy.
    """
    post = models.ForeignKey(Post, related_name="comments", on_delete=models.CASCADE)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="comments",
        null=True,
        blank=True,
    )

    # Optional anonymous fields — never store raw email publicly
    author_name = models.CharField(max_length=120, blank=True)
    author_email_hash = models.CharField(max_length=64, blank=True)

    parent = models.ForeignKey(
        "self",
        related_name="replies",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    content = models.TextField()
    is_approved = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.CharField(max_length=255, blank=True)

    class Meta:
        ordering = ["created_at"]
        indexes = [
            models.Index(fields=["post", "created_at"]),
        ]

    def __str__(self):
        who = self.author or self.author_name or "Anonymous"
        return f"Comment by {who} on {self.post}"

    @property
    def is_root(self):
        return self.parent_id is None


# ---------------------------------------------------------------------------
# Reaction
# ---------------------------------------------------------------------------
class Reaction(models.Model):
    """
    Lightweight reaction model for posts. Supports anonymous dedup via anon_token.
    """
    LIKE = "like"
    LOVE = "love"
    WOW = "wow"

    REACTION_CHOICES = (
        (LIKE, "Like"),
        (LOVE, "Love"),
        (WOW, "Wow"),
    )

    id = models.BigAutoField(primary_key=True)
    post = models.ForeignKey(Post, related_name="reactions", on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    anon_token = models.CharField(max_length=64, blank=True)  # signed cookie/device hash for dedupe
    type = models.CharField(max_length=16, choices=REACTION_CHOICES, default=LIKE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        # preserve the original uniqueness constraints
        unique_together = (("post", "user", "type"), ("post", "anon_token", "type"))

    def __str__(self):
        return f"{self.type} on {self.post_id}"


# ---------------------------------------------------------------------------
# MediaAsset
# ---------------------------------------------------------------------------
class MediaAsset(models.Model):
    """
    Reference to externally-hosted media (CDN/object storage).
    Stored as URL + optional width/height metadata.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    uploader = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="media_assets")
    file_url = models.URLField()
    mime_type = models.CharField(max_length=100, blank=True)
    width = models.PositiveIntegerField(null=True, blank=True)
    height = models.PositiveIntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file_url
