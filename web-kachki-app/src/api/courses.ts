import apiClient from './client';
import { Course, CourseDetail } from '@/types';

export const addCourse = async (
  userId: number,
  courseId: number,
  course: Course
): Promise<void> => {
  await apiClient.post(`/courses/${userId}/${courseId}/add`, course);
};

export const removeCourse = async (
  userId: number,
  courseId: number
): Promise<void> => {
  await apiClient.post(`/courses/${userId}/${courseId}/remove`);
};

export const checkCourse = async (
  userId: number,
  courseId: number
): Promise<boolean> => {
  try {
    await apiClient.get(`/courses/${userId}/${courseId}`);
    return true;
  } catch (error) {
    return false;
  }
};

export const buyCourse = async (
  userId: number,
  courseId: number
): Promise<string> => {
  const response = await apiClient.post<string>(`/courses/${userId}/${courseId}/buy`);
  return response.data;
};

