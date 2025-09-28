"""backend.middleware.canonical_host

Enforce a single canonical origin (scheme + host) for incoming requests.

This is a formatting-only tidy: behavior is unchanged. The middleware will
redirect requests to the `SITE_URL` origin (from settings) with a permanent
301 if either the scheme or host differs from the canonical origin.
"""

from urllib.parse import urlsplit, urlunsplit

from django.conf import settings
from django.shortcuts import redirect
from django.utils.deprecation import MiddlewareMixin


class CanonicalHostAndHttpsMiddleware(MiddlewareMixin):
    """
    Enforce canonical host and HTTPS for all requests.

    - Reads SITE_URL from Django settings (e.g., "https://example.com").
    - If SITE_URL is not set, the middleware is a no-op.
    - If the request's scheme or host differs from the canonical origin,
      a permanent (301) redirect to the canonical origin is returned,
      preserving path and query string.

    Note: this middleware is API-friendly and preserves the original behavior.
    """

    def process_request(self, request):
        site_url = getattr(settings, "SITE_URL", None)
        if not site_url:
            # Nothing to enforce when SITE_URL is not configured.
            return None

        # Parse canonical origin (scheme + host)
        canonical_parts = urlsplit(site_url)
        canonical_scheme = canonical_parts.scheme or "https"
        canonical_netloc = canonical_parts.netloc

        # Determine current request origin
        request_scheme = "https" if request.is_secure() else "http"
        request_host = request.get_host()

        # Redirect if scheme or host mismatches
        if request_scheme != canonical_scheme or request_host != canonical_netloc:
            query = request.META.get("QUERY_STRING", "")
            new_url = urlunsplit(
                (canonical_scheme, canonical_netloc, request.path, query, "")
            )
            return redirect(new_url, permanent=True)

        return None
