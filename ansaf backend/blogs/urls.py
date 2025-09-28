"""blogs/urls.py

API router registrations for blog resources.

Formatting-only refactor: no functional changes.
"""

# Standard / third-party imports
from django.urls import path
from rest_framework.routers import DefaultRouter

# Local imports
from .views_api import (
    PostViewSet,
    CategoryViewSet,
    CommentViewSet,
    ReactionViewSet,
    AnalyticsView,
)

# Router setup
router = DefaultRouter()
router.register(r"posts", PostViewSet, basename="posts")
router.register(r"categories", CategoryViewSet, basename="categories")
router.register(r"comments", CommentViewSet, basename="comments")
router.register(r"reactions", ReactionViewSet, basename="reactions")

# URL patterns
urlpatterns = router.urls + [
    path("analytics/", AnalyticsView.as_view(), name="blogs-analytics"),
]