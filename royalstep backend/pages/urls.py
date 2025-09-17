from rest_framework.routers import DefaultRouter
from .views_api import PageViewSet

router = DefaultRouter()
router.register(r'pages', PageViewSet, basename='page')

urlpatterns = router.urls
