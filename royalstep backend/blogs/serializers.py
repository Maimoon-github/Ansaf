from rest_framework import serializers
from taggit.serializers import (TagListSerializerField, TaggitSerializer)
from .models import Post, Category, Comment


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "slug", "parent"]


class CommentSerializer(serializers.ModelSerializer):
    author_username = serializers.CharField(source="author.username", read_only=True)
    replies = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = [
            "id",
            "post",
            "author",
            "author_username",
            "parent",
            "content",
            "is_approved",
            "created_at",
            "updated_at",
            "replies",
        ]
        read_only_fields = ("is_approved", "created_at", "updated_at")

    def get_replies(self, obj):
        # Only include approved replies
        qs = obj.replies.filter(is_approved=True)
        return CommentSerializer(qs, many=True, context=self.context).data


class PostSerializer(TaggitSerializer, serializers.ModelSerializer):
    author_username = serializers.CharField(source="author.username", read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    category_ids = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), many=True, write_only=True, required=False
    )
    tags = TagListSerializerField(required=False)

    class Meta:
        model = Post
        fields = [
            "id",
            "title",
            "slug",
            "author",
            "author_username",
            "content",
            "excerpt",
            "status",
            "published_at",
            "created_at",
            "updated_at",
            "cover_image",
            "views_count",
            "categories",
            "category_ids",
            "tags",
        ]
        read_only_fields = ("slug", "views_count", "created_at", "updated_at")

    def create(self, validated_data):
        category_ids = validated_data.pop("category_ids", [])
        tags = validated_data.pop("tags", [])
        post = super().create(validated_data)
        if category_ids:
            post.categories.set(category_ids)
        if tags:
            post.tags.set(tags)
        return post

    def update(self, instance, validated_data):
        category_ids = validated_data.pop("category_ids", None)
        tags = validated_data.pop("tags", None)
        post = super().update(instance, validated_data)
        if category_ids is not None:
            post.categories.set(category_ids)
        if tags is not None:
            post.tags.set(tags)
        return post
