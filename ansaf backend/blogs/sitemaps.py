"""blogs/sitemaps.py

Django sitemap for blog posts.

Formatting-only refactor: preserved original behavior and queries exactly.
"""

from django.contrib.sitemaps import Sitemap
from django.utils import timezone

from .models import Post, Category


class PostSitemap(Sitemap):
    """Sitemap for published blog posts."""

    changefreq = "weekly"
    priority = 0.8

    def items(self):
        """
        Return only published, publicly visible posts ordered by publication date.

        Matches original behavior:
          Post.STATUS_PUBLISHED, published_at not null, published_at <= now()
        """
        return (
            Post.objects.filter(
                status=Post.STATUS_PUBLISHED,
                published_at__isnull=False,
                published_at__lte=timezone.now(),
            )
            .order_by("-published_at")
        )

    def lastmod(self, obj):
        """Return the most recent modification timestamp available for the post."""
        return getattr(obj, "updated_at", getattr(obj, "published_at", None))
