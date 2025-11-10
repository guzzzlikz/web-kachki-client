import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ApiError } from '@/types';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor для додавання токену
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor для обробки помилок
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      // Не перенаправляємо автоматично, щоб не перервати процес логіну
      if (window.location.pathname !== '/sign-in' && window.location.pathname !== '/sign-up') {
        window.location.href = '/sign-in';
      }
    }
    
    // Обробка різних форматів помилок від сервера
    let errorMessage = 'An error occurred';
    if (error.response?.data) {
      // Якщо сервер повертає рядок (наприклад, "Invalid email or password")
      if (typeof error.response.data === 'string') {
        errorMessage = error.response.data;
      } 
      // Якщо сервер повертає об'єкт з полем message
      else if ((error.response.data as any)?.message) {
        errorMessage = (error.response.data as any).message;
      }
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    const apiError: ApiError = {
      message: errorMessage,
      code: (error.response?.data as any)?.code,
      status: error.response?.status,
      errors: (error.response?.data as any)?.errors,
    };

    return Promise.reject(apiError);
  }
);

export default apiClient;

