import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import type {
  User,
  AuthResponse,
  BlogPost,
  Page,
  CreateBlogRequest,
  UpdateBlogRequest,
  CreatePageRequest,
  UpdatePageRequest,
  PaginatedResponse,
} from '../lib/types';

// Query keys
export const queryKeys = {
  auth: {
    me: ['auth', 'me'] as const,
  },
  blogs: {
    list: (params?: any) => ['blogs', 'list', params] as const,
    detail: (id: number) => ['blogs', 'detail', id] as const,
  },
  pages: {
    list: (params?: any) => ['pages', 'list', params] as const,
    detail: (slug: string) => ['pages', 'detail', slug] as const,
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
  return useQuery<PaginatedResponse<BlogPost>>({
    queryKey: queryKeys.blogs.list(params),
    queryFn: async () => {
      const response = await api.blogs.list(params);
      return response.data;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useBlog = (id: number) => {
  return useQuery<BlogPost>({
    queryKey: queryKeys.blogs.detail(id),
    queryFn: async () => {
      const response = await api.blogs.retrieve(id);
      return response.data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation<BlogPost, Error, CreateBlogRequest>({
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

  return useMutation<BlogPost, Error, { id: number; data: UpdateBlogRequest; version?: number }>({
    mutationFn: async ({ id, data, version }) => {
      const response = await api.blogs.update(id, data, version);
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Update the specific blog in cache
      queryClient.setQueryData(queryKeys.blogs.detail(variables.id), data);
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
    mutationFn: (id: number) => api.blogs.delete(id),
    onSuccess: (_, id) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: queryKeys.blogs.detail(id) });
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