from rest_framework import status
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from django.http import HttpResponseNotModified
from django.utils.http import http_date
# Removed channels imports from top level to avoid import errors


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


class RealtimeMixin:
    """
    Mixin to send real-time notifications via WebSockets on model changes.
    """

    def _send_realtime_notification(self, instance, action):
        """Send WebSocket notification for model changes"""
        try:
            # Import channels modules here to avoid import errors during development
            from channels.layers import get_channel_layer
            from asgiref.sync import async_to_sync

            channel_layer = get_channel_layer()
            group_name = self.get_realtime_group_name()
            event_type = self.get_realtime_event_type(action)

            # Send notification asynchronously
            async_to_sync(channel_layer.group_send)(
                group_name,
                {
                    "type": event_type,
                    "data": {
                        "type": f"{self.get_resource_name()}.{action}",
                        "resource": self.get_resource_name(),
                        "id": getattr(instance, 'id', getattr(instance, 'slug', None)),
                        "payload": self.get_notification_payload(instance, action),
                    }
                }
            )
        except ImportError as e:
            # Channels not installed or configured
            print(f"Channels not available: {e}")
        except Exception as e:
            # Log error but don't fail the request
            print(f"Failed to send realtime notification: {e}")

    def get_realtime_group_name(self):
        """Override in subclass to specify WebSocket group name"""
        return self.get_resource_name()

    def get_resource_name(self):
        """Override in subclass to specify resource name"""
        return "unknown"

    def get_realtime_event_type(self, action):
        """Override in subclass to specify event type"""
        return f"{self.get_resource_name()}_update"

    def get_notification_payload(self, instance, action):
        """Override in subclass to customize notification payload"""
        return {
            "id": instance.id,
            "title": getattr(instance, 'title', ''),
            "updated_at": instance.updated_at.isoformat(),
            "version": getattr(instance, 'version', 1),
        }

    def perform_create(self, serializer):
        instance = serializer.save()
        super().perform_create(serializer)
        self._send_realtime_notification(instance, "created")

    def perform_update(self, serializer):
        instance = serializer.save()
        super().perform_update(serializer)
        self._send_realtime_notification(instance, "updated")

    def perform_destroy(self, instance):
        self._send_realtime_notification(instance, "deleted")
        super().perform_destroy(instance)