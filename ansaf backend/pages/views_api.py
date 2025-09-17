from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action

from .models import Page
from .serializers import PageListSerializer, PageDetailSerializer


class IsStaffOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_staff


class PageViewSet(viewsets.ModelViewSet):
    queryset = Page.objects.all()
    lookup_field = "slug"
    permission_classes = [IsStaffOrReadOnly]

    def get_queryset(self):
        qs = super().get_queryset()
        if self.request.user.is_authenticated and self.request.user.is_staff:
            return qs
        return qs.published()

    def get_serializer_class(self):
        if self.action == "list":
            return PageListSerializer
        return PageDetailSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user if self.request.user.is_authenticated else None)

    def perform_update(self, serializer):
        serializer.save()

    @action(detail=True, methods=["get"], permission_classes=[permissions.IsAdminUser])
    def raw(self, request, slug=None):
        page = self.get_object()
        return Response({"content": page.content})
