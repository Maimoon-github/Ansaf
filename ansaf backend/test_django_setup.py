#!/usr/bin/env python
"""
Simple test to check Django setup without running server
"""
import os
import sys
import django
from pathlib import Path

# Setup Django
current_dir = Path(__file__).parent
sys.path.insert(0, str(current_dir))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

try:
    django.setup()
    print("✅ Django setup successful")
except Exception as e:
    print(f"❌ Django setup failed: {e}")
    sys.exit(1)

# Test basic imports
try:
    from django.contrib.auth.models import User
    from blogs.models import Post
    from pages.models import Page
    print("✅ Model imports successful")
except Exception as e:
    print(f"❌ Model import failed: {e}")
    sys.exit(1)

# Test database connection
try:
    from django.db import connection
    cursor = connection.cursor()
    print("✅ Database connection successful")
except Exception as e:
    print(f"❌ Database connection failed: {e}")
    sys.exit(1)

print("🎉 All basic Django tests passed!")