# RoyalStep Blog Backend (MVP)

## Overview
MVP implementation of a Django blog platform with Posts, Categories, Comments, Tags and REST API.

## Environment
Use existing conda environment `royalstep`:

```powershell
conda activate royalstep
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## API Endpoints (Base `/api/`)
- `GET /api/posts/` list (filter: `author`, `status`, `categories__slug`, search: title/content/excerpt)
- `POST /api/posts/` create (auth required)
- `GET /api/posts/{id}/` retrieve (increments `views_count`)
- `PATCH /api/posts/{id}/` update (author or staff)
- `DELETE /api/posts/{id}/` delete (author or staff)
- `GET/POST /api/comments/` (creation auto sets `is_approved=False`)
- `GET /api/categories/`

## Admin
Visit `/admin/` for managing posts, categories and moderating comments. Use bulk action to publish drafts or approve comments.

## Next Steps (Planned)
See prompt spec for: caching (Redis), Celery tasks, S3 storage, thumbnails, search indexing, CI/CD, monitoring, backups.

## Development Notes
- Slugs auto-generate; collisions resolved by numeric suffix.
- Draft posts hidden from non-staff via API.
- Comments require moderation (`is_approved=True`).

## Testing (to be added)
Upcoming tests will cover models, slug uniqueness, permissions, and comment visibility.

## Pages Service (MVP Iteration 1)
Implemented foundational `Page` model and API:
- Fields: title, slug, content, status (draft/published), published_at, author, meta_title, meta_description, og_image, timestamps.
- Automatic unique slug generation with numeric suffix handling.
- Sanitization of HTML content using `bleach` (scripts/unsafe tags stripped).
- Querysets: `Page.objects.published()` returns only currently published pages.
- API Endpoints (read-focused for now):
	- `GET /api/pages/` (published only for public; staff see all)
	- `GET /api/pages/{slug}/` detail
	- Staff-authenticated create/update/delete via same endpoints (ModelViewSet).
- Admin: searchable/filterable with prepopulated slug.

Upcoming iterations will add: preview tokens, per-page caching with invalidation, redirect manager for slug changes, richer editor integration (CKEditor/TinyMCE), media storage abstraction, and CI workflows.
