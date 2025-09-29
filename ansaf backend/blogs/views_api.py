# """
# API views for blogs: Posts, Categories, Comments, Reactions, and Analytics.

# Behavior preserved exactly. Formatting / ordering improved for readability.
# """

# # -----------------------------------------------------------------------------
# # Standard / Django imports
# # -----------------------------------------------------------------------------
# from django.utils import timezone
# from django.db.models import F, Q, Count

# # -----------------------------------------------------------------------------
# # DRF / REST imports
# # -----------------------------------------------------------------------------
# from rest_framework import viewsets, filters, mixins, status
# from rest_framework.decorators import action
# from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
# from rest_framework.response import Response
# from rest_framework.views import APIView

# # -----------------------------------------------------------------------------
# # Project / local imports
# # -----------------------------------------------------------------------------
# from backend.mixins import OptimisticLockMixin, ETagLastModifiedMixin, RealtimeMixin
# from .models import Post, Category, Comment, Reaction
# from .serializers import (
#     PostListSerializer,
#     PostDetailSerializer,
#     PostWriteSerializer,
#     CategorySerializer,
#     CommentSerializer,
#     ReactionSerializer,
# )
# from .permissions import IsAuthorOrReadOnly
# from rest_framework import generics, filters
# from .models import Post
# from .serializers import PostListSerializer, PostDetailSerializer

# class PostListAPIView(generics.ListAPIView):
#     queryset = Post.objects.filter(published__isnull=False).order_by("-published")
#     serializer_class = PostListSerializer
#     filter_backends = [filters.SearchFilter]
#     search_fields = ["title", "body", "slug"]

# class PostDetailAPIView(generics.RetrieveAPIView):
#     queryset = Post.objects.filter(published__isnull=False)
#     lookup_field = "slug"
#     serializer_class = PostDetailSerializer


# # -----------------------------------------------------------------------------
# # Legacy (kept commented) - original implementation history preserved
# # -----------------------------------------------------------------------------
# # from rest_framework import viewsets, filters
# # from rest_framework.permissions import IsAuthenticatedOrReadOnly
# # from django.db.models import F
# # from backend.mixins import OptimisticLockMixin, ETagLastModifiedMixin, RealtimeMixin
# # from .models import Post, Category, Comment
# # from .serializers import PostSerializer, CategorySerializer, CommentSerializer
# # from .permissions import IsAuthorOrReadOnly
# #
# # class PostViewSet(OptimisticLockMixin, ETagLastModifiedMixin, RealtimeMixin, viewsets.ModelViewSet):
# #     queryset = Post.objects.all().select_related("author").prefetch_related("categories", "tags")
# #     serializer_class = PostSerializer
# #     permission_classes = [IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
# #     filterset_fields = ["author", "status", "categories__slug", "categories__id"]
# #     search_fields = ["title", "content", "excerpt"]
# #     ordering = ["-published_at"]
# #     lookup_field = "slug"
# #
# #     def get_resource_name(self):
# #         return "posts"
# #
# #     def get_realtime_group_name(self):
# #         return "posts"
# #
# #     def retrieve(self, request, *args, **kwargs):
# #         response = super().retrieve(request, *args, **kwargs)
# #         # Increment view count atomically
# #         Post.objects.filter(pk=self.get_object().pk).update(views_count=F("views_count") + 1)
# #         return response
# #
# #     def get_queryset(self):
# #         qs = super().get_queryset()
# #         if not self.request.user.is_staff:
# #             # Limit to published or own drafts
# #             qs = qs.filter(status=Post.STATUS_PUBLISHED)
# #         return qs
# #
# # class CategoryViewSet(viewsets.ModelViewSet):
# #     queryset = Category.objects.all()
# #     serializer_class = CategorySerializer
# #     permission_classes = [IsAuthenticatedOrReadOnly]
# #     filterset_fields = ["parent", "slug"]
# #     search_fields = ["name"]
# #
# # class CommentViewSet(viewsets.ModelViewSet):
# #     queryset = Comment.objects.select_related("post", "author", "parent")
# #     serializer_class = CommentSerializer
# #     permission_classes = [IsAuthenticatedOrReadOnly]
# #     filterset_fields = ["post", "author", "is_approved"]
# #     search_fields = ["content", "author__username"]
# #
# #     def get_queryset(self):
# #         qs = super().get_queryset()
# #         if self.request.method.lower() == "get" and not self.request.user.is_staff:
# #             qs = qs.filter(is_approved=True)
# #         return qs
# #
# #     def perform_create(self, serializer):
# #         serializer.save(author=self.request.user, is_approved=False)
# #

# # -----------------------------------------------------------------------------
# # Posts
# # -----------------------------------------------------------------------------
# class PostViewSet(
#     OptimisticLockMixin,
#     ETagLastModifiedMixin,
#     RealtimeMixin,
#     viewsets.ModelViewSet,
# ):
#     """
#     ViewSet for Post model.
#     - List -> PostListSerializer
#     - Retrieve -> PostDetailSerializer
#     - Create/Update -> PostWriteSerializer
#     """

#     queryset = (
#         Post.objects.all()
#         .select_related("author")
#         .prefetch_related("categories", "tags")
#     )
#     permission_classes = [IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
#     filterset_fields = [
#         "author",
#         "status",
#         "categories__slug",
#         "categories__id",
#         "tags__name",
#     ]
#     search_fields = [
#         "title",
#         "content",
#         "excerpt",
#         "summary",
#         "meta_title",
#         "meta_description",
#     ]
#     ordering = ["-published_at"]
#     lookup_field = "slug"

#     def get_serializer_class(self):
#         if self.action == "list":
#             return PostListSerializer
#         if self.action == "retrieve":
#             return PostDetailSerializer
#         return PostWriteSerializer

#     def get_resource_name(self):
#         return "posts"

#     def get_realtime_group_name(self):
#         return "posts"

#     def get_queryset(self):
#         """
#         Public listing:
#         - staff: full queryset
#         - non-staff: only published posts with published_at <= now
#         """
#         qs = super().get_queryset()
#         if self.request.user.is_staff:
#             return qs
#         return qs.filter(
#             status=Post.STATUS_PUBLISHED,
#             published_at__isnull=False,
#             published_at__lte=timezone.now(),
#         )

#     def retrieve(self, request, *args, **kwargs):
#         """
#         Retrieve a post and increment views_count atomically.
#         """
#         response = super().retrieve(request, *args, **kwargs)
#         Post.objects.filter(pk=self.get_object().pk).update(
#             views_count=F("views_count") + 1
#         )
#         return response

#     @action(detail=False, methods=["get"])
#     def search(self, request):
#         """
#         Dedicated search endpoint with simple ranking heuristics.

#         Ranking:
#           - title/meta matches (title_hit)
#           - summary/excerpt/meta_description (mid_hit)
#           - content matches (body_hit)
#         Tie-breakers: recency and engagement (views_count, likes_count)
#         """
#         q = request.query_params.get("q", "").strip()
#         base = self.filter_queryset(self.get_queryset())

#         if not q:
#             page = self.paginate_queryset(base)
#             ser = PostListSerializer(page, many=True, context={"request": request})
#             return self.get_paginated_response(ser.data)

#         ranked = base.annotate(
#             title_hit=Count(
#                 "id",
#                 filter=Q(title__icontains=q) | Q(meta_title__icontains=q),
#             ),
#             mid_hit=Count(
#                 "id",
#                 filter=Q(summary__icontains=q)
#                 | Q(excerpt__icontains=q)
#                 | Q(meta_description__icontains=q),
#             ),
#             body_hit=Count("id", filter=Q(content__icontains=q)),
#         ).order_by(
#             "-title_hit",
#             "-mid_hit",
#             "-body_hit",
#             "-published_at",
#             "-views_count",
#             "-likes_count",
#         )

#         page = self.paginate_queryset(ranked)
#         ser = PostListSerializer(page, many=True, context={"request": request})
#         return self.get_paginated_response(ser.data)


# # -----------------------------------------------------------------------------
# # Categories
# # -----------------------------------------------------------------------------
# class CategoryViewSet(viewsets.ModelViewSet):
#     """
#     Category management API.
#     """
#     queryset = Category.objects.all()
#     serializer_class = CategorySerializer
#     permission_classes = [IsAuthenticatedOrReadOnly]
#     filterset_fields = ["parent", "slug"]
#     search_fields = ["name"]


# # -----------------------------------------------------------------------------
# # Comments
# # -----------------------------------------------------------------------------
# class CommentViewSet(viewsets.ModelViewSet):
#     """
#     Comment API.
#     - Non-staff GETs return only approved comments for published posts that accept comments.
#     - Creation auto-fills author/ip/ua and marks comment as not approved.
#     """
#     queryset = Comment.objects.select_related("post", "author", "parent")
#     serializer_class = CommentSerializer
#     permission_classes = [IsAuthenticatedOrReadOnly]
#     filterset_fields = ["post", "author", "is_approved"]
#     search_fields = ["content", "author__username", "author_name"]

#     def get_queryset(self):
#         qs = super().get_queryset()
#         if self.request.method.lower() == "get" and not self.request.user.is_staff:
#             qs = qs.filter(
#                 is_approved=True,
#                 post__allow_comments=True,
#                 post__status=Post.STATUS_PUBLISHED,
#             )
#         return qs

#     def perform_create(self, serializer):
#         ip = self.request.META.get("REMOTE_ADDR")
#         ua = self.request.META.get("HTTP_USER_AGENT", "")[:255]
#         serializer.save(
#             author=self.request.user if self.request.user.is_authenticated else None,
#             is_approved=False,
#             ip_address=ip,
#             user_agent=ua,
#         )


# # -----------------------------------------------------------------------------
# # Reactions
# # -----------------------------------------------------------------------------
# class ReactionViewSet(
#     mixins.CreateModelMixin,
#     mixins.DestroyModelMixin,
#     viewsets.GenericViewSet,
# ):
#     """
#     Create/destroy lightweight reactions. Keeps aggregate likes_count on Post.
#     """
#     queryset = Reaction.objects.select_related("post", "user")
#     serializer_class = ReactionSerializer
#     permission_classes = [IsAuthenticatedOrReadOnly]
#     filterset_fields = ["post", "user", "type"]

#     def perform_create(self, serializer):
#         reaction = serializer.save()
#         if reaction.type == Reaction.LIKE:
#             Post.objects.filter(pk=reaction.post_id).update(
#                 likes_count=F("likes_count") + 1
#             )

#     def destroy(self, request, *args, **kwargs):
#         instance = self.get_object()
#         post_id = instance.post_id
#         typ = instance.type
#         self.perform_destroy(instance)
#         if typ == Reaction.LIKE:
#             Post.objects.filter(pk=post_id, likes_count__gt=0).update(
#                 likes_count=F("likes_count") - 1
#             )
#         return Response(status=status.HTTP_204_NO_CONTENT)


# # -----------------------------------------------------------------------------
# # Analytics (admin-only)
# # -----------------------------------------------------------------------------
# class AnalyticsView(APIView):
#     """
#     Very small analytics endpoint (admin-only).
#     Query params:
#       - ordering: 'views' (default) or 'likes'
#       - limit: integer (default 10)
#     """
#     permission_classes = [IsAdminUser]

#     def get(self, request):
#         ordering = request.query_params.get("ordering", "views")
#         limit = int(request.query_params.get("limit", 10))
#         qs = Post.objects.all()
#         if not request.user.is_staff:
#             qs = qs.none()

#         if ordering == "likes":
#             qs = qs.order_by("-likes_count")
#         else:
#             qs = qs.order_by("-views_count")

#         data = PostListSerializer(qs[:limit], many=True, context={"request": request}).data
#         return Response({"results": data})













# ------------------------------------------------------------------------------
















"""
API views for blogs: Posts, Categories, Comments, Reactions, and Analytics.

Behavior preserved exactly. Formatting / ordering improved for readability.
"""

# -----------------------------------------------------------------------------
# Standard / Django imports
# -----------------------------------------------------------------------------
from django.utils import timezone
from django.db.models import F, Q, Count

# -----------------------------------------------------------------------------
# DRF / REST imports
# -----------------------------------------------------------------------------
from rest_framework import viewsets, mixins, status, generics, filters
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

# -----------------------------------------------------------------------------
# Project / local imports
# -----------------------------------------------------------------------------
from backend.mixins import OptimisticLockMixin, ETagLastModifiedMixin, RealtimeMixin
from .models import Post, Category, Comment, Reaction
from .serializers import (
    PostListSerializer,
    PostDetailSerializer,
    PostWriteSerializer,
    CategorySerializer,
    CommentSerializer,
    ReactionSerializer,
)
from .permissions import IsAuthorOrReadOnly

# -----------------------------------------------------------------------------
# Lightweight generic list/detail views (kept as provided)
# -----------------------------------------------------------------------------
class PostListAPIView(generics.ListAPIView):
    queryset = Post.objects.filter(published_at__isnull=False).order_by("-published_at")
    serializer_class = PostListSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["title", "content", "slug"]


class PostDetailAPIView(generics.RetrieveAPIView):
    queryset = Post.objects.filter(published_at__isnull=False)
    lookup_field = "slug"
    serializer_class = PostDetailSerializer


# -----------------------------------------------------------------------------
# Legacy (kept commented) - original implementation history preserved
# -----------------------------------------------------------------------------
# from rest_framework import viewsets, filters
# from rest_framework.permissions import IsAuthenticatedOrReadOnly
# from django.db.models import F
# from backend.mixins import OptimisticLockMixin, ETagLastModifiedMixin, RealtimeMixin
# from .models import Post, Category, Comment
# from .serializers import PostSerializer, CategorySerializer, CommentSerializer
# from .permissions import IsAuthorOrReadOnly
#
# class PostViewSet(OptimisticLockMixin, ETagLastModifiedMixin, RealtimeMixin, viewsets.ModelViewSet):
#     queryset = Post.objects.all().select_related("author").prefetch_related("categories", "tags")
#     serializer_class = PostSerializer
#     permission_classes = [IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
#     filterset_fields = ["author", "status", "categories__slug", "categories__id"]
#     search_fields = ["title", "content", "excerpt"]
#     ordering = ["-published_at"]
#     lookup_field = "slug"
#
#     def get_resource_name(self):
#         return "posts"
#
#     def get_realtime_group_name(self):
#         return "posts"
#
#     def retrieve(self, request, *args, **kwargs):
#         response = super().retrieve(request, *args, **kwargs)
#         # Increment view count atomically
#         Post.objects.filter(pk=self.get_object().pk).update(views_count=F("views_count") + 1)
#         return response
#
#     def get_queryset(self):
#         qs = super().get_queryset()
#         if not self.request.user.is_staff:
#             # Limit to published or own drafts
#             qs = qs.filter(status=Post.STATUS_PUBLISHED)
#         return qs
#
# class CategoryViewSet(viewsets.ModelViewSet):
#     queryset = Category.objects.all()
#     serializer_class = CategorySerializer
#     permission_classes = [IsAuthenticatedOrReadOnly]
#     filterset_fields = ["parent", "slug"]
#     search_fields = ["name"]
#
# class CommentViewSet(viewsets.ModelViewSet):
#     queryset = Comment.objects.select_related("post", "author", "parent")
#     serializer_class = CommentSerializer
#     permission_classes = [IsAuthenticatedOrReadOnly]
#     filterset_fields = ["post", "author", "is_approved"]
#     search_fields = ["content", "author__username"]
#
#     def get_queryset(self):
#         qs = super().get_queryset()
#         if self.request.method.lower() == "get" and not self.request.user.is_staff:
#             qs = qs.filter(is_approved=True)
#         return qs
#
#     def perform_create(self, serializer):
#         serializer.save(author=self.request.user, is_approved=False)
#

# -----------------------------------------------------------------------------
# Posts
# -----------------------------------------------------------------------------
class PostViewSet(
    OptimisticLockMixin,
    ETagLastModifiedMixin,
    RealtimeMixin,
    viewsets.ModelViewSet,
):
    """
    ViewSet for Post model.
    - List -> PostListSerializer
    - Retrieve -> PostDetailSerializer
    - Create/Update -> PostWriteSerializer
    """

    queryset = (
        Post.objects.all()
        .select_related("author")
        .prefetch_related("categories", "tags")
    )
    permission_classes = [IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
    filterset_fields = [
        "author",
        "status",
        "categories__slug",
        "categories__id",
        "tags__name",
    ]
    search_fields = [
        "title",
        "content",
        "excerpt",
        "summary",
        "meta_title",
        "meta_description",
    ]
    ordering = ["-published_at"]
    lookup_field = "slug"

    def get_serializer_class(self):
        if self.action == "list":
            return PostListSerializer
        if self.action == "retrieve":
            return PostDetailSerializer
        return PostWriteSerializer

    def get_resource_name(self):
        return "posts"

    def get_realtime_group_name(self):
        return "posts"

    def get_realtime_event_type(self, action):
        """
        Override default event type so it matches the consumer method name.
        The Channels consumer expects a handler named `blog_update` (see
        `backend/consumers.py`), therefore the 'type' value sent via
        channel_layer.group_send must resolve to that method. Returning
        'blog_update' here ensures the consumer receives and forwards the
        notification payload to connected WebSocket clients.
        """
        return "blog_update"

    def get_queryset(self):
        """
        Public listing:
        - staff: full queryset
        - non-staff: only published posts with published_at <= now
        """
        qs = super().get_queryset()
        if self.request.user.is_staff:
            return qs
        return qs.filter(
            status=Post.STATUS_PUBLISHED,
            published_at__isnull=False,
            published_at__lte=timezone.now(),
        )

    def retrieve(self, request, *args, **kwargs):
        """
        Retrieve a post and increment views_count atomically.
        """
        response = super().retrieve(request, *args, **kwargs)
        Post.objects.filter(pk=self.get_object().pk).update(
            views_count=F("views_count") + 1
        )
        return response

    @action(detail=False, methods=["get"])
    def search(self, request):
        """
        Dedicated search endpoint with simple ranking heuristics.

        Ranking:
          - title/meta matches (title_hit)
          - summary/excerpt/meta_description (mid_hit)
          - content matches (body_hit)
        Tie-breakers: recency and engagement (views_count, likes_count)
        """
        q = request.query_params.get("q", "").strip()
        base = self.filter_queryset(self.get_queryset())

        if not q:
            page = self.paginate_queryset(base)
            ser = PostListSerializer(page, many=True, context={"request": request})
            return self.get_paginated_response(ser.data)

        ranked = base.annotate(
            title_hit=Count(
                "id",
                filter=Q(title__icontains=q) | Q(meta_title__icontains=q),
            ),
            mid_hit=Count(
                "id",
                filter=Q(summary__icontains=q)
                | Q(excerpt__icontains=q)
                | Q(meta_description__icontains=q),
            ),
            body_hit=Count("id", filter=Q(content__icontains=q)),
        ).order_by(
            "-title_hit",
            "-mid_hit",
            "-body_hit",
            "-published_at",
            "-views_count",
            "-likes_count",
        )

        page = self.paginate_queryset(ranked)
        ser = PostListSerializer(page, many=True, context={"request": request})
        return self.get_paginated_response(ser.data)


# -----------------------------------------------------------------------------
# Categories
# -----------------------------------------------------------------------------
class CategoryViewSet(viewsets.ModelViewSet):
    """
    Category management API.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ["parent", "slug"]
    search_fields = ["name"]


# -----------------------------------------------------------------------------
# Comments
# -----------------------------------------------------------------------------
class CommentViewSet(viewsets.ModelViewSet):
    """
    Comment API.
    - Non-staff GETs return only approved comments for published posts that accept comments.
    - Creation auto-fills author/ip/ua and marks comment as not approved.
    """
    queryset = Comment.objects.select_related("post", "author", "parent")
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ["post", "author", "is_approved"]
    search_fields = ["content", "author__username", "author_name"]

    def get_queryset(self):
        qs = super().get_queryset()
        if self.request.method.lower() == "get" and not self.request.user.is_staff:
            qs = qs.filter(
                is_approved=True,
                post__allow_comments=True,
                post__status=Post.STATUS_PUBLISHED,
            )
        return qs

    def perform_create(self, serializer):
        ip = self.request.META.get("REMOTE_ADDR")
        ua = self.request.META.get("HTTP_USER_AGENT", "")[:255]
        serializer.save(
            author=self.request.user if self.request.user.is_authenticated else None,
            is_approved=False,
            ip_address=ip,
            user_agent=ua,
        )


# -----------------------------------------------------------------------------
# Reactions
# -----------------------------------------------------------------------------
class ReactionViewSet(
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    """
    Create/destroy lightweight reactions. Keeps aggregate likes_count on Post.
    """
    queryset = Reaction.objects.select_related("post", "user")
    serializer_class = ReactionSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ["post", "user", "type"]

    def perform_create(self, serializer):
        reaction = serializer.save()
        if reaction.type == Reaction.LIKE:
            Post.objects.filter(pk=reaction.post_id).update(
                likes_count=F("likes_count") + 1
            )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        post_id = instance.post_id
        typ = instance.type
        self.perform_destroy(instance)
        if typ == Reaction.LIKE:
            Post.objects.filter(pk=post_id, likes_count__gt=0).update(
                likes_count=F("likes_count") - 1
            )
        return Response(status=status.HTTP_204_NO_CONTENT)


# -----------------------------------------------------------------------------
# Analytics (admin-only)
# -----------------------------------------------------------------------------
class AnalyticsView(APIView):
    """
    Very small analytics endpoint (admin-only).
    Query params:
      - ordering: 'views' (default) or 'likes'
      - limit: integer (default 10)
    """
    permission_classes = [IsAdminUser]

    def get(self, request):
        ordering = request.query_params.get("ordering", "views")
        limit = int(request.query_params.get("limit", 10))
        qs = Post.objects.all()
        if not request.user.is_staff:
            qs = qs.none()

        if ordering == "likes":
            qs = qs.order_by("-likes_count")
        else:
            qs = qs.order_by("-views_count")

        data = PostListSerializer(qs[:limit], many=True, context={"request": request}).data
        return Response({"results": data})
