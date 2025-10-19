import { useMemo } from "react";
import { useTutorFeedbacks } from "@/hooks/useTutorFeedbacks";
import { useTutorId } from "@/hooks/useTutorId";
import { useTranslations } from "next-intl";

export const useReviewData = () => {
  const { tutorId, isLoading: tutorLoading } = useTutorId();
  const {
    feedbacksData,
    isLoading: feedbacksLoading,
    error: feedbacksError,
  } = useTutorFeedbacks({
    tutorId: tutorId || "",
    enabled: !!tutorId,
  });
  const t = useTranslations("tutor.dashboard.reviews");

  const isLoading = tutorLoading || feedbacksLoading;

  // Convert feedbacks to display format
  const reviewItems = useMemo(() => {
    if (!feedbacksData?.feedbacks?.length) return [];

    return feedbacksData.feedbacks.slice(0, 4).map((feedback) => {
      // Format date
      const date = new Date(feedback.createdAt);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let timeAgo = "";
      if (diffDays === 1) {
        timeAgo = t("timeAgo.oneDay");
      } else if (diffDays < 7) {
        timeAgo = t("timeAgo.days", { count: diffDays });
      } else if (diffDays < 14) {
        timeAgo = t("timeAgo.oneWeek");
      } else if (diffDays < 30) {
        timeAgo = t("timeAgo.weeks", { count: Math.ceil(diffDays / 7) });
      } else {
        timeAgo = t("timeAgo.months", { count: Math.ceil(diffDays / 30) });
      }

      // Generate star rating display
      const generateStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = "";

        for (let i = 0; i < fullStars; i++) {
          stars += "★";
        }
        if (hasHalfStar) {
          stars += "☆";
        }
        while (stars.length < 5) {
          stars += "☆";
        }
        return stars;
      };

      return {
        id: feedback.feedbackId,
        studentName: feedback.studentName,
        courseTitle: feedback.courseTitle,
        rating: feedback.tutorRating,
        stars: generateStars(feedback.tutorRating),
        comment: feedback.comment,
        timeAgo,
        avatar: feedback.studentName.charAt(0).toUpperCase(),
      };
    });
  }, [feedbacksData, t]);

  return {
    reviewItems,
    averageRating: feedbacksData?.averageTutorRating || 0,
    totalFeedbacks: feedbacksData?.totalFeedbacks || 0,
    isLoading,
    feedbacksError,
    hasReviews: (feedbacksData?.feedbacks?.length || 0) > 0,
  };
};
