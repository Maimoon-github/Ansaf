from rest_framework import serializers
from taggit.serializers import (TagListSerializerField, TaggitSerializer)
from .models import Page, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "slug", "parent"]


class PageListSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source="author.username", read_only=True)

    class Meta:
        model = Page
        fields = [
            "id",
            "title",
            "slug",
            "status",
            "published_at",
            "author_username",
            "meta_title",
            "meta_description",
            "updated_at",
            "views_count",
            "tags",
        ]


class PageDetailSerializer(TaggitSerializer, serializers.ModelSerializer):
    author_username = serializers.CharField(source="author.username", read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    category_ids = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), many=True, write_only=True, required=False
    )
    tags = TagListSerializerField(required=False)

    class Meta:
        model = Page
        fields = [
            "id",
            "title",
            "slug",
            "content",
            "excerpt",
            "status",
            "published_at",
            "author",
            "author_username",
            "meta_title",
            "meta_description",
            "og_image",
            "created_at",
            "updated_at",
            "version",
            "cover_image",
            "views_count",
            "categories",
            "category_ids",
            "tags",
        ]
        read_only_fields = ["author", "version"]

    def create(self, validated_data):
        # Automatically set the author from the request user
        validated_data['author'] = self.context['request'].user
        category_ids = validated_data.pop("category_ids", [])
        tags = validated_data.pop("tags", [])
        page = super().create(validated_data)
        if category_ids:
            page.categories.set(category_ids)
        if tags:
            page.tags.set(tags)
        return page

    def update(self, instance, validated_data):
        category_ids = validated_data.pop("category_ids", None)
        tags = validated_data.pop("tags", None)
        page = super().update(instance, validated_data)
        if category_ids is not None:
            page.categories.set(category_ids)
        if tags is not None:
            page.tags.set(tags)
        return page
