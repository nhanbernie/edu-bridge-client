"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { ROUTES } from "@/common/constants/route.constant";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import RatingSummary from "@/components/common/EBRatingSummary";
import EBFeedbackCard from "@/components/common/EBFeedbackCard";
import { useGetCourseFeedbacksQuery } from "@/services/feedback";
import { MotionContainer, MotionItem } from "@/components/motion";
import { TutorFeedbackSkeleton } from "./skeleton";
import { EBButtonAction } from "@/components/motion";

interface TutorFeedbackPageProps {
  courseId: string;
}

const TutorFeedbackPage: React.FC<TutorFeedbackPageProps> = ({ courseId }) => {
  const t = useTranslations("tutor.feedback.detail");
  const { push } = useLocaleRouter();

  // Get course feedbacks
  const { data: feedbacksData, isLoading: isLoadingFeedbacks } = useGetCourseFeedbacksQuery({
    courseId,
  });

  // Get course info (getCourse endpoint requires tutorId, not courseId)
  // For now, we'll just use the course title from feedbacks
  // const { data: courseData, isLoading: isLoadingCourse } = useGetCourseQuery({ tutorId: "xxx" });

  if (isLoadingFeedbacks) {
    return <TutorFeedbackSkeleton />;
  }

  const feedbacks = feedbacksData?.data?.feedbacks || [];
  const averageRating = feedbacksData?.data?.averageCourseRating || 0;
  const totalFeedbacks = feedbacksData?.data?.totalFeedbacks || 0;
  const ratingCounts = feedbacksData?.data?.ratingCounts;
  const courseTitle = feedbacks.length > 0 ? feedbacks[0].courseTitle : "Khóa học";

  return (
    <MotionContainer className="min-h-screen space-y-6 lg:space-y-8">
      {/* Header */}
      <MotionItem>
        <div className="mb-6 lg:mb-8">
          {/* NOTE: return button */}
          <EBButtonAction
            enableIconAnimation={true}
            enableTextAnimation={true}
            onClick={() => push(ROUTES.TUTOR_FEEDBACK)}
            className="mb-4 text-muted-foreground hover:bg-muted flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium text-sm whitespace-nowrap">{t("backButton")}</span>
          </EBButtonAction>
          <div className="flex items-center gap-3 mb-3 lg:mb-4">
            {/* <Star className="h-8 w-8 text-primary" /> */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground break-words">
              {courseTitle}
            </h1>
          </div>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </MotionItem>

      <MotionItem>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column - Rating Summary */}
          <div className="order-2 lg:order-1">
            <RatingSummary
              type="view"
              averageRating={averageRating}
              totalReviews={totalFeedbacks}
              ratingCounts={ratingCounts}
            />
          </div>

          {/* Right Column - All Feedbacks */}
          <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              {t("allFeedbacks")} ({totalFeedbacks})
            </h2>
            {feedbacks.length > 0 ? (
              <div className="space-y-4 sm:space-y-6">
                {feedbacks.map((feedback) => (
                  <EBFeedbackCard
                    key={feedback.feedbackId}
                    studentName={feedback.studentName}
                    courseTitle={feedback.courseTitle}
                    tutorRating={feedback.tutorRating}
                    courseRating={feedback.courseRating}
                    comment={feedback.comment}
                    createdAt={feedback.createdAt}
                  />
                ))}
              </div>
            ) : (
              <Card className="border-0 shadow-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="text-center py-4">
                    <p className="text-sm sm:text-base text-muted-foreground">{t("noFeedbacks")}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </MotionItem>
    </MotionContainer>
  );
};

export default TutorFeedbackPage;
