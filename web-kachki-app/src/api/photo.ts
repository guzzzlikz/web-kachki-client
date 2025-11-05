import apiClient from './client';
import { User } from '@/types';

export const uploadPhoto = async (
  userId: number,
  file: File
): Promise<User> => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await apiClient.post<User>(
    `/photo/${userId}/upload`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

export const getUser = async (userId: number): Promise<User> => {
  const response = await apiClient.get<User>(`/photo/${userId}/user`);
  return response.data;
};

export const getPhotoUrl = async (userId: number): Promise<string> => {
  const response = await apiClient.get<string>(`/photo/${userId}/photo`);
  return response.data;
};

