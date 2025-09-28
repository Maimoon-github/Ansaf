# from rest_framework.routers import DefaultRouter
# from .views_api import PostViewSet, CategoryViewSet, CommentViewSet

# router = DefaultRouter()
# router.register(r"posts", PostViewSet)
# router.register(r"categories", CategoryViewSet)
# router.register(r"comments", CommentViewSet)

# urlpatterns = router.urls










# ---------------------------------------------------------------------------------------










from rest_framework.routers import DefaultRouter
from django.urls import path
from .views_api import PostViewSet, CategoryViewSet, CommentViewSet, ReactionViewSet, AnalyticsView

router = DefaultRouter()
router.register(r"posts", PostViewSet, basename="posts")
router.register(r"categories", CategoryViewSet, basename="categories")
router.register(r"comments", CommentViewSet, basename="comments")
router.register(r"reactions", ReactionViewSet, basename="reactions")

urlpatterns = router.urls + [
    path("analytics/", AnalyticsView.as_view(), name="blogs-analytics"),
]
