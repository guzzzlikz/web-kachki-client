import apiClient from './client';
import { Lesson, CreateLessonData } from '@/types/lesson';

export const createLesson = async (
  courseId: number,
  lessonId: number,
  lesson: CreateLessonData
): Promise<void> => {
  await apiClient.post(`/lessons/${courseId}/${lessonId}/create`, lesson);
};

export const removeLesson = async (
  courseId: number,
  lessonId: number
): Promise<void> => {
  await apiClient.post(`/lessons/${courseId}/${lessonId}/remove`);
};

