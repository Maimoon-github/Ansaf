from django.conf import settings
from django.db import models
from django.utils import timezone
from django.utils.text import slugify
from taggit.managers import TaggableManager


class Category(models.Model):
	name = models.CharField(max_length=120, unique=True)
	slug = models.SlugField(max_length=140, unique=True, blank=True)
	parent = models.ForeignKey(
		"self", related_name="children", on_delete=models.CASCADE, null=True, blank=True
	)
	created_at = models.DateTimeField(auto_now_add=True)

	class Meta:
		verbose_name_plural = "Categories"
		ordering = ["name"]

	def __str__(self):
		return self.name

	def save(self, *args, **kwargs):
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


class Post(models.Model):
	STATUS_DRAFT = "draft"
	STATUS_PUBLISHED = "published"
	STATUS_CHOICES = (
		(STATUS_DRAFT, "Draft"),
		(STATUS_PUBLISHED, "Published"),
	)

	title = models.CharField(max_length=255)
	slug = models.SlugField(max_length=255, unique=True, blank=True)
	author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="posts")
	content = models.TextField()
	excerpt = models.CharField(max_length=512, blank=True)
	status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=STATUS_DRAFT)
	published_at = models.DateTimeField(null=True, blank=True, help_text="When the post becomes public")
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)
	cover_image = models.ImageField(upload_to="posts/covers/", null=True, blank=True)
	views_count = models.PositiveBigIntegerField(default=0, editable=False)
	categories = models.ManyToManyField(Category, related_name="posts", blank=True)
	tags = TaggableManager(blank=True)

	class Meta:
		ordering = ["-published_at", "-created_at"]
		indexes = [
			models.Index(fields=["status", "published_at"]),
		]

	def __str__(self):
		return self.title

	def is_published(self):
		return self.status == self.STATUS_PUBLISHED and (
			self.published_at and self.published_at <= timezone.now()
		)

	def save(self, *args, **kwargs):
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
		# Auto set published_at if moving to published without timestamp
		if self.status == self.STATUS_PUBLISHED and not self.published_at:
			self.published_at = timezone.now()
		super().save(*args, **kwargs)


class Comment(models.Model):
	post = models.ForeignKey(Post, related_name="comments", on_delete=models.CASCADE)
	author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="comments")
	parent = models.ForeignKey(
		"self", related_name="replies", on_delete=models.CASCADE, null=True, blank=True
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
		return f"Comment by {self.author} on {self.post}"

	@property
	def is_root(self):
		return self.parent_id is None
