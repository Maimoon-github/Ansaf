#!/usr/bin/env python
"""
Test script to verify API functionality without WebSocket dependencies.
Usage: python test_api_only.py
"""
import os
import sys
import django
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

def test_api_endpoints():
    """Test basic API endpoints"""
    print("Django-React API Test Suite")
    print("============================")

    client = Client()

    # Test user login
    print("\nTesting user authentication...")
    try:
        # Create a test user if it doesn't exist
        user, created = User.objects.get_or_create(
            username='testuser',
            defaults={'email': 'test@example.com'}
        )
        if created:
            user.set_password('testpass123')
            user.save()
            print("✅ Test user created")

        # Login
        login_response = client.post('/api/v1/auth/login/', {
            'username': 'testuser',
            'password': 'testpass123'
        })
        if login_response.status_code == 200:
            print("✅ User logged in successfully")
        else:
            print(f"❌ Login failed: {login_response.status_code}")

    except Exception as e:
        print(f"❌ Authentication test failed: {e}")

    # Test blog creation
    print("\nTesting blog functionality...")
    try:
        # Create a blog post
        blog_data = {
            'title': 'Test Blog Post',
            'slug': 'test-blog-post',
            'content': 'This is a test blog post content.',
            'excerpt': 'Test excerpt',
            'status': 'published',
            'featured_image': '',
            'tags': ['test', 'blog']
        }

        response = client.post('/api/v1/posts/', blog_data)
        if response.status_code in [201, 200]:
            print("✅ Blog post created successfully")
        else:
            print(f"❌ Blog creation failed: {response.status_code} - {response.content}")

    except Exception as e:
        print(f"❌ Blog test failed: {e}")

    # Test page creation
    print("\nTesting page functionality...")
    try:
        # Create a page
        page_data = {
            'title': 'Test Page',
            'slug': 'test-page',
            'content': 'This is a test page content.',
            'status': 'published',
            'meta_description': 'Test meta description'
        }

        response = client.post('/api/v1/pages/', page_data)
        if response.status_code in [201, 200]:
            print("✅ Page created successfully")
        else:
            print(f"❌ Page creation failed: {response.status_code} - {response.content}")

    except Exception as e:
        print(f"❌ Page test failed: {e}")

    # Test blog retrieval
    print("\nTesting blog retrieval...")
    try:
        response = client.get('/api/v1/posts/')
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Retrieved {len(data.get('results', []))} blog posts")
        else:
            print(f"❌ Blog retrieval failed: {response.status_code}")

    except Exception as e:
        print(f"❌ Blog retrieval test failed: {e}")

    # Test page retrieval
    print("\nTesting page retrieval...")
    try:
        response = client.get('/api/v1/pages/')
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Retrieved {len(data.get('results', []))} pages")
        else:
            print(f"❌ Page retrieval failed: {response.status_code}")

    except Exception as e:
        print(f"❌ Page retrieval test failed: {e}")

    print("\n" + "="*50)
    print("API Test suite completed!")
    print("Note: WebSocket tests require running: python runserver_ws.py")
    print("To install WebSocket dependencies: python setup_websockets.py")

if __name__ == "__main__":
    test_api_endpoints()