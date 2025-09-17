import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import type { Post, PageDetail, User, AuthResponse } from '../lib/api';
import type { components } from '../lib/api-types';

// Type aliases
type PaginatedResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

type CreateBlogRequest = {
  title: string;
  content: string;
  excerpt?: string;
  status?: 'draft' | 'published';
  category_ids?: number[];
  tags?: string[];
};

type UpdateBlogRequest = Partial<CreateBlogRequest> & { version?: number };

type CreatePageRequest = {
  title: string;
  content?: string;
  status?: 'draft' | 'published';
  meta_title?: string;
  meta_description?: string;
};

type UpdatePageRequest = Partial<CreatePageRequest> & { version?: number };

// Query keys
export const queryKeys = {
  auth: {
    me: ['auth', 'me'] as const,
  },
  blogs: {
    list: (params?: any) => ['blogs', 'list', params] as const,
    detail: (slug: string) => ['blogs', 'detail', slug] as const,
  },
  pages: {
    list: (params?: any) => ['pages', 'list', params] as const,
    detail: (slug: string) => ['pages', 'detail', slug] as const,
    myPages: () => ['pages', 'myPages'] as const,
  },
};

// Auth hooks
export const useAuth = () => {
  return useQuery<User>({
    queryKey: queryKeys.auth.me,
    queryFn: async () => {
      const response = await api.auth.me();
      return response.data;
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, { username: string; password: string }>({
    mutationFn: async (credentials) => {
      const response = await api.auth.login(credentials);
      return response.data;
    },
    onSuccess: (data) => {
      // Update auth state
      queryClient.setQueryData(queryKeys.auth.me, data.user);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.auth.logout,
    onSuccess: () => {
      // Clear auth state
      queryClient.removeQueries({ queryKey: ['auth'] });
      queryClient.removeQueries({ queryKey: ['blogs'] });
      queryClient.removeQueries({ queryKey: ['pages'] });
    },
  });
};

// Blog hooks
export const useBlogs = (params?: any) => {
  console.log('useBlogs called with params:', params);
  return useQuery<PaginatedResponse<Post>>({
    queryKey: queryKeys.blogs.list(params),
    queryFn: async () => {
      console.log('Fetching blogs from API...');
      const response = await api.blogs.list(params);
      console.log('API response:', response);
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useBlog = (slug: string) => {
  return useQuery<Post>({
    queryKey: queryKeys.blogs.detail(slug),
    queryFn: async () => {
      const response = await api.blogs.retrieve(slug);
      return response.data;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation<Post, Error, CreateBlogRequest>({
    mutationFn: async (data) => {
      const response = await api.blogs.create(data);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch blogs list
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });
};

export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation<Post, Error, { slug: string; data: UpdateBlogRequest; version?: number }>({
    mutationFn: async ({ slug, data, version }) => {
      const response = await api.blogs.update(slug, data, version);
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Update the specific blog in cache
      queryClient.setQueryData(queryKeys.blogs.detail(variables.slug), data);
      // Invalidate list to ensure consistency
      queryClient.invalidateQueries({ queryKey: ['blogs', 'list'] });
    },
    onError: (error: any) => {
      if (error.response?.status === 409) {
        // Handle version conflict
        console.error('Version conflict:', error.response.data);
      }
    },
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => api.blogs.delete(slug),
    onSuccess: (_, slug) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: queryKeys.blogs.detail(slug) });
      // Invalidate list
      queryClient.invalidateQueries({ queryKey: ['blogs', 'list'] });
    },
  });
};

// Page hooks (similar to blog hooks)
export const usePages = (params?: any) => {
  return useQuery({
    queryKey: queryKeys.pages.list(params),
    queryFn: async () => {
      const response = await api.pages.list(params);
      return response.data;
    },
    staleTime: 2 * 60 * 1000,
  });
};

export const usePage = (slug: string) => {
  return useQuery({
    queryKey: queryKeys.pages.detail(slug),
    queryFn: async () => {
      const response = await api.pages.retrieve(slug);
      return response.data;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreatePage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.pages.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pages'] });
    },
  });
};

export const useUpdatePage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ slug, data, version }: { slug: string; data: any; version?: number }) => {
      const response = await api.pages.update(slug, data, version);
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(queryKeys.pages.detail(variables.slug), data);
      queryClient.invalidateQueries({ queryKey: ['pages', 'list'] });
    },
    onError: (error: any) => {
      if (error.response?.status === 409) {
        console.error('Version conflict:', error.response.data);
      }
    },
  });
};

export const useDeletePage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => api.pages.delete(slug),
    onSuccess: (_, slug) => {
      queryClient.removeQueries({ queryKey: queryKeys.pages.detail(slug) });
      queryClient.invalidateQueries({ queryKey: ['pages', 'list'] });
    },
  });
};

export const useMyPages = () => {
  return useQuery({
    queryKey: queryKeys.pages.myPages(),
    queryFn: async () => {
      const response = await api.pages.myPages();
      return response.data;
    },
    staleTime: 2 * 60 * 1000,
  });
};