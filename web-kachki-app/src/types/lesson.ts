export interface Lesson {
  id: number;
  title: string;
  description?: string;
  teacherId?: string;
  courseId: number;
  videoFileName?: string;
}

export interface CreateLessonData {
  title: string;
  description?: string;
  teacherId?: string;
}

