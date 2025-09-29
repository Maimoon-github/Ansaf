// import axios, { AxiosInstance, AxiosResponse } from 'axios';
// import type { components } from './api-types';

// // Type aliases for cleaner code
// export type Post = components['schemas']['Post'];
// export type PageDetail = components['schemas']['PageDetail'];
// export type Category = components['schemas']['Category'];
// export type User = {
//   id: number;
//   username: string;
//   email: string;
//   is_staff: boolean;
// };
// export type AuthResponse = {
//   user: User;
//   token: string;
//   csrf_token: string;
// };

// // API base URL - adjust for your environment
// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

// // Create axios instance with default config
// const apiClient: AxiosInstance = axios.create({
//   baseURL: API_BASE_URL,
//   withCredentials: true, // Include cookies for session auth
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // CSRF token handling
// let csrfToken: string | null = null;

// const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api"

// async function getJSON<T>(path: string): Promise<T> {
//   const res = await fetch(`${BASE_URL}${path}`, { headers: { "Accept": "application/json" } })
//   if (!res.ok) {
//     const text = await res.text()
//     throw new Error(`API ${res.status}: ${text}`)
//   }
//   return res.json()
// }

// export const Api = {
//   listBlogs: async (q?: string) => {
//     const qs = q ? `?search=${encodeURIComponent(q)}` : ""
//     return getJSON<{ results?: any[] } | any[]>(`/blogs/${qs}`)
//   },
//   getBlog: async (slug: string) => getJSON(`/blogs/${encodeURIComponent(slug)}/`),
// }
// export default Api


// // Function to get CSRF token
// export const getCsrfToken = async (): Promise<string> => {
//   if (csrfToken) return csrfToken;

//   try {
//     const response = await apiClient.get('/auth/csrf_token/');
//     csrfToken = response.data.csrf_token;
//     return csrfToken;
//   } catch (error) {
//     console.error('Failed to get CSRF token:', error);
//     throw error;
//   }
// };

// // Request interceptor to add CSRF token
// apiClient.interceptors.request.use(
//   async (config) => {
//     // Add CSRF token for non-GET requests
//     if (config.method && !['get', 'head', 'options'].includes(config.method.toLowerCase())) {
//       if (!csrfToken) {
//         csrfToken = await getCsrfToken();
//       }
//       config.headers['X-CSRFToken'] = csrfToken;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor for error handling
// apiClient.interceptors.response.use(
//   (response: AxiosResponse) => {
//     return response;
//   },
//   (error) => {
//     if (error.response?.status === 401) {
//       // Handle unauthorized - redirect to login or refresh token
//       console.warn('Unauthorized request - user may need to login');
//     } else if (error.response?.status === 403) {
//       console.warn('Forbidden - insufficient permissions');
//     } else if (error.response?.status === 409) {
//       // Version conflict - handle optimistic locking
//       console.warn('Version conflict detected:', error.response.data);
//     }

//     return Promise.reject(error);
//   }
// );

// // API endpoints
// export const api = {
//   // Authentication
//   auth: {
//     login: (credentials: { username: string; password: string }) =>
//       apiClient.post('/auth/login/', credentials),
//     logout: () => apiClient.post('/auth/logout/'),
//     me: () => apiClient.get('/auth/me/'),
//     csrfToken: () => apiClient.get('/auth/csrf_token/'),
//   },

//   // Blogs
//   blogs: {
//     list: (params?: any) => {
//       console.log('API blogs.list called with params:', params);
//       const result = apiClient.get('/posts/', { params });
//       console.log('API blogs.list result:', result);
//       return result;
//     },
//     create: (data: any) => apiClient.post('/posts/', data),
//     retrieve: (slug: string) => apiClient.get(`/posts/${slug}/`),
//     update: (slug: string, data: any, version?: number) => {
//       const headers: any = {};
//       if (version) {
//         headers['If-Match'] = version.toString();
//       }
//       return apiClient.put(`/posts/${slug}/`, data, { headers });
//     },
//     partialUpdate: (slug: string, data: any, version?: number) => {
//       const headers: any = {};
//       if (version) {
//         headers['If-Match'] = version.toString();
//       }
//       return apiClient.patch(`/posts/${slug}/`, data, { headers });
//     },
//     delete: (slug: string) => apiClient.delete(`/posts/${slug}/`),
//   },

//   // Pages
//   pages: {
//     list: (params?: any) => apiClient.get('/pages/', { params }),
//     myPages: () => apiClient.get('/pages/my_pages/'),
//     create: (data: any) => apiClient.post('/pages/', data),
//     retrieve: (slug: string) => apiClient.get(`/pages/${slug}/`),
//     update: (slug: string, data: any, version?: number) => {
//       const headers: any = {};
//       if (version) {
//         headers['If-Match'] = version.toString();
//       }
//       return apiClient.put(`/pages/${slug}/`, data, { headers });
//     },
//     partialUpdate: (slug: string, data: any, version?: number) => {
//       const headers: any = {};
//       if (version) {
//         headers['If-Match'] = version.toString();
//       }
//       return apiClient.patch(`/pages/${slug}/`, data, { headers });
//     },
//     delete: (slug: string) => apiClient.delete(`/pages/${slug}/`),
//   },
// };

// export default apiClient;















// ----------------------------------------------------------------------















import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig, AxiosRequestHeaders } from 'axios';
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

// Candidate bases (in order): explicit env override, older env var, relative path (for Vite proxy), localhost fallback
const CANDIDATE_BASES = [
  import.meta.env.VITE_API_BASE_URL,
  import.meta.env.VITE_API_URL,
  // use relative path so dev proxy can forward requests (recommended)
  "/api/v1",
  "/api",
  // fallback to local Django default
  "http://127.0.0.1:8000/api",
].filter(Boolean) as string[];

// The axios client uses the first candidate (prefer env override if present)
const API_BASE = CANDIDATE_BASES[0];

// axios client (stateful, includes cookies)
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE, // note: includes the trailing /api or /api/v1 as you configure env
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// CSRF token cache
let csrfToken: string | null = null;

// Helper to fetch CSRF token via axios client (endpoint consistent with API_BASE)
export const getCsrfToken = async (): Promise<string> => {
  if (csrfToken) return csrfToken;
  try {
    // Try v1 endpoint first, then fallback to unversioned endpoint if necessary
    const tryPaths = ['/v1/auth/csrf_token/', '/auth/csrf_token/', '/v1/auth/csrf-token/', '/auth/csrf-token/'];
    for (const p of tryPaths) {
      try {
        // actually try each candidate path
        const res = await apiClient.get(p);
        if (res?.data) {
          // attempt common field names
          csrfToken = res.data?.csrf_token ?? res.data?.token ?? null;
          if (csrfToken) return csrfToken;
        }
      } catch {
        // ignore and try next
      }
    }
    // If we couldn't fetch a token, attempt to read common cookie name (Django default)
    const cookieMatch = document.cookie.match(/csrftoken=([^;]+)/);
    if (cookieMatch) {
      csrfToken = cookieMatch[1];
      return csrfToken;
    }
    throw new Error('CSRF token not available');
  } catch (err) {
    console.error('getCsrfToken error', err);
    throw err;
  }
};

// axios request interceptor: make sure non-GET requests include CSRF
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig<unknown>) => {
    const method = config?.method?.toLowerCase?.() ?? '';
    if (method && !['get', 'head', 'options'].includes(method)) {
      if (!csrfToken) {
        try {
          csrfToken = await getCsrfToken();
        } catch {
          // allow the request to proceed — server will reject and error will be surfaced
        }
      }
      // Ensure headers has the correct AxiosRequestHeaders shape for TypeScript
      config.headers = (config.headers ?? {}) as AxiosRequestHeaders;
      // set header if we have token
      if (csrfToken) {
        (config.headers as AxiosRequestHeaders)['X-CSRFToken'] = csrfToken;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// axios response interceptor: surface useful messages
apiClient.interceptors.response.use(
  (res: AxiosResponse) => res,
  (err) => {
    // Attach a friendly message for common status codes
    const status = err?.response?.status;
    if (status === 401) err.message = 'Unauthorized (401). Please log in.';
    else if (status === 403) err.message = 'CSRF/Forbidden (403). Check CSRF token and credentials.';
    else if (status === 409) err.message = 'Conflict (409). Resource version mismatch (optimistic lock).';
    return Promise.reject(err);
  }
);

// Lightweight fetch-based helper for simple LIST/GETs (keeps using same API_BASE)
async function getJSON<T>(path: string): Promise<T> {
  const relPath = path.startsWith("/") ? path : "/" + path;

  // Try candidate bases in order until we get a successful JSON response.
  const errors: { url: string; reason: string }[] = [];
  for (const base of CANDIDATE_BASES) {
    const url = `${base.replace(/\/$/, "")}${relPath}`;
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: { Accept: "application/json" },
        credentials: "include",
        mode: "cors",
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        errors.push({ url, reason: `HTTP ${res.status} ${res.statusText} - ${text || "(no body)"}` });
        // try next base
        continue;
      }

      try {
        return (await res.json()) as T;
      } catch (err: unknown) {
        errors.push({ url, reason: `Invalid JSON: ${String((err as { message?: string })?.message ?? err)}` });
        continue;
      }
    } catch (err: unknown) {
      // network-level failure (DNS, connection refused, CORS blocked preflight)
      errors.push({ url, reason: `Network error: ${String((err as { message?: string })?.message ?? err)}` });
      continue;
    }
  }

  // All attempts failed — surface combined diagnostic to caller
  const details = errors.map((e) => `- ${e.url}: ${e.reason}`).join("\n");
  const message = `All API endpoints failed for path "${relPath}". Attempts:\n${details}`;
  console.error(message);
  throw new Error(message);
}

// Named export Api (lightweight) — keep for public reads
export const Api = {
  // listBlogs kept to call backend '/posts/' list view (uses fetch)
  listBlogs: async (q?: string) => {
    const qs = q ? `?search=${encodeURIComponent(q)}` : '';

    // Some deployments expose posts at slightly different paths (/posts/, /blogs/posts/,
    // versioned /v1/...). Try a short list of likely variants and return the first
    // successful JSON response. This makes the frontend resilient to small API path
    // differences between environments (dev proxy vs direct backend).
    const candidatePaths = [
      `/posts/${qs}`,
      `/blogs/posts/${qs}`,
      `/v1/posts/${qs}`,
      `/v1/blogs/posts/${qs}`,
      `/posts/${qs}`,
    ];

    const errors: string[] = [];
    for (const p of candidatePaths) {
      try {
        // getJSON will try configured bases (env/proxy/fallbacks)
        const data = await getJSON<{ results?: unknown[] } | unknown[]>(p);
        console.debug(
          'Api.listBlogs: successful path',
          p,
          data && (Array.isArray(data) ? data.length : (data as { results?: unknown[] }).results?.length)
        );
        return data;
      } catch (err: unknown) {
        errors.push(`${p}: ${String((err as { message?: string })?.message ?? err)}`);
        // try next candidate
        continue;
      }
    }

    // If we reached here, no candidate returned successfully. Surface a combined error
    const msg = `Api.listBlogs: all candidate endpoints failed. Attempts:\n${errors.join('\n')}`;
    console.error(msg);
    throw new Error(msg);
  },
  getBlog: async (slug: string) => getJSON(`/blogs/${encodeURIComponent(slug)}/`),

  // add a small patch helper that uses axios to ensure CSRF and cookies are applied
  patchPost: async (slugOrId: string | number, data: Record<string, unknown>, version?: number) => {
    // use a flexible type for headers so it is compatible with axios typings
    const headers: Record<string, string> = {};
    if (typeof version !== 'undefined' && version !== null) {
      // backend optimistic lock often expects If-Match header with version
      headers['If-Match'] = String(version);
    }
    try {
      const res = await apiClient.patch(`/posts/${encodeURIComponent(String(slugOrId))}/`, data, { headers });
      return res.data;
    } catch (err: unknown) {
      // Re-throw a helpful message
      throw new Error(String((err as { message?: string })?.message ?? 'Failed to patch post'));
    }
  },

  // convenience put helper (same considerations)
  putPost: async (slugOrId: string | number, data: Record<string, unknown>, version?: number) => {
    const headers: Record<string, string> = {};
    if (typeof version !== 'undefined' && version !== null) headers['If-Match'] = String(version);
    try {
      const res = await apiClient.put(`/posts/${encodeURIComponent(String(slugOrId))}/`, data, { headers });
      return res.data;
    } catch (err: unknown) {
      throw new Error(String((err as { message?: string })?.message ?? 'Failed to update post'));
    }
  },
};

// Full axios-backed endpoints (kept for backward compatibility). Use api.blogs.partialUpdate to call patch
export const api = {
  auth: {
    login: (credentials: { username: string; password: string }) => apiClient.post('/auth/login/', credentials),
    logout: () => apiClient.post('/auth/logout/'),
    me: () => apiClient.get('/auth/me/'),
    csrfToken: () => apiClient.get('/auth/csrf_token/'),
  },
  blogs: {
    list: (params?: Record<string, unknown>) => apiClient.get('/posts/', { params }),
    create: (data: Record<string, unknown>) => apiClient.post('/posts/', data),
    retrieve: (slug: string) => apiClient.get(`/posts/${slug}/`),
    update: (slug: string, data: Record<string, unknown>, version?: number) => {
      const headers: Record<string, string> = {};
      if (version) headers['If-Match'] = version.toString();
      return apiClient.put(`/posts/${slug}/`, data, { headers });
    },
    partialUpdate: (slug: string, data: Record<string, unknown>, version?: number) => {
      const headers: Record<string, string> = {};
      if (version) headers['If-Match'] = version.toString();
      return apiClient.patch(`/posts/${slug}/`, data, { headers });
    },
    delete: (slug: string) => apiClient.delete(`/posts/${slug}/`),
  },
  pages: {
    list: (params?: Record<string, unknown>) => apiClient.get('/pages/', { params }),
    myPages: () => apiClient.get('/pages/my_pages/'),
    create: (data: Record<string, unknown>) => apiClient.post('/pages/', data),
    retrieve: (slug: string) => apiClient.get(`/pages/${slug}/`),
    update: (slug: string, data: Record<string, unknown>, version?: number) => {
      const headers: Record<string, string> = {};
      if (version) headers['If-Match'] = version.toString();
      return apiClient.put(`/pages/${slug}/`, data, { headers });
    },
    partialUpdate: (slug: string, data: Record<string, unknown>, version?: number) => {
      const headers: Record<string, string> = {};
      if (version) headers['If-Match'] = version.toString();
      return apiClient.patch(`/pages/${slug}/`, data, { headers });
    },
    delete: (slug: string) => apiClient.delete(`/pages/${slug}/`),
  },
};

// Default export is the axios client instance
export default apiClient;
