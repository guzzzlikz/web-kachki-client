import apiClient from './client';
import axios from 'axios';
import { AuthResponse, LoginData, RegisterData, User, UserType } from '@/types';

export const login = async (data: LoginData): Promise<string> => {
  try {
    const response = await apiClient.post<string>('/auth/login', {
      email: data.email,
      password: data.password,
    });
    
    // Сервер повертає токен як рядок в body
    const token = typeof response.data === 'string' ? response.data : (response.data as any)?.token || response.data;
    
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      throw new Error('Token not received from server');
    }
    
    return token;
  } catch (error: any) {
    console.error('Login error:', error);
    throw error;
  }
};

// Функція для генерації унікального ID користувача
const generateUserId = (): number => {
  // Використовуємо timestamp + випадкове число для унікальності
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  // Обмежуємо до безпечного діапазону для long (Java)
  return timestamp % 9000000000000000 + random;
};

export const register = async (data: RegisterData): Promise<string> => {
  // Маппінг UserType клієнта на TYPE сервера (TEACHER -> COUCH)
  const mapUserTypeToServer = (type: UserType | undefined): string => {
    if (type === UserType.TEACHER) {
      return 'COUCH'; // Сервер використовує COUCH замість TEACHER
    }
    return type || 'USER';
  };
  
  // Створюємо повний об'єкт User для відправки на сервер
  // Сервер очікує рядкове значення enum (USER, COUCH, ADMIN)
  const userData: any = {
    id: data.id,
    email: data.email,
    name: data.name,
    password: data.password,
    type: mapUserTypeToServer(data.type),
  };
  
  const response = await apiClient.post<string>('/auth/register', userData);
  
  const token = response.data;
  if (token) {
    localStorage.setItem('auth_token', token);
  }
  
  return token;
};

// Експортуємо функцію генерації ID для використання в компонентах
export { generateUserId };

export const logout = async (): Promise<void> => {
  localStorage.removeItem('auth_token');
};

export const getId = async (token: string): Promise<number> => {
  // Використовуємо окремий запит без interceptor, оскільки токен передається як query параметр
  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
  const response = await axios.get<number>(`${baseURL}/auth/id`, {
    params: { token }
  });
  return response.data;
};

