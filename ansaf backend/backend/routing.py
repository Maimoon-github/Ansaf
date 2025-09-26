from django.urls import path
from .consumers import BlogConsumer, PageConsumer

websocket_urlpatterns = [
    path('ws/v1/posts/', BlogConsumer.as_asgi()),
    path('ws/v1/pages/', PageConsumer.as_asgi()),
]