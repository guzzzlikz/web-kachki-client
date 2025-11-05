import apiClient from './client';
import { User, Course } from '@/types';

export const getUserInfo = async (userId: number): Promise<User> => {
  const response = await apiClient.get<User>(`/account/${userId}/info`);
  return response.data;
};

export const changeDescription = async (
  userId: number,
  newDescription: string
): Promise<string> => {
  const response = await apiClient.post<string>(
    `/account/${userId}/description`,
    null,
    { params: { newDescription } }
  );
  return response.data;
};

export const changeName = async (
  userId: number,
  newName: string
): Promise<string> => {
  const response = await apiClient.post<string>(
    `/account/${userId}/name`,
    null,
    { params: { newName } }
  );
  return response.data;
};

export const getUserCourses = async (userId: number): Promise<Course[]> => {
  const response = await apiClient.get<Course[]>(`/account/${userId}/courses`);
  return response.data;
};

export const changeInstagram = async (
  userId: number,
  instUrl: string
): Promise<string> => {
  const response = await apiClient.post<string>(
    `/account/${userId}/inst`,
    null,
    { params: { instUrl } }
  );
  return response.data;
};

export const changeFacebook = async (
  userId: number,
  facebookUrl: string
): Promise<string> => {
  const response = await apiClient.post<string>(
    `/account/${userId}/facebook`,
    null,
    { params: { facebookUrl } }
  );
  return response.data;
};

export const changeLinkedIn = async (
  userId: number,
  linkedInUrl: string
): Promise<string> => {
  const response = await apiClient.post<string>(
    `/account/${userId}/linked`,
    null,
    { params: { linkedInUrl } }
  );
  return response.data;
};

export const changeTelegram = async (
  userId: number,
  telegramUrl: string
): Promise<string> => {
  const response = await apiClient.post<string>(
    `/account/${userId}/telegram`,
    null,
    { params: { telegramUrl } }
  );
  return response.data;
};

