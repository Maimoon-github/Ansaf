import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.core.serializers.json import DjangoJSONEncoder
from blogs.models import Post
from pages.models import Page


class BlogConsumer(AsyncWebsocketConsumer):
    """WebSocket consumer for real-time blog updates"""

    async def connect(self):
        await self.channel_layer.group_add("blogs", self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("blogs", self.channel_name)

    async def blog_update(self, event):
        """Send blog update to WebSocket"""
        await self.send(text_data=json.dumps(event["data"], cls=DjangoJSONEncoder))


class PageConsumer(AsyncWebsocketConsumer):
    """WebSocket consumer for real-time page updates"""

    async def connect(self):
        await self.channel_layer.group_add("pages", self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("pages", self.channel_name)

    async def page_update(self, event):
        """Send page update to WebSocket"""
        await self.send(text_data=json.dumps(event["data"], cls=DjangoJSONEncoder))


class NotificationConsumer:
    """Helper class to send notifications to WebSocket groups"""

    def __init__(self, channel_layer):
        self.channel_layer = channel_layer

    async def notify_blog_change(self, blog_id, action, data):
        """Notify all connected clients about blog changes"""
        await self.channel_layer.group_send(
            "blogs",
            {
                "type": "blog_update",
                "data": {
                    "type": f"blog.{action}",
                    "resource": "blogs",
                    "id": blog_id,
                    "payload": data,
                }
            }
        )

    async def notify_page_change(self, page_slug, action, data):
        """Notify all connected clients about page changes"""
        await self.channel_layer.group_send(
            "pages",
            {
                "type": "page_update",
                "data": {
                    "type": f"page.{action}",
                    "resource": "pages",
                    "slug": page_slug,
                    "payload": data,
                }
            }
        )