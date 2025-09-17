from rest_framework import serializers
from .models import Page

class PageListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = [
            "id",
            "title",
            "slug",
            "status",
            "published_at",
            "meta_title",
            "meta_description",
            "updated_at",
        ]

class PageDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = [
            "id",
            "title",
            "slug",
            "content",
            "status",
            "published_at",
            "author",
            "meta_title",
            "meta_description",
            "og_image",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["author"]
