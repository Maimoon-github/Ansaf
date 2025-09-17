from django.utils.text import slugify

def generate_unique_slug(model_class, value, slug_field="slug", max_length=255):
    """Generate a unique slug for model_class based on value.
    Collisions append -1, -2, etc. Truncates base to leave room for suffix.
    """
    base = slugify(value)[:max_length]
    slug = base
    i = 1
    Model = model_class
    # Loop until unique
    while Model.objects.filter(**{slug_field: slug}).exists():
        suffix = f"-{i}"
        trim = max_length - len(suffix)
        slug = f"{base[:trim]}{suffix}"
        i += 1
    return slug
