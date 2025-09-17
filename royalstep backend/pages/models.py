from django.conf import settings
from django.db import models
from django.utils import timezone
from django.utils.text import slugify
import bleach

# Sanitization allow-lists (extend later if needed)
ALLOWED_TAGS = sorted(set(bleach.sanitizer.ALLOWED_TAGS) | {"p", "h1", "h2", "h3", "pre", "img", "figure", "figcaption"})
ALLOWED_ATTRIBUTES = {
	**bleach.sanitizer.ALLOWED_ATTRIBUTES,
	"img": ["src", "alt", "title"],
	"a": ["href", "title", "rel"],
}
ALLOWED_PROTOCOLS = ["http", "https", "mailto"]


class PageQuerySet(models.QuerySet):
	def published(self):
		now = timezone.now()
		return self.filter(status=Page.STATUS_PUBLISHED, published_at__lte=now)

	def drafts(self):
		return self.filter(status=Page.STATUS_DRAFT)


class Page(models.Model):
	STATUS_DRAFT = "draft"
	STATUS_PUBLISHED = "published"
	STATUS_CHOICES = (
		(STATUS_DRAFT, "Draft"),
		(STATUS_PUBLISHED, "Published"),
	)

	title = models.CharField(max_length=255)
	slug = models.SlugField(max_length=255, unique=True, blank=True)
	content = models.TextField(blank=True)
	status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=STATUS_DRAFT)
	published_at = models.DateTimeField(null=True, blank=True)
	author = models.ForeignKey(
		settings.AUTH_USER_MODEL,
		on_delete=models.SET_NULL,
		null=True,
		blank=True,
		related_name="pages",
	)
	meta_title = models.CharField(max_length=255, blank=True)
	meta_description = models.CharField(max_length=320, blank=True)
	og_image = models.ImageField(upload_to="pages/og/", null=True, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	objects = PageQuerySet.as_manager()

	class Meta:
		ordering = ["-published_at", "-updated_at"]
		indexes = [
			models.Index(fields=["slug"]),
			models.Index(fields=["status"]),
			models.Index(fields=["published_at"]),
		]

	def __str__(self):  # pragma: no cover - trivial
		return self.title

	def is_published(self):
		return (
			self.status == self.STATUS_PUBLISHED
			and self.published_at is not None
			and self.published_at <= timezone.now()
		)

	def save(self, *args, **kwargs):
		# Slug generation (will refactor to helper in separate step)
		if not self.slug and self.title:
			base = slugify(self.title)[:255]
			slug = base
			i = 1
			while Page.objects.filter(slug=slug).exclude(pk=self.pk).exists():
				suffix = f"-{i}"
				trim = 255 - len(suffix)
				slug = f"{base[:trim]}{suffix}"
				i += 1
			self.slug = slug
		# Auto set published_at if publishing now
		if self.status == self.STATUS_PUBLISHED and not self.published_at:
			self.published_at = timezone.now()
		# Sanitize content defensively
		if self.content:
			self.content = bleach.clean(
				self.content,
				tags=ALLOWED_TAGS,
				attributes=ALLOWED_ATTRIBUTES,
				protocols=ALLOWED_PROTOCOLS,
				strip=True,
			)
		super().save(*args, **kwargs)

