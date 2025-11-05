import apiClient from './client';
import { User } from '@/types';

export const updateUser = async (data: Partial<User>): Promise<User> => {
  const response = await apiClient.put<User>('/users/me', data);
  return response.data;
};

export const deleteUser = async (): Promise<void> => {
  await apiClient.delete('/users/me');
};

export const getUserProfile = async (userId: string): Promise<User> => {
  const response = await apiClient.get<User>(`/users/${userId}`);
  return response.data;
};

