import apiClient from './client';
import { Lesson } from '@/types/lesson';

// Генерує URL для завантаження відео
export const generateVideoUrl = async (
  courseId: number,
  lessonId: number,
  title: string,
  type: string
): Promise<string> => {
  const response = await apiClient.post<string>(
    `/courses/${courseId}/${lessonId}/generateUrl`,
    { title, type }
  );
  return response.data;
};

// Завершує завантаження відео (встановлює ім'я файлу в урок)
export const finishVideoUpload = async (
  courseId: number,
  lessonId: number,
  title: string,
  type: string
): Promise<string> => {
  const response = await apiClient.post<string>(
    `/courses/${courseId}/${lessonId}/finish`,
    { title, type }
  );
  return response.data;
};

export const getLessons = async (courseId: number): Promise<Lesson[]> => {
  const response = await apiClient.get<Lesson[]>(`/courses/${courseId}/lessons`);
  return response.data;
};

export const getVideoUrl = async (
  courseId: number,
  lessonId: number
): Promise<string> => {
  const response = await apiClient.get<string>(
    `/courses/${courseId}/${lessonId}/video`
  );
  return response.data;
};

