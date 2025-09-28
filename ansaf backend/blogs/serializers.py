# from rest_framework import serializers
# from taggit.serializers import (TagListSerializerField, TaggitSerializer)
# from drf_spectacular.utils import extend_schema_field
# from .models import Post, Category, Comment
# from typing import Any, Dict, List


# class CategorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Category
#         fields = ["id", "name", "slug", "parent"]


# class CommentSerializer(serializers.ModelSerializer):
#     author_username = serializers.CharField(source="author.username", read_only=True)
#     replies = serializers.SerializerMethodField()

#     class Meta:
#         model = Comment
#         fields = [
#             "id",
#             "post",
#             "author",
#             "author_username",
#             "parent",
#             "content",
#             "is_approved",
#             "created_at",
#             "updated_at",
#             "replies",
#         ]
#         read_only_fields = ("is_approved", "created_at", "updated_at")

#     @extend_schema_field(serializers.ListSerializer(child=serializers.DictField()))
#     def get_replies(self, obj: Comment) -> List[Dict[str, Any]]:
#         # Only include approved replies
#         qs = obj.replies.filter(is_approved=True)
#         return CommentSerializer(qs, many=True, context=self.context).data


# class PostSerializer(TaggitSerializer, serializers.ModelSerializer):
#     author_username = serializers.CharField(source="author.username", read_only=True)
#     categories = CategorySerializer(many=True, read_only=True)
#     category_ids = serializers.PrimaryKeyRelatedField(
#         queryset=Category.objects.all(), many=True, write_only=True, required=False
#     )
#     tags = TagListSerializerField(required=False)

#     class Meta:
#         model = Post
#         fields = [
#             "id",
#             "title",
#             "slug",
#             "author",
#             "author_username",
#             "content",
#             "excerpt",
#             "status",
#             "published_at",
#             "created_at",
#             "updated_at",
#             "version",
#             "cover_image",
#             "views_count",
#             "categories",
#             "category_ids",
#             "tags",
#         ]
#         read_only_fields = ("slug", "views_count", "created_at", "updated_at", "version", "author")

#     def create(self, validated_data):
#         # Automatically set the author from the request user
#         validated_data['author'] = self.context['request'].user
#         category_ids = validated_data.pop("category_ids", [])
#         tags = validated_data.pop("tags", [])
#         post = super().create(validated_data)
#         if category_ids:
#             post.categories.set(category_ids)
#         if tags:
#             post.tags.set(tags)
#         return post

#     def update(self, instance, validated_data):
#         category_ids = validated_data.pop("category_ids", None)
#         tags = validated_data.pop("tags", None)
#         post = super().update(instance, validated_data)
#         if category_ids is not None:
#             post.categories.set(category_ids)
#         if tags is not None:
#             post.tags.set(tags)
#         return post











# -----------------------------------------------------------------------------------------











from rest_framework import serializers
from taggit.serializers import TagListSerializerField, TaggitSerializer
from drf_spectacular.utils import extend_schema_field
from .models import Post, Category, Comment, Reaction
from typing import Any, Dict, List
# serializers.py (in PostWriteSerializer)
import bleach

ALLOWED_TAGS = bleach.sanitizer.ALLOWED_TAGS + ["p","img","h2","h3","blockquote","ul","ol","li"]
ALLOWED_ATTRS = {"img": ["src","alt","width","height"], "*": ["class","id"]}

def validate_content(self, value):
    cleaned = bleach.clean(value, tags=ALLOWED_TAGS, attributes=ALLOWED_ATTRS, strip=True)
    return cleaned


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
            "author_name",
            "author_email_hash",
            "parent",
            "content",
            "is_approved",
            "created_at",
            "updated_at",
            "replies",
        ]
        read_only_fields = ("is_approved", "created_at", "updated_at")

    @extend_schema_field(serializers.ListSerializer(child=serializers.DictField()))
    def get_replies(self, obj: Comment) -> List[Dict[str, Any]]:
        qs = obj.replies.filter(is_approved=True)
        return CommentSerializer(qs, many=True, context=self.context).data

class PostListSerializer(TaggitSerializer, serializers.ModelSerializer):
    author_username = serializers.CharField(source="author.username", read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    tags = TagListSerializerField(required=False)

    class Meta:
        model = Post
        fields = [
            "id",
            "title",
            "slug",
            "author",
            "author_username",
            "summary",
            "excerpt",
            "published_at",
            "cover_image",
            "featured_image_url",
            "views_count",
            "reading_time_minutes",
            "meta_title",
            "meta_description",
            "categories",
            "tags",
        ]
        read_only_fields = fields

class PostDetailSerializer(PostListSerializer):
    class Meta(PostListSerializer.Meta):
        fields = PostListSerializer.Meta.fields + [
            "content",
            "canonical_url",
            "likes_count",
            "allow_comments",
            "created_at",
            "updated_at",
            "version",
        ]
        read_only_fields = fields

class PostWriteSerializer(TaggitSerializer, serializers.ModelSerializer):
    category_ids = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), many=True, write_only=True, required=False
    )
    tags = TagListSerializerField(required=False)

    class Meta:
        model = Post
        fields = [
            "title",
            "content",
            "summary",
            "excerpt",
            "status",
            "published_at",
            "cover_image",
            "featured_image_url",
            "reading_time_minutes",
            "allow_comments",
            "meta_title",
            "meta_description",
            "canonical_url",
            "category_ids",
            "tags",
        ]

    def create(self, validated_data):
        user = self.context["request"].user
        validated_data["author"] = user
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

class ReactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reaction
        fields = ["id", "post", "user", "anon_token", "type", "created_at"]
        read_only_fields = ["id", "created_at", "user"]

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user if self.context["request"].user.is_authenticated else None
        return super().create(validated_data)
