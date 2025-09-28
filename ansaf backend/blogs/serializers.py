# serializers.py
# Reorganized for clarity — NO behavioral changes.
# - Preserves all serializers, fields and methods from the original file.
# - Kept legacy commented code at top for reference.

# -----------------------------------------------------------------------------------------
# Legacy / commented examples (kept as-is)
# -----------------------------------------------------------------------------------------
# from rest_framework import serializers
# from taggit.serializers import (TagListSerializerField, TaggitSerializer)
# from drf_spectacular.utils import extend_schema_field
# from .models import Post, Category, Comment
# from typing import Any, Dict, List
#
#
# class CategorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Category
#         fields = ["id", "name", "slug", "parent"]
#
#
# class CommentSerializer(serializers.ModelSerializer):
#     author_username = serializers.CharField(source="author.username", read_only=True)
#     replies = serializers.SerializerMethodField()
#
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
#
#     @extend_schema_field(serializers.ListSerializer(child=serializers.DictField()))
#     def get_replies(self, obj: Comment) -> List[Dict[str, Any]]:
#         # Only include approved replies
#         qs = obj.replies.filter(is_approved=True)
#         return CommentSerializer(qs, many=True, context=self.context).data
#
#
# class PostSerializer(TaggitSerializer, serializers.ModelSerializer):
#     author_username = serializers.CharField(source="author.username", read_only=True)
#     categories = CategorySerializer(many=True, read_only=True)
#     category_ids = serializers.PrimaryKeyRelatedField(
#         queryset=Category.objects.all(), many=True, write_only=True, required=False
#     )
#     tags = TagListSerializerField(required=False)
#
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
#
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
#
#     def update(self, instance, validated_data):
#         category_ids = validated_data.pop("category_ids", None)
#         tags = validated_data.pop("tags", None)
#         post = super().update(instance, validated_data)
#         if category_ids is not None:
#             post.categories.set(category_ids)
#         if tags is not None:
#             post.tags.set(tags)
#         return post
#
# -----------------------------------------------------------------------------------------

# -----------------------------------------------------------------------------------------
# Imports
# -----------------------------------------------------------------------------------------
from typing import Any, Dict, List

import json
import bleach

from django.conf import settings
from django.utils.html import strip_tags
from django.utils.timezone import localtime

from rest_framework import serializers
from taggit.serializers import TagListSerializerField, TaggitSerializer
from drf_spectacular.utils import extend_schema_field

from .models import Post, Category, Comment, Reaction

# -----------------------------------------------------------------------------------------
# Bleach configuration (content sanitization helper)
# -----------------------------------------------------------------------------------------
ALLOWED_TAGS = bleach.sanitizer.ALLOWED_TAGS.union(
    {"p", "img", "h2", "h3", "blockquote", "ul", "ol", "li"}
)
ALLOWED_ATTRS = {"img": ["src", "alt", "width", "height"], "*": ["class", "id"]}


def validate_content(self, value):
    """
    Helper sanitizer function (kept as top-level helper exactly as in original file).
    If used as a method, it matches the original signature.
    """
    cleaned = bleach.clean(value, tags=ALLOWED_TAGS, attributes=ALLOWED_ATTRS, strip=True)
    return cleaned


# -----------------------------------------------------------------------------------------
# Serializers
# -----------------------------------------------------------------------------------------
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
    seo = serializers.SerializerMethodField()
    hero_image = serializers.SerializerMethodField()

    class Meta(PostListSerializer.Meta):
        fields = PostListSerializer.Meta.fields + [
            "content",
            "canonical_url",
            "likes_count",
            "allow_comments",
            "created_at",
            "updated_at",
            "version",
            "seo",
            "hero_image",
        ]
        read_only_fields = fields

    # -------------------------
    # SEO helpers
    # -------------------------
    def get_seo(self, obj):
        """
        Return a structured SEO object for frontend to render meta tags and JSON-LD.
        Behavior preserved exactly as original.
        """
        site_url = getattr(settings, "SITE_URL", "")
        # Title precedence
        title = obj.meta_title or getattr(obj, "meta_title", None) or obj.title
        description = (obj.meta_description or obj.summary or obj.excerpt or "")
        description = strip_tags(description)[:320]
        canonical = obj.canonical_url if obj.canonical_url else (site_url.rstrip("/") + obj.get_absolute_url())
        robots = "noindex, nofollow" if getattr(obj, "noindex", False) else "index, follow"

        # JSON-LD minimal BlogPosting (frontend may choose to render it as script)
        jsonld = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "mainEntityOfPage": {"@type": "WebPage", "@id": canonical},
            "headline": title,
            "description": description,
            "datePublished": obj.published_at.isoformat() if obj.published_at else None,
            "dateModified": (obj.updated_at.isoformat() if obj.updated_at else None),
            "author": {
                "@type": "Person",
                "name": getattr(obj.author, "get_full_name", lambda: obj.author.username)() if obj.author else None,
            },
            "publisher": {
                "@type": "Organization",
                "name": getattr(settings, "PUBLISHER_NAME", settings.SITE_NAME),
                "logo": {"@type": "ImageObject", "url": getattr(settings, "PUBLISHER_LOGO", "")},
            },
        }

        hero = self.get_hero_image_dict(obj)
        if hero and hero.get("src"):
            jsonld["image"] = [hero["src"]]

        return {
            "title": title,
            "description": description,
            "canonical": canonical,
            "robots": robots,
            "jsonld": jsonld,
        }

    def get_hero_image_dict(self, obj):
        """
        Internal helper used by both hero_image and jsonld.
        Produces naive src + srcset. For production, replace with image renditions.
        """
        # Prefer explicit featured_image_url (CDN/external), then cover_image field.
        if getattr(obj, "featured_image_url", None):
            src = obj.featured_image_url
            # Naive srcset: duplicate to satisfy frontends; replace with real renditions in prod.
            return {"src": src, "srcset": [src], "width": None, "height": None}

        if getattr(obj, "cover_image", None):
            img_field = obj.cover_image
            try:
                src = img_field.url
            except Exception:
                src = None
            if src:
                # Naive srcset example: same url repeated. Frontend or CDN should replace with real widths.
                return {
                    "src": src,
                    "srcset": [src],
                    "width": getattr(img_field, "width", None),
                    "height": getattr(img_field, "height", None),
                }
        return None

    def get_hero_image(self, obj):
        data = self.get_hero_image_dict(obj)
        return data or {}


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
        validated_data["user"] = (
            self.context["request"].user if self.context["request"].user.is_authenticated else None
        )
        return super().create(validated_data)
