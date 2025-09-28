"""
Django admin registrations for the blogs app.

Formatting-only refactor: no behavioral changes.
- CategoryAdmin
- PostAdmin (+ CommentInline and publish_selected action)
- CommentAdmin (+ approve_comments action)
- ReactionAdmin
- MediaAssetAdmin
"""

from django.contrib import admin

from .models import Category, Post, Comment, Reaction, MediaAsset

from django.contrib import admin
from .models import Post
# Admin actions
# ------------------------------------------------------------------------------


@admin.action(description="Approve selected comments")
def approve_comments(modeladmin, request, queryset):
    """Mark comments as approved in bulk."""
    queryset.update(is_approved=True)


# ------------------------------------------------------------------------------
# Inlines
# ------------------------------------------------------------------------------


class CommentInline(admin.TabularInline):
    """Inline for showing comments within Post admin."""
    model = Comment
    fields = ("author", "author_name", "content", "is_approved", "created_at")
    extra = 0
    readonly_fields = ("created_at",)


# ------------------------------------------------------------------------------
# Category admin
# ------------------------------------------------------------------------------


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "parent", "slug", "created_at")
    search_fields = ("name",)
    prepopulated_fields = {"slug": ("name",)}


# ------------------------------------------------------------------------------
# Post admin
# ------------------------------------------------------------------------------


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "author",
        "status",
        "published_at",
        "views_count",
        "likes_count",
        "allow_comments",
    )
    list_filter = ("status", "author", "categories", "allow_comments")
    search_fields = (
        "title",
        "body",
        "excerpt",
        "summary",
        "meta_title",
        "meta_description",
    )
    prepopulated_fields = {"slug": ("title",)}
    filter_horizontal = ("categories",)
    inlines = [CommentInline]
    actions = ["publish_selected"]

    @admin.action(description="Publish selected draft posts")
    def publish_selected(self, request, queryset):
        """Publish all selected posts that are currently drafts."""
        for post in queryset.filter(status=Post.STATUS_DRAFT):
            post.status = Post.STATUS_PUBLISHED
            post.save()


# ------------------------------------------------------------------------------
# Comment admin
# ------------------------------------------------------------------------------


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ("post", "author", "author_name", "is_approved", "created_at", "parent")
    list_filter = ("is_approved", "created_at")
    search_fields = ("content", "author__username", "author_name", "post__title")
    actions = [approve_comments]


# ------------------------------------------------------------------------------
# Reaction admin
# ------------------------------------------------------------------------------


@admin.register(Reaction)
class ReactionAdmin(admin.ModelAdmin):
    list_display = ("post", "user", "type", "created_at")
    list_filter = ("type",)


# ------------------------------------------------------------------------------
# MediaAsset admin
# ------------------------------------------------------------------------------


@admin.register(MediaAsset)
class MediaAssetAdmin(admin.ModelAdmin):
    list_display = ("file_url", "uploader", "mime_type", "width", "height", "created_at")
    search_fields = ("file_url", "mime_type")
