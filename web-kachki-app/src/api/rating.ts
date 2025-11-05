import apiClient from './client';

export const updateRating = async (
  courseId: number,
  rate: number
): Promise<void> => {
  await apiClient.post(
    `/rating/${courseId}/rating`,
    null,
    { params: { rate } }
  );
};

