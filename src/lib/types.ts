// API Response Types
export interface User {
  id: number;
  username: string;
  email: string;
  is_staff: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  csrf_token: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  author: number;
  author_username: string;
  content: string;
  excerpt: string;
  status: 'draft' | 'published';
  published_at: string | null;
  created_at: string;
  updated_at: string;
  version: number;
  cover_image: string | null;
  views_count: number;
  categories: Category[];
  category_ids: number[];
  tags: string[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number | null;
}

export interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  status: 'draft' | 'published';
  published_at: string | null;
  author: number | null;
  meta_title: string;
  meta_description: string;
  og_image: string | null;
  created_at: string;
  updated_at: string;
  version: number;
}

// API Request Types
export interface CreateBlogRequest {
  title: string;
  content: string;
  excerpt?: string;
  status?: 'draft' | 'published';
  category_ids?: number[];
  tags?: string[];
}

export interface UpdateBlogRequest extends Partial<CreateBlogRequest> {
  version?: number;
}

export interface CreatePageRequest {
  title: string;
  content?: string;
  status?: 'draft' | 'published';
  meta_title?: string;
  meta_description?: string;
}

export interface UpdatePageRequest extends Partial<CreatePageRequest> {
  version?: number;
}

// Pagination
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Error Types
export interface ValidationError {
  [field: string]: string[];
}

export interface ApiError {
  message: string;
  errors?: ValidationError;
}

export interface ConflictError {
  message: string;
  server: {
    id: number;
    version: number;
  };
  client: {
    attempted_version: number;
  };
}