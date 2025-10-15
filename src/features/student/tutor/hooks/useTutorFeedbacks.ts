import { useTutorFeedbacks } from "@/hooks/useTutorFeedbacks";

interface UseTutorFeedbacksProps {
  tutorId: string;
  enabled?: boolean;
}

export const useTutorFeedbacksData = ({ tutorId, enabled = true }: UseTutorFeedbacksProps) => {
  const { feedbacksData, isLoading, error, refetch } = useTutorFeedbacks({
    tutorId,
    enabled,
  });

  return {
    feedbacksData,
    isLoading,
    error,
    refetch,
  };
};
