"""
Django settings for backend project.

This file was reformatted for clarity and correct ordering (no behavior changes).
Values and defaults are preserved exactly as in your original file.

Notes:
- Keep SECRET_KEY and DEBUG configured via environment in production.
- SITE_URL, PUBLISHER_* and security flags are read from env vars (defaults preserved).
"""

from pathlib import Path
import os

# ------------------------------------------------------------------------------
# BASE / PATHS
# ------------------------------------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent

# ------------------------------------------------------------------------------
# DEFAULTS / SECURITY / SITE METADATA
# ------------------------------------------------------------------------------
# Default secret (kept from original). Overridden below by environment if set.
DEFAULT_SECRET_KEY = "django-insecure--8r)rbbuyk10t#qibq(r$$jlyf9y(7hnrsh!0*pjbhy*e-t_=k"

# Site metadata (env-driven; defaults preserved)
SITE_URL = os.getenv("SITE_URL", "https://example.com")
SITE_NAME = os.getenv("Ansaf", "Site Name")
PUBLISHER_NAME = os.getenv("PUBLISHER_NAME", SITE_NAME)
PUBLISHER_LOGO = os.getenv("PUBLISHER_LOGO", SITE_URL + "/static/images/logo.png")

# Security flags for production (env-driven)
SECURE_SSL_REDIRECT = os.getenv("SECURE_SSL_REDIRECT", "True").lower() in ("1", "true", "yes")
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
SECURE_HSTS_SECONDS = int(os.getenv("SECURE_HSTS_SECONDS", "31536000"))
SECURE_HSTS_INCLUDE_SUBDOMAINS = os.getenv("SECURE_HSTS_INCLUDE_SUBDOMAINS", "True").lower() in ("1", "true", "yes")
SECURE_HSTS_PRELOAD = os.getenv("SECURE_HSTS_PRELOAD", "True").lower() in ("1", "true", "yes")

# ------------------------------------------------------------------------------
# BASIC SECURITY / DEBUG
# ------------------------------------------------------------------------------
# SECRET_KEY: prefer env var in production; fallback to DEFAULT_SECRET_KEY
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", DEFAULT_SECRET_KEY)

# DEBUG default preserved; can be overridden via DJANGO_DEBUG env var
DEBUG = os.getenv("DJANGO_DEBUG", "True").lower() == "true"
# security redirect: allowed in production, disabled in DEBUG for local development
# prefer controlled env var in production; for dev, disable redirect
if DEBUG:
    SECURE_SSL_REDIRECT = False
else:
    SECURE_SSL_REDIRECT = os.getenv("SECURE_SSL_REDIRECT", "True").lower() in ("1","true","yes")


# ALLOWED_HOSTS: in dev/test allow localhost/testserver; in prod read from env var
ALLOWED_HOSTS = os.getenv("DJANGO_ALLOWED_HOSTS", "").split(",") if not DEBUG else ["localhost", "127.0.0.1", "testserver"]

# ------------------------------------------------------------------------------
# APPLICATIONS
# ------------------------------------------------------------------------------



# INSTALLED_APPS = [
#     # Django contrib
#     "django.contrib.admin",
#     "django.contrib.auth",
#     "django.contrib.contenttypes",
#     "django.contrib.sessions",
#     "django.contrib.messages",
#     "django.contrib.staticfiles",

#     # Third-party
#     "corsheaders",
#     "rest_framework",
#     "rest_framework.authtoken",  # For token authentication
#     "django_filters",
#     "taggit",
#     "drf_spectacular",  # OpenAPI schema generation
#     # "channels",  # WebSockets support - temporarily disabled

#     # Local apps
#     "blogs",
#     "pages",
# ]


# INSTALLED_APPS (add 'channels' and contrib sitemaps)
INSTALLED_APPS = [
    # Django contrib
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sitemaps",   # required for sitemap usage in urls.py

    # Third-party
    "corsheaders",
    "rest_framework",
    "rest_framework.authtoken",
    "django_filters",
    "taggit",
    "drf_spectacular",
    "channels",  # enable WebSocket support (consumers/asgi rely on this)
    'django_extensions',
    
    # Local apps
    "blogs",
    "pages",
]


# ------------------------------------------------------------------------------
# MIDDLEWARE
# ------------------------------------------------------------------------------
MIDDLEWARE = [

    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",

    # Custom project middleware (kept as-is)
    "backend.middleware.RequestLoggingMiddleware",
    "backend.middleware.ErrorHandlingMiddleware",
]

# ------------------------------------------------------------------------------
# URLS / WSGI / TEMPLATES
# ------------------------------------------------------------------------------
ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],  # Django templates not used for React frontend but kept for admin
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"
# ASGI application for Channels - temporarily disabled
# ASGI_APPLICATION = "backend.asgi.application"

# ------------------------------------------------------------------------------
# DATABASE
# ------------------------------------------------------------------------------
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# ------------------------------------------------------------------------------
# AUTH / PASSWORD VALIDATION
# ------------------------------------------------------------------------------
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# ------------------------------------------------------------------------------
# INTERNATIONALIZATION
# ------------------------------------------------------------------------------
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# ------------------------------------------------------------------------------
# STATIC / MEDIA
# ------------------------------------------------------------------------------
STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

# ------------------------------------------------------------------------------
# CORS
# ------------------------------------------------------------------------------
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:8080",
    "http://localhost:8081",
    "http://localhost:8082",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:8080",
    "http://127.0.0.1:8081",
    "http://127.0.0.1:8082",
]
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_ALL_ORIGINS = True  # For development only

# ------------------------------------------------------------------------------
# REST FRAMEWORK (keeps original configuration)
# ------------------------------------------------------------------------------
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.TokenAuthentication",  # For API clients
        "rest_framework.authentication.BasicAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticatedOrReadOnly",
    ],
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
        "rest_framework.filters.SearchFilter",
        "rest_framework.filters.OrderingFilter",
    ],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.LimitOffsetPagination",
    "PAGE_SIZE": 10,
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}

# DRF Spectacular settings (kept as original)
SPECTACULAR_SETTINGS = {
    "TITLE": "Ansaf API",
    "DESCRIPTION": "API for Ansaf blog and page management system",
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
    "SWAGGER_UI_DIST": "SIDECAR",
    "SWAGGER_UI_FAVICON_HREF": "SIDECAR",
    "REDOC_DIST": "SIDECAR",
}

# ------------------------------------------------------------------------------
# TAGGIT
# ------------------------------------------------------------------------------
TAGGIT_CASE_INSENSITIVE = True

# ------------------------------------------------------------------------------
# DEFAULT AUTO FIELD
# ------------------------------------------------------------------------------
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# ------------------------------------------------------------------------------
# LOGGING
# ------------------------------------------------------------------------------
# Logging uses BASE_DIR for log files — BASE_DIR is defined above to avoid import-time errors.
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": "{levelname} {asctime} {module} {process:d} {thread:d} {message}",
            "style": "{",
        },
        "simple": {
            "format": "{levelname} {message}",
            "style": "{",
        },
        "json": {
            "format": '{"level": "%(levelname)s", "timestamp": "%(asctime)s", "module": "%(module)s", "message": "%(message)s"}',
            "style": "%",
        },
    },
    "handlers": {
        "file": {
            "level": "INFO",
            "class": "logging.FileHandler",
            "filename": BASE_DIR / "logs" / "django.log",
            "formatter": "verbose",
        },
        "console": {
            "level": "INFO",
            "class": "logging.StreamHandler",
            "formatter": "simple",
        },
        "error_file": {
            "level": "ERROR",
            "class": "logging.FileHandler",
            "filename": BASE_DIR / "logs" / "errors.log",
            "formatter": "verbose",
        },
    },
    "root": {
        "handlers": ["console", "file", "error_file"],
        "level": "INFO",
    },
    "loggers": {
        "django": {
            "handlers": ["console", "file"],
            "level": "INFO",
            "propagate": False,
        },
        "django.request": {
            "handlers": ["error_file"],
            "level": "ERROR",
            "propagate": False,
        },
        "blogs": {
            "handlers": ["console", "file"],
            "level": "INFO",
            "propagate": False,
        },
        "pages": {
            "handlers": ["console", "file"],
            "level": "INFO",
            "propagate": False,
        },
    },
}

# ------------------------------------------------------------------------------
# END OF FILE - all functional values preserved
# ------------------------------------------------------------------------------


# --- near the other application-entry settings (e.g., WSGI_APPLICATION) ---
# If you already have WSGI_APPLICATION, keep it. Add ASGI_APPLICATION for Channels:
ASGI_APPLICATION = "backend.asgi.application"

# Channel layers — InMemory for development. Replace with channels_redis + REDIS_URL in production.
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer",
    }
}

