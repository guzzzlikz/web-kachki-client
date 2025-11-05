import { Lesson } from './lesson';

export enum CourseTags {
  YOGA = 'YOGA',
  GYM = 'GYM',
  FITNESS = 'FITNESS'
}

export interface Course {
  courseId: number;
  userId: number;
  title: string;
  creatorName: string;
  description: string;
  tagsList?: CourseTags[];
  lessons?: Lesson[];
  pathToPreviewVideo?: string;
  pathToPreviewPhoto?: string;
  rating?: number;
  rates?: number;
}

export interface CourseDetail extends Course {
  // All fields from Course
}

export interface CourseFilters {
  search?: string;
  userId?: number;
}

export interface Trainer {
  id: number;
  name: string;
  description?: string;
  pathToPhoto?: string;
}

