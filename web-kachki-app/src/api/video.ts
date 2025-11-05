import apiClient from './client';
import { Lesson } from '@/types/lesson';

export const uploadVideo = async (
  courseId: number,
  lessonId: number,
  file: File
): Promise<Lesson> => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await apiClient.post<Lesson>(
    `/courses/${courseId}/${lessonId}/upload`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
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

