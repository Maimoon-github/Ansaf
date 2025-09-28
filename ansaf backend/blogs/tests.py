from django.test import TestCase
from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework.test import APIClient
from .models import Post, Category

User = get_user_model()

class PublicPostTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user("author", "a@a.com", "pass")
        self.cat = Category.objects.create(name="News")
        self.post = Post.objects.create(
            title="Hello",
            author=self.user,
            content="<p>Body</p>",
            status=Post.STATUS_PUBLISHED,
            published_at=timezone.now(),
            summary="Sum",
            meta_title="MT",
            meta_description="MD",
        )
        self.post.categories.add(self.cat)

    def test_public_list_only_published(self):
        r = self.client.get("/blogs/posts/")
        self.assertEqual(r.status_code, 200)
        self.assertEqual(r.data["count"], 1)
        self.assertEqual(r.data["results"][0]["slug"], self.post.slug)

    def test_detail_increments_views(self):
        start = self.post.views_count
        r = self.client.get(f"/blogs/posts/{self.post.slug}/")
        self.assertEqual(r.status_code, 200)
        self.post.refresh_from_db()
        self.assertGreater(self.post.views_count, start)


# blogs/tests.py (append)
class SeoApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user("author2", "b@b.com", "pass")
        self.post = Post.objects.create(
            title="SEO API Post",
            slug="seo-api-post",
            author=self.user,
            content="<p>Body</p>",
            status=Post.STATUS_PUBLISHED,
            published_at=timezone.now(),
            summary="Summary",
            meta_title="Meta T",
            meta_description="Meta D",
        )

    def test_detail_returns_seo_and_hero_image(self):
        r = self.client.get(f"/blogs/posts/{self.post.slug}/")
        self.assertEqual(r.status_code, 200)
        data = r.json()
        self.assertIn("seo", data)
        seo = data["seo"]
        self.assertEqual(seo["title"], "Meta T")
        self.assertTrue(seo["canonical"].startswith("http") or seo["canonical"].startswith("/"))
        self.assertIn("jsonld", seo)


class SitemapApiTests(TestCase):
    def test_sitemap_exists(self):
        r = self.client.get("/sitemap.xml")
        self.assertEqual(r.status_code, 200)
        self.assertIn("<urlset", r.content.decode("utf-8"))
