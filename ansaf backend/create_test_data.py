#!/usr/bin/env python
"""
Script to create test blog posts for development
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

def create_test_data():
    print("Creating test data...")

    # Create test user
    user, created = User.objects.get_or_create(
        username='testuser',
        defaults={
            'email': 'test@example.com',
            'first_name': 'Test',
            'last_name': 'User'
        }
    )
    if created:
        user.set_password('testpass123')
        user.save()
        print("✅ Created test user")

    # Create categories
    categories = []
    for name, slug in [('Technology', 'technology'), ('Business', 'business'), ('Lifestyle', 'lifestyle')]:
        cat, created = Category.objects.get_or_create(
            name=name,
            defaults={'slug': slug}
        )
        categories.append(cat)
        if created:
            print(f"✅ Created category: {name}")

    # Create test posts
    posts_data = [
        {
            'title': 'Getting Started with React and TypeScript',
            'slug': 'getting-started-react-typescript',
            'content': '''
            <h2>Introduction</h2>
            <p>React and TypeScript make a powerful combination for building modern web applications. In this post, we'll explore the basics of setting up a React project with TypeScript.</p>

            <h2>Why TypeScript?</h2>
            <p>TypeScript adds static typing to JavaScript, which helps catch errors early and makes code more maintainable.</p>

            <h2>Setting Up</h2>
            <p>To get started, you'll need Node.js and npm installed. Then run:</p>
            <pre><code>npx create-react-app my-app --template typescript</code></pre>
            ''',
            'excerpt': 'Learn how to set up a React project with TypeScript for better development experience.',
            'status': 'published'
        },
        {
            'title': 'Building REST APIs with Django REST Framework',
            'slug': 'building-rest-apis-django-rest-framework',
            'content': '''
            <h2>Django REST Framework Overview</h2>
            <p>Django REST Framework (DRF) is a powerful toolkit for building Web APIs in Django. It provides a set of tools and libraries that make it easy to build RESTful APIs.</p>

            <h2>Key Features</h2>
            <ul>
                <li>Serialization</li>
                <li>Authentication & Permissions</li>
                <li>ViewSets & Routers</li>
                <li>Documentation</li>
            </ul>

            <h2>Getting Started</h2>
            <p>Install DRF and add it to your INSTALLED_APPS:</p>
            <pre><code>pip install djangorestframework</code></pre>
            ''',
            'excerpt': 'A comprehensive guide to building REST APIs using Django REST Framework.',
            'status': 'published'
        },
        {
            'title': 'Modern CSS Techniques for Responsive Design',
            'slug': 'modern-css-responsive-design',
            'content': '''
            <h2>Responsive Design Principles</h2>
            <p>Modern CSS provides powerful tools for creating responsive designs that work across all devices.</p>

            <h2>CSS Grid and Flexbox</h2>
            <p>CSS Grid and Flexbox are the foundation of modern layout techniques.</p>

            <h2>Media Queries</h2>
            <p>Use media queries to apply different styles based on screen size:</p>
            <pre><code>@media (max-width: 768px) {
                .container { flex-direction: column; }
            }</code></pre>
            ''',
            'excerpt': 'Explore modern CSS techniques for creating responsive web designs.',
            'status': 'published'
        }
    ]

    created_posts = []
    for i, post_data in enumerate(posts_data):
        post, created = Post.objects.get_or_create(
            slug=post_data['slug'],
            defaults={
                'title': post_data['title'],
                'content': post_data['content'],
                'excerpt': post_data['excerpt'],
                'status': post_data['status'],
                'author': user
            }
        )

        if created:
            # Add categories
            post.categories.add(categories[i % len(categories)])
            # Add some tags
            post.tags.add(f'tag{i+1}', f'test-tag-{i+1}')
            created_posts.append(post)
            print(f"✅ Created post: {post.title}")

    print(f"\n🎉 Created {len(created_posts)} test blog posts!")
    print("You can now access them at: http://localhost:8000/api/v1/posts/")

if __name__ == "__main__":
    create_test_data()