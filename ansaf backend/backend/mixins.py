from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from django.http import HttpResponseNotModified
from django.utils.http import http_date


class OptimisticLockMixin:
    """
    Mixin to add optimistic locking support to ViewSets.
    Requires the model to have a 'version' field.
    """

    def update(self, request, *args, **kwargs):
        instance = self.get_object()

        # Check If-Match header for version validation
        if_match = request.headers.get('If-Match')
        if if_match:
            try:
                client_version = int(if_match)
                if instance.version != client_version:
                    return Response(
                        {
                            'message': 'Version mismatch',
                            'server': {
                                'id': instance.id,
                                'version': instance.version
                            },
                            'client': {
                                'attempted_version': client_version
                            }
                        },
                        status=status.HTTP_409_CONFLICT
                    )
            except (ValueError, TypeError):
                return Response(
                    {'message': 'Invalid If-Match header'},
                    status=status.HTTP_400_BAD_REQUEST
                )

        # Check version in request data for backward compatibility
        client_version = request.data.get('version')
        if client_version is not None:
            try:
                client_version = int(client_version)
                if instance.version != client_version:
                    return Response(
                        {
                            'message': 'Version mismatch',
                            'server': {
                                'id': instance.id,
                                'version': instance.version
                            },
                            'client': {
                                'attempted_version': client_version
                            }
                        },
                        status=status.HTTP_409_CONFLICT
                    )
            except (ValueError, TypeError):
                raise ValidationError({'version': 'Must be a valid integer'})

        return super().update(request, *args, **kwargs)

    def perform_update(self, serializer):
        # The version will be automatically incremented in the model's save method
        serializer.save()


class ETagLastModifiedMixin:
    """
    Mixin to add ETag and Last-Modified headers for caching support.
    """

    def get_etag(self, request, instance):
        """Generate ETag based on instance version"""
        return f'"{instance.version}"'

    def get_last_modified(self, request, instance):
        """Return Last-Modified based on updated_at"""
        return instance.updated_at

    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, *args, **kwargs)
        instance = self.get_object()

        # Add ETag and Last-Modified headers
        etag = self.get_etag(request, instance)
        last_modified = self.get_last_modified(request, instance)

        response['ETag'] = etag
        response['Last-Modified'] = http_date(last_modified.timestamp())

        # Check If-None-Match for conditional requests
        if_none_match = request.headers.get('If-None-Match')
        if if_none_match and if_none_match == etag:
            return HttpResponseNotModified()

        return response

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)

        # For list views, we can add weak ETags based on the queryset
        # This is a simplified implementation
        queryset = self.get_queryset()
        if queryset.exists():
            # Use the most recent updated_at as a simple cache key
            latest_update = queryset.order_by('-updated_at').first().updated_at
            response['Last-Modified'] = http_date(latest_update.timestamp())

        return response