# """
# URL configuration for backend project.

# The `urlpatterns` list routes URLs to views. For more information please see:
#     https://docs.djangoproject.com/en/5.2/topics/http/urls/
# Examples:
# Function views
#     1. Add an import:  from my_app import views
#     2. Add a URL to urlpatterns:  path('', views.home, name='home')
# Class-based views
#     1. Add an import:  from other_app.views import Home
#     2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
# Including another URLconf
#     1. Import the include() function: from django.urls import include, path
#     2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
# """

# from django.contrib import admin
# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
# from .views import AuthViewSet
# # backend/urls.py (additions at top)
# from django.contrib.sitemaps.views import sitemap
# from blogs.sitemaps import PostSitemap
# # serve media in dev (if not already present)
# from django.conf import settings
# from django.conf.urls.static import static
# from django.urls import path, include

# urlpatterns = [
#     path("api/", include("blogs.urls")),
#     path("api/", include("pages.urls")),   # optional for Page API
# ]


# sitemaps = {"posts": PostSitemap}


# # Admin site customization
# admin.site.site_header = "Ansaf Administration"
# admin.site.site_title = "Ansaf Site Administration"
# admin.site.index_title = "Ansaf Site Administration"

# # Auth router
# auth_router = DefaultRouter()
# auth_router.register(r'auth', AuthViewSet, basename='auth')

# api_patterns = [
#     path("", include("blogs.urls")),
#     # path("", include("pages.urls")),
#     path("", include(auth_router.urls)),
# ]

# # Versioned API patterns
# api_v1_patterns = [
#     path("", include(api_patterns)),
# ]

# urlpatterns = [
#     path("admin/", admin.site.urls),
#     path("api/v1/", include(api_v1_patterns)),
#     # Keep old API for backward compatibility during migration
#     path("api/", include(api_patterns)),
#     # OpenAPI schema
#     path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
#     path("api/schema/swagger-ui/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
#     path("api/schema/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
#     # later in urlpatterns, add:
#     path("sitemap.xml", sitemap, {"sitemaps": sitemaps}, name="sitemap-xml"),
#     path('ckeditor/', include('ckeditor_uploader.urls')),
# ]


# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)










# --------------------------------------------------------








"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from rest_framework.routers import DefaultRouter
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

from .views import AuthViewSet

# backend/urls.py (additions at top)
from django.contrib.sitemaps.views import sitemap
from blogs.sitemaps import PostSitemap

# serve ckeditor urls
# (ckeditor upload urls included later in urlpatterns)

# Sitemap dict
sitemaps = {"posts": PostSitemap}

# Admin site customization
admin.site.site_header = "Ansaf Administration"
admin.site.site_title = "Ansaf Site Administration"
admin.site.index_title = "Ansaf Site Administration"

# Auth router
auth_router = DefaultRouter()
auth_router.register(r"auth", AuthViewSet, basename="auth")

# API patterns (kept generic so they can be included at /api/ and /api/v1/)
api_patterns = [
    path("", include("blogs.urls")),
    # path("", include("pages.urls")),   # optional Page API (commented out to avoid model conflict)
    path("", include(auth_router.urls)),
]

# Versioned API patterns (v1)
api_v1_patterns = [
    path("", include(api_patterns)),
]

# Final urlpatterns: admin, API (v1 & fallback), OpenAPI schema, sitemap, ckeditor
urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include(api_v1_patterns)),
    # Keep old API for backward compatibility during migration
    path("api/", include(api_patterns)),
    # OpenAPI schema
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/schema/swagger-ui/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path("api/schema/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
    # Sitemap & ckeditor
    path("sitemap.xml", sitemap, {"sitemaps": sitemaps}, name="sitemap-xml"),
    path("ckeditor/", include("ckeditor_uploader.urls")),
]

# Serve media in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
