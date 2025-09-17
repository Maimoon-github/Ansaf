from django.contrib import admin
from .models import Page


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
	list_display = ("title", "slug", "status", "published_at", "updated_at")
	list_filter = ("status", "published_at", "updated_at")
	search_fields = ("title", "slug", "content", "meta_title", "meta_description")
	prepopulated_fields = {"slug": ("title",)}
	ordering = ("-published_at", "-updated_at")
	readonly_fields = ("created_at", "updated_at")
