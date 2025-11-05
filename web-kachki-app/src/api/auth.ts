import apiClient from './client';
import { AuthResponse, LoginData, RegisterData } from '@/types';

export const login = async (data: LoginData): Promise<string> => {
  const response = await apiClient.post<string>('/auth/login', data);
  
  const token = response.data;
  if (token) {
    localStorage.setItem('auth_token', token);
  }
  
  return token;
};

export const register = async (data: RegisterData): Promise<string> => {
  const response = await apiClient.post<string>('/auth/register', data);
  
  const token = response.data;
  if (token) {
    localStorage.setItem('auth_token', token);
  }
  
  return token;
};

export const logout = async (): Promise<void> => {
  localStorage.removeItem('auth_token');
};

export const getId = async (token: string): Promise<number> => {
  const response = await apiClient.get<number>('/auth/id', {
    params: { token }
  });
  return response.data;
};

