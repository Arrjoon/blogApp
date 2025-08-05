import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

const authRoutes = ['/auth/login', '/auth/register'];

apiClient.interceptors.request.use((config) => {
  if (authRoutes.some(route => config.url?.includes(route))) {
    return config;
  }

  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    
    if (authRoutes.some(route => originalRequest.url?.includes(route))) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      if (!originalRequest._retry) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('session-expired'));
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;