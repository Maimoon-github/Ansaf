# Ansaf Backend - Django REST API with Real-time WebSocket Support

## Overview
Full-featured Django blog and page management system with REST API, optimistic locking, caching, and real-time WebSocket notifications.

## Features
- ✅ **Versioned REST API** under `/api/v1/` with OpenAPI schema generation
- ✅ **Optimistic Locking** using version fields and If-Match headers
- ✅ **ETag/Last-Modified Caching** headers for efficient caching
- ✅ **Real-time WebSocket Notifications** for live updates
- ✅ **Authentication** with session cookies and CSRF protection
- ✅ **React Query Integration** with TypeScript types from OpenAPI schema
- ✅ **Comprehensive API** for blogs (posts, categories, comments) and pages

## Environment Setup

### Prerequisites
- Python 3.11+
- Redis (for WebSocket channel layer)
- Node.js 18+ (for frontend)

### Development Scripts

This project includes several convenience scripts to simplify development:

#### Windows Batch Scripts
- `run_in_ansaf.bat <command>` - Run any command in the activated conda environment
- `django_cmd.bat <command>` - Run Django management commands (automatically activates environment)

#### PowerShell Scripts
- `run_in_ansaf.ps1 -Command "<command>"` - Run commands in activated conda environment
- `run_tests.ps1 [app_name] [test_name]` - Run Django tests with options
- `test_api.ps1` - Test API endpoints using PowerShell

#### Examples
```batch
# Run Django management commands
django_cmd.bat makemigrations
django_cmd.bat migrate
django_cmd.bat createsuperuser

# Run tests
run_tests.ps1 blogs
run_tests.ps1 -Verbose

# Run custom commands
run_in_ansaf.bat python manage.py shell
run_in_ansaf.bat python test_websockets.py
```

### Installation
```powershell
# Create and activate conda environment
conda create -n ansaf python=3.11
conda activate ansaf

# Install Python dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Generate OpenAPI schema (optional)
python manage.py spectacular --file schema.yml
```

### Running the Server

#### Standard Django Development Server
```powershell
python manage.py runserver
```

#### With WebSocket Support (Recommended)
```powershell
python runserver_ws.py
```
This starts Django with Daphne ASGI server for WebSocket support.

## API Endpoints

### Authentication
- `POST /api/v1/auth/login/` - User login
- `POST /api/v1/auth/logout/` - User logout
- `GET /api/v1/auth/me/` - Get current user info
- `GET /api/v1/auth/csrf/` - Get CSRF token

### Blogs API (`/api/v1/blogs/`)
- `GET /api/v1/blogs/posts/` - List posts (filterable/searchable)
- `POST /api/v1/blogs/posts/` - Create post (auth required)
- `GET /api/v1/blogs/posts/{id}/` - Get post details
- `PATCH /api/v1/blogs/posts/{id}/` - Update post (with optimistic locking)
- `DELETE /api/v1/blogs/posts/{id}/` - Delete post
- `GET /api/v1/blogs/categories/` - List categories
- `GET /api/v1/blogs/comments/` - List comments

### Pages API (`/api/v1/pages/`)
- `GET /api/v1/pages/` - List published pages
- `POST /api/v1/pages/` - Create page (staff only)
- `GET /api/v1/pages/{slug}/` - Get page details
- `PATCH /api/v1/pages/{slug}/` - Update page (with optimistic locking)
- `DELETE /api/v1/pages/{slug}/` - Delete page

## Real-time WebSocket Support

### WebSocket Endpoints
- `ws://localhost:8000/ws/v1/blogs/` - Blog updates
- `ws://localhost:8000/ws/v1/pages/` - Page updates

### Message Format
```json
{
  "type": "blog_change",
  "action": "created|updated|deleted",
  "id": "post_id",
  "data": {...},
  "timestamp": "2024-01-01T12:00:00Z"
}
```

### Frontend Integration
The React frontend automatically connects to WebSockets and invalidates React Query cache on real-time updates.

## Optimistic Locking

### Usage
Include `If-Match` header with current version:
```javascript
const response = await fetch('/api/v1/blogs/posts/1/', {
  method: 'PATCH',
  headers: {
    'If-Match': currentVersion,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(updates)
});
```

### Conflict Resolution
If version conflict occurs, server returns 409 status with details:
```json
{
  "error": "Version conflict",
  "message": "Resource has been modified by another user"
}
```

## Caching

### HTTP Caching
- ETag headers based on version + timestamp
- Last-Modified headers for conditional requests
- Automatic cache invalidation on updates

### React Query Integration
- Automatic background refetching
- Optimistic updates with rollback on failure
- Cache invalidation on WebSocket events

## Testing

### WebSocket Tests
```powershell
python test_websockets.py
```

### API Tests
```powershell
python manage.py test
```

## Development Notes

### Model Features
- Automatic slug generation with collision resolution
- Version fields for optimistic locking (auto-increment on save)
- Soft delete support (status-based)
- Rich text sanitization with bleach

### Security
- CSRF protection on all state-changing requests
- Authentication required for create/update/delete operations
- Staff permissions for page management
- Input sanitization and validation

### Performance
- Select/prefetch related for optimized queries
- Atomic view count increments
- Efficient caching with ETags
- Background WebSocket notifications

## Architecture

### Backend Components
- **Django 5.2.6** - Web framework
- **Django REST Framework 3.15.2** - API framework
- **Channels 4.1.0** - WebSocket support
- **Redis** - Channel layer for WebSockets
- **DRF Spectacular** - OpenAPI schema generation

### Frontend Integration
- **React Query 5.56.2** - Client-side data fetching
- **Axios** - HTTP client with CSRF handling
- **TypeScript** - Type safety with generated types
- **WebSocket API** - Real-time updates

## Deployment

### Production Setup
1. Set `DEBUG=False` and configure `SECRET_KEY`
2. Use PostgreSQL instead of SQLite
3. Configure Redis for channel layer
4. Set up Daphne with process manager (systemd/supervisor)
5. Configure static file serving
6. Set up monitoring and logging

### Environment Variables
```bash
DJANGO_SECRET_KEY=your-secret-key
DJANGO_DEBUG=False
DJANGO_ALLOWED_HOSTS=yourdomain.com
REDIS_URL=redis://localhost:6379/0
```

## Next Steps
- Observability stack (Sentry/Prometheus)
- Advanced caching strategies
- Background task processing (Celery)
- File upload and media management
- Advanced search and filtering
- API rate limiting and throttling
