#!/usr/bin/env python
"""
Test script to create sample blog posts and pages
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

from django.contrib.auth.models import User
from blogs.models import Post, Category
from pages.models import Page

def create_sample_data():
    """Create sample blog posts and pages"""

    # Create or get admin user
    admin_user, created = User.objects.get_or_create(
        username='admin',
        defaults={
            'email': 'admin@example.com',
            'is_staff': True,
            'is_superuser': True
        }
    )
    if created:
        admin_user.set_password('admin123')
        admin_user.save()
        print("Created admin user")

    # Create categories
    tech_cat, _ = Category.objects.get_or_create(name="Technology", defaults={'slug': 'technology'})
    design_cat, _ = Category.objects.get_or_create(name="Design", defaults={'slug': 'design'})

    # Create sample blog posts
    if Post.objects.count() == 0:
        post1 = Post.objects.create(
            title="Welcome to Our Blog",
            content="<p>This is our first blog post. Welcome to the Ansaf blog platform!</p><p>We hope you enjoy reading our content.</p>",
            excerpt="Welcome to our new blog platform",
            author=admin_user,
            status='published'
        )
        post1.categories.add(tech_cat)
        post1.tags = ['welcome', 'blog']
        post1.save()

        post2 = Post.objects.create(
            title="Design Principles for Modern Web Apps",
            content="<p>Modern web applications require careful attention to design principles...</p><h2>Key Principles</h2><ul><li>User-centered design</li><li>Responsive layouts</li><li>Accessibility</li></ul>",
            excerpt="Learn about essential design principles for modern web applications",
            author=admin_user,
            status='published'
        )
        post2.categories.add(design_cat)
        post2.tags = ['design', 'web', 'ux']
        post2.save()

        print(f"Created {Post.objects.count()} blog posts")

    # Create sample pages
    if Page.objects.count() == 0:
        page1 = Page.objects.create(
            title="About Us",
            content="<h1>About Our Company</h1><p>We are a leading construction and design company...</p>",
            meta_title="About Us - Ansaf Construction",
            meta_description="Learn more about Ansaf Construction and our services",
            author=admin_user,
            status='published'
        )

        page2 = Page.objects.create(
            title="Contact Information",
            content="<h1>Get In Touch</h1><p>Contact us for your construction needs...</p>",
            meta_title="Contact Us - Ansaf Construction",
            meta_description="Contact information for Ansaf Construction services",
            author=admin_user,
            status='published'
        )

        print(f"Created {Page.objects.count()} pages")

    print("Sample data created successfully!")
    print(f"Total posts: {Post.objects.count()}")
    print(f"Total pages: {Page.objects.count()}")

if __name__ == '__main__':
    create_sample_data()