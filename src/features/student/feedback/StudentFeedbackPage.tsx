"use client";

import React from "react";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { ROUTES } from "@/common/constants/route.constant";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import RatingSummary from "@/components/common/EBRatingSummary";
import EBFeedbackCard from "@/components/common/EBFeedbackCard";
import { useCreateFeedback } from "./hooks/useCreateFeedback";
import { useGetCourseFeedbacksQuery } from "@/services/feedback";
import { useGetStudentEnrollmentsQuery } from "@/services/course";
import { useUserId } from "@/hooks/useUserId";
import { useRefetchSessions } from "@/hooks/useRefetchSessions";
import EBLoadingSpinner from "@/components/common/EBLoadingSpinner";
import { FeedbackCardSkeleton } from "@/components/common/skeletons";
import { PAGE_CONTAINER, CONTENT_WRAPPER } from "@/common/constants/className.constant";
import { useTranslations } from "next-intl";

interface StudentFeedbackPageProps {
  courseId: string;
}

const StudentFeedbackPage: React.FC<StudentFeedbackPageProps> = ({ courseId }) => {
  const { push } = useLocaleRouter();
  const t = useTranslations("student.feedback.detail");
  const { userId: studentId } = useUserId();
  const { createFeedback, isLoading } = useCreateFeedback();
  const { refetchAllSessions } = useRefetchSessions();

  // Get course feedbacks
  const {
    data: feedbacksData,
    isLoading: isLoadingFeedbacks,
    refetch: refetchFeedbacks,
  } = useGetCourseFeedbacksQuery({ courseId });

  // Get enrollments to check completedSessions
  const { data: enrollmentsData, isLoading: isLoadingEnrollments } = useGetStudentEnrollmentsQuery(
    { studentId: studentId || "" },
    { skip: !studentId }
  );

  const enrollment = enrollmentsData?.data?.find((e) => e.courseId === courseId);
  const canCreateFeedback = enrollment && enrollment.completedSessions > 1;

  const handleSubmitFeedback = async (
    tutorRating: number,
    courseRating: number,
    comment: string
  ) => {
    const result = await createFeedback({
      courseId: courseId,
      tutorRating: tutorRating,
      courseRating: courseRating,
      comment: comment,
    });

    if (result.success) {
      // Refetch feedbacks and sessions
      await refetchFeedbacks();
      await refetchAllSessions();
    }
  };

  if (isLoadingFeedbacks || isLoadingEnrollments) {
    return (
      <div className={PAGE_CONTAINER}>
        <div className={CONTENT_WRAPPER}>
          <div className="space-y-4 mb-8 animate-pulse">
            <div className="h-8 sm:h-10 bg-muted rounded w-48 sm:w-64"></div>
            <div className="h-5 sm:h-6 bg-muted rounded w-64 sm:w-96"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <div className="bg-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-border h-48 sm:h-64 animate-pulse" />
            </div>
            <div className="space-y-4">
              <FeedbackCardSkeleton count={3} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!enrollment) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">{t("notFound")}</h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-6">{t("notFoundMessage")}</p>
          <Button onClick={() => push(ROUTES.STUDENT_FEEDBACK)}>{t("backButton")}</Button>
        </div>
      </div>
    );
  }

  const feedbacks = feedbacksData?.data?.feedbacks || [];
  const averageRating = feedbacksData?.data?.averageCourseRating || 0;
  const totalFeedbacks = feedbacksData?.data?.totalFeedbacks || 0;
  const ratingCounts = feedbacksData?.data?.ratingCounts;

  return (
    <div className={PAGE_CONTAINER}>
      <div className={CONTENT_WRAPPER}>
        {/* Header */}
        <div className="space-y-4 mb-8">
          {/* NOTE: return button */}
          <Button variant="ghost" onClick={() => push(ROUTES.STUDENT_FEEDBACK)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("backButton")}
          </Button>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            {enrollment.courseTitle}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
            Gia sư: {enrollment.tutorName} • {enrollment.completedSessions}/
            {enrollment.totalSessionsBooked} buổi đã hoàn thành
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Left Column - Rating Summary */}
          <div>
            <RatingSummary
              type="view"
              averageRating={averageRating}
              totalReviews={totalFeedbacks}
              ratingCounts={ratingCounts}
            />
          </div>

          {/* Right Column - All Feedbacks */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              {t("allFeedbacks")} ({totalFeedbacks})
            </h2>
            {feedbacks.length > 0 ? (
              <div className="space-y-4">
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
              <Card className="border-0 shadow-sm bg-card">
                <CardContent className="p-4 sm:p-6">
                  <div className="text-center py-4">
                    <p className="text-sm sm:text-base text-muted-foreground">{t("noFeedbacks")}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Create Feedback Section */}
        {canCreateFeedback ? (
          <div className="mt-6 sm:mt-8">
            <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">
              {t("create.title")}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              <RatingSummary type="create" onSubmit={handleSubmitFeedback} isLoading={isLoading} />
            </div>
          </div>
        ) : (
          <div className="mt-6 sm:mt-8">
            <Card className="border-0 shadow-sm bg-yellow-50 dark:bg-yellow-900/20">
              <CardContent className="p-4 sm:p-6">
                <div className="text-center">
                  <p className="text-sm sm:text-base text-yellow-800 dark:text-yellow-200">
                    {t("cannotCreateMessage")}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentFeedbackPage;
