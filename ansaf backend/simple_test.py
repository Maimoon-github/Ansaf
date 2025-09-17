#!/usr/bin/env python
"""
Simple API test script
"""
import os
import sys
from pathlib import Path
import django

# Setup Django
current_dir = Path(__file__).parent
sys.path.insert(0, str(current_dir))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.test import Client
from django.contrib.auth.models import User

def test_api():
    """Test API endpoints"""

    print("Testing API endpoints...")

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

    # Test creating a blog post
    try:
        response = client.post('/api/v1/posts/', {
            'title': 'Test Post',
            'content': 'Test content',
            'status': 'draft'
        })
        if response.status_code == 201:
            print("✅ Blog post created successfully")
            print(f"Response: {response.content.decode()[:200]}...")
        else:
            print(f"❌ Failed to create blog post: {response.status_code}")
            print(f"Response content: {response.content.decode()}")
    except Exception as e:
        print(f"❌ API test failed: {e}")

if __name__ == '__main__':
    from pathlib import Path
    test_api()