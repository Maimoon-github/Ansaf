from django.contrib import admin
from .models import Category, Post, Comment


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
	list_display = ("name", "parent", "slug", "created_at")
	search_fields = ("name",)
	prepopulated_fields = {"slug": ("name",)}


class CommentInline(admin.TabularInline):
	model = Comment
	fields = ("author", "content", "is_approved", "created_at")
	extra = 0
	readonly_fields = ("created_at",)


@admin.action(description="Approve selected comments")
def approve_comments(modeladmin, request, queryset):
	queryset.update(is_approved=True)


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
	list_display = ("title", "author", "status", "published_at", "views_count")
	list_filter = ("status", "author", "categories")
	search_fields = ("title", "content", "excerpt")
	prepopulated_fields = {"slug": ("title",)}
	filter_horizontal = ("categories",)
	inlines = [CommentInline]
	actions = ["publish_selected"]

	@admin.action(description="Publish selected draft posts")
	def publish_selected(self, request, queryset):
		for post in queryset.filter(status=Post.STATUS_DRAFT):
			post.status = Post.STATUS_PUBLISHED
			post.save()


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
	list_display = ("post", "author", "is_approved", "created_at", "parent")
	list_filter = ("is_approved", "created_at")
	search_fields = ("content", "author__username", "post__title")
	actions = [approve_comments]
