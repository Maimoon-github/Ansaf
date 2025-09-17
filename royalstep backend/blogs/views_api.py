from rest_framework import viewsets, filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.db.models import F
from .models import Post, Category, Comment
from .serializers import PostSerializer, CategorySerializer, CommentSerializer
from .permissions import IsAuthorOrReadOnly


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().select_related("author").prefetch_related("categories", "tags")
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
    filterset_fields = ["author", "status", "categories__slug", "categories__id"]
    search_fields = ["title", "content", "excerpt"]
    ordering = ["-published_at"]

    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, *args, **kwargs)
        # Increment view count atomically
        Post.objects.filter(pk=self.get_object().pk).update(views_count=F("views_count") + 1)
        return response

    def get_queryset(self):
        qs = super().get_queryset()
        if not self.request.user.is_staff:
            # Limit to published or own drafts
            qs = qs.filter(status=Post.STATUS_PUBLISHED)
        return qs


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ["parent", "slug"]
    search_fields = ["name"]


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.select_related("post", "author", "parent")
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filterset_fields = ["post", "author", "is_approved"]
    search_fields = ["content", "author__username"]

    def get_queryset(self):
        qs = super().get_queryset()
        if self.request.method.lower() == "get" and not self.request.user.is_staff:
            qs = qs.filter(is_approved=True)
        return qs

    def perform_create(self, serializer):
        serializer.save(author=self.request.user, is_approved=False)
