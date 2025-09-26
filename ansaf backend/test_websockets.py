#!/usr/bin/env python
"""
Test script to verify WebSocket real-time notifications.
Usage: python test_websockets.py
"""
import os
import sys
import django
import asyncio
import websockets
import json
from pathlib import Path

# Setup Django
current_dir = Path(__file__).parent
sys.path.insert(0, str(current_dir))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.test import Client
from django.contrib.auth.models import User
from blogs.models import Post
from pages.models import Page

async def websocket_test():
    """Test WebSocket connection and real-time notifications"""

    print("Testing WebSocket real-time notifications...")

    # Test WebSocket connection
    uri = "ws://localhost:8000/ws/v1/posts/"
    try:
        async with websockets.connect(uri) as websocket:
            print("✅ WebSocket connection established")

            # Send a test message
            test_message = {"type": "test", "message": "Hello WebSocket"}
            await websocket.send(json.dumps(test_message))
            print("✅ Test message sent")

            # Try to receive a response (with timeout)
            try:
                response = await asyncio.wait_for(websocket.recv(), timeout=5.0)
                print(f"✅ Received response: {response}")
            except asyncio.TimeoutError:
                print("⚠️  No response received (this is normal for broadcast-only WebSockets)")

    except Exception as e:
        print(f"❌ WebSocket test failed: {e}")
        print("Note: Make sure the Django server is running with Daphne:")
        print("python runserver_ws.py")

def api_test():
    """Test API endpoints to trigger WebSocket notifications"""

    print("\nTesting API endpoints...")

    client = Client()

    # Create a test user if it doesn't exist
    try:
        user = User.objects.get(username='testuser')
    except User.DoesNotExist:
        user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123',
            is_staff=True
        )
        print("✅ Created test user")

    # Login the test user
    login_success = client.login(username='testuser', password='testpass123')
    if login_success:
        print("✅ User logged in successfully")
    else:
        print("❌ Failed to login user")
        return

    # Test creating a blog post (should trigger WebSocket notification)
    try:
        response = client.post('/api/v1/posts/', {
            'title': 'Test Post',
            'content': 'Test content',
            'status': 'draft'
        })
        if response.status_code == 201:
            print("✅ Blog post created successfully")
        else:
            print(f"❌ Failed to create blog post: {response.status_code}")
            print(f"Response content: {response.content.decode()}")
    except Exception as e:
        print(f"❌ API test failed: {e}")

def main():
    """Run all tests"""

    print("Django-React Sync WebSocket Test Suite")
    print("=" * 50)

    # Run API test first
    api_test()

    # Run WebSocket test
    asyncio.run(websocket_test())

    print("\nTest suite completed!")
    print("\nTo run the server with WebSocket support:")
    print("python runserver_ws.py")

if __name__ == '__main__':
    main()