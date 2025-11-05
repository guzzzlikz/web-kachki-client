import { useQuery } from '@tanstack/react-query';
import { checkCourse } from '@/api/courses';
import { getUserCourses } from '@/api/account';
import { useAuth } from '@/contexts/AuthContext';
import { Course } from '@/types';

// Note: The server doesn't have a general fetchCourses endpoint
// This hook will need to be updated based on actual server implementation
export const useCourses = (filters?: any) => {
  return useQuery({
    queryKey: ['courses', filters],
    queryFn: async () => {
      // TODO: Implement when server adds general courses endpoint
      return [] as Course[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCourse = (id: string | undefined, userId?: number) => {
  return useQuery({
    queryKey: ['course', id, userId],
    queryFn: async () => {
      if (!id || !userId) return null;
      const courseId = parseInt(id);
      const hasAccess = await checkCourse(userId, courseId);
      if (!hasAccess) {
        throw new Error('Course not available');
      }
      // TODO: Implement actual course fetching when server adds endpoint
      return null;
    },
    enabled: !!id && !!userId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUserCourses = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['courses', 'user', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      return await getUserCourses(user.id);
    },
    enabled: !!user?.id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

