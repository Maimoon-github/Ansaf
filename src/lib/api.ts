import axios, { AxiosInstance, AxiosResponse } from 'axios';
import type { components } from './api-types';

// Type aliases for cleaner code
export type Post = components['schemas']['Post'];
export type PageDetail = components['schemas']['PageDetail'];
export type Category = components['schemas']['Category'];
export type User = {
  id: number;
  username: string;
  email: string;
  is_staff: boolean;
};
export type AuthResponse = {
  user: User;
  token: string;
  csrf_token: string;
};

// API base URL - adjust for your environment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Include cookies for session auth
  headers: {
    'Content-Type': 'application/json',
  },
});

// CSRF token handling
let csrfToken: string | null = null;

// Function to get CSRF token
export const getCsrfToken = async (): Promise<string> => {
  if (csrfToken) return csrfToken;

  try {
    const response = await apiClient.get('/auth/csrf_token/');
    csrfToken = response.data.csrf_token;
    return csrfToken;
  } catch (error) {
    console.error('Failed to get CSRF token:', error);
    throw error;
  }
};

// Request interceptor to add CSRF token
apiClient.interceptors.request.use(
  async (config) => {
    // Add CSRF token for non-GET requests
    if (config.method && !['get', 'head', 'options'].includes(config.method.toLowerCase())) {
      if (!csrfToken) {
        csrfToken = await getCsrfToken();
      }
      config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login or refresh token
      console.warn('Unauthorized request - user may need to login');
    } else if (error.response?.status === 403) {
      console.warn('Forbidden - insufficient permissions');
    } else if (error.response?.status === 409) {
      // Version conflict - handle optimistic locking
      console.warn('Version conflict detected:', error.response.data);
    }

    return Promise.reject(error);
  }
);

// API endpoints
export const api = {
  // Authentication
  auth: {
    login: (credentials: { username: string; password: string }) =>
      apiClient.post('/v1/auth/login/', credentials),
    logout: () => apiClient.post('/v1/auth/logout/'),
    me: () => apiClient.get('/v1/auth/me/'),
    csrfToken: () => apiClient.get('/v1/auth/csrf_token/'),
  },

  // Blogs
  blogs: {
    list: (params?: any) => apiClient.get('/v1/posts/', { params }),
    create: (data: any) => apiClient.post('/v1/posts/', data),
    retrieve: (id: number) => apiClient.get(`/v1/posts/${id}/`),
    update: (id: number, data: any, version?: number) => {
      const headers: any = {};
      if (version) {
        headers['If-Match'] = version.toString();
      }
      return apiClient.put(`/v1/posts/${id}/`, data, { headers });
    },
    partialUpdate: (id: number, data: any, version?: number) => {
      const headers: any = {};
      if (version) {
        headers['If-Match'] = version.toString();
      }
      return apiClient.patch(`/v1/posts/${id}/`, data, { headers });
    },
    delete: (id: number) => apiClient.delete(`/v1/posts/${id}/`),
  },

  // Pages
  pages: {
    list: (params?: any) => apiClient.get('/v1/pages/', { params }),
    create: (data: any) => apiClient.post('/v1/pages/', data),
    retrieve: (slug: string) => apiClient.get(`/v1/pages/${slug}/`),
    update: (slug: string, data: any, version?: number) => {
      const headers: any = {};
      if (version) {
        headers['If-Match'] = version.toString();
      }
      return apiClient.put(`/v1/pages/${slug}/`, data, { headers });
    },
    partialUpdate: (slug: string, data: any, version?: number) => {
      const headers: any = {};
      if (version) {
        headers['If-Match'] = version.toString();
      }
      return apiClient.patch(`/v1/pages/${slug}/`, data, { headers });
    },
    delete: (slug: string) => apiClient.delete(`/v1/pages/${slug}/`),
  },
};

export default apiClient;