import { useGetTutorFeedbacksQuery } from "@/services/feedback/feedback.service";

interface UseTutorFeedbacksProps {
  tutorId: string;
  enabled?: boolean;
}

export const useTutorFeedbacks = ({ tutorId, enabled = true }: UseTutorFeedbacksProps) => {
  const {
    data: feedbacksData,
    isLoading,
    error,
    refetch,
  } = useGetTutorFeedbacksQuery(
    { tutorId },
    {
      skip: !tutorId || !enabled,
    }
  );

  return {
    feedbacksData: feedbacksData?.data,
    isLoading,
    error,
    refetch,
  };
};
