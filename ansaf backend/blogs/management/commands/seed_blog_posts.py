from django.core.management.base import BaseCommand
from django.utils import timezone
from django.contrib.auth import get_user_model

from blogs.models import Post


class Command(BaseCommand):
    help = "Seed example blog posts used by the frontend (creates a fallback author if needed)."

    def add_arguments(self, parser):
        parser.add_argument(
            "--slug",
            dest="slug",
            help="Slug to create (default: wheelchair-jeans)",
            default="wheelchair-jeans",
        )
        parser.add_argument(
            "--title",
            dest="title",
            help="Title for the seeded post",
            default="Jeans for Wheelchair Users Women USA | Seated Rise, Easy Closures, Real Comfort",
        )
        parser.add_argument(
            "--published",
            dest="published",
            action="store_true",
            help="Mark the seeded post as published (published_at set to now)",
        )

    def handle(self, *args, **options):
        slug = options["slug"]
        title = options["title"]
        published_flag = options["published"]

        User = get_user_model()
        author, created = User.objects.get_or_create(
            username="importer",
            defaults={
                "email": "importer@example.local",
                "is_active": True,
            },
        )
        if created:
            # If the user model has set_password, we avoid calling it here; password not needed.
            self.stdout.write(self.style.SUCCESS(f"Created fallback author user: {author.username}"))

        post_qs = Post.objects.filter(slug=slug)
        if post_qs.exists():
            self.stdout.write(self.style.WARNING(f"Post with slug '{slug}' already exists - skipping."))
            return

        post = Post(
            title=title,
            slug=slug,
            author=author,
            body="<p>Imported placeholder post to satisfy frontend blog detail requests.</p>",
            excerpt="Imported placeholder post used by the local frontend.",
            summary="Imported placeholder post used by the local frontend.",
            status=Post.STATUS_PUBLISHED if published_flag else Post.STATUS_PUBLISHED,
            published_at=timezone.now() if published_flag or True else None,
        )
        post.save()

        self.stdout.write(self.style.SUCCESS(f"Created post '{post.slug}' (id={post.id})"))