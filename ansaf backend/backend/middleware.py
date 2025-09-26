import logging
import traceback
from django.http import JsonResponse
from django.conf import settings
from rest_framework import status

logger = logging.getLogger(__name__)


class ErrorHandlingMiddleware:
    """
    Middleware for comprehensive error handling and logging
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        try:
            response = self.get_response(request)
            return response
        except Exception as e:
            return self.handle_exception(request, e)

    def handle_exception(self, request, exception):
        """
        Handle exceptions and return appropriate JSON responses
        """
        # Log the error with full context
        logger.error(
            f"Unhandled exception in {request.path}",
            extra={
                'request_method': request.method,
                'request_path': request.path,
                'user_id': getattr(request.user, 'id', None),
                'user_agent': request.META.get('HTTP_USER_AGENT', ''),
                'remote_addr': self.get_client_ip(request),
                'exception_type': type(exception).__name__,
                'exception_message': str(exception),
                'traceback': traceback.format_exc(),
            }
        )

        # Return appropriate error response
        if hasattr(exception, 'status_code'):
            status_code = exception.status_code
        else:
            status_code = status.HTTP_500_INTERNAL_SERVER_ERROR

        return JsonResponse({
            'error': {
                'message': 'An internal server error occurred',
                'type': type(exception).__name__,
                'code': status_code,
            }
        }, status=status_code)

    def get_client_ip(self, request):
        """
        Get the client IP address from the request
        """
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip


class RequestLoggingMiddleware:
    """
    Middleware for logging all requests
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Log the incoming request
        logger.info(
            f"Request: {request.method} {request.path}",
            extra={
                'request_method': request.method,
                'request_path': request.path,
                'query_string': request.META.get('QUERY_STRING', ''),
                'user_id': getattr(request.user, 'id', None),
                'user_agent': request.META.get('HTTP_USER_AGENT', ''),
                'remote_addr': self.get_client_ip(request),
                'content_type': request.META.get('CONTENT_TYPE', ''),
                'content_length': request.META.get('CONTENT_LENGTH', ''),
            }
        )

        response = self.get_response(request)

        # Log the response
        logger.info(
            f"Response: {response.status_code} for {request.method} {request.path}",
            extra={
                'status_code': response.status_code,
                'response_time': getattr(response, 'response_time', None),
            }
        )

        return response

    def get_client_ip(self, request):
        """
        Get the client IP address from the request
        """
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip