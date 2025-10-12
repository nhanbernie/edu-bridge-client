"use client";

import React from "react";
import { useRouter } from "next/navigation";
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
import {
  PAGE_CONTAINER,
  CONTENT_WRAPPER,
  PAGE_HEADER,
  PAGE_TITLE,
  PAGE_SUBTITLE,
} from "@/common/constants/className.constant";

interface StudentFeedbackPageProps {
  courseId: string;
}

const StudentFeedbackPage: React.FC<StudentFeedbackPageProps> = ({ courseId }) => {
  const router = useRouter();
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
          <div className={PAGE_HEADER}>
            <h1 className={PAGE_TITLE}>Đánh giá khóa học</h1>
            <p className={PAGE_SUBTITLE}>Xem và viết đánh giá cho khóa học</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 h-64 animate-pulse" />
            </div>
            <div className="lg:col-span-2 space-y-4">
              <FeedbackCardSkeleton count={3} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!enrollment) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Không tìm thấy khóa học
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Bạn chưa đăng ký khóa học này.</p>
          <Button onClick={() => router.push("/student/feedback")}>
            Quay lại danh sách khóa học
          </Button>
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
        <div className={PAGE_HEADER}>
          <Button variant="ghost" onClick={() => router.push("/student/feedback")} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại danh sách khóa học
          </Button>
          <h1 className={PAGE_TITLE}>{enrollment.courseTitle}</h1>
          <p className={PAGE_SUBTITLE}>
            Gia sư: {enrollment.tutorName} • {enrollment.completedSessions}/
            {enrollment.totalSessionsBooked} buổi đã hoàn thành
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Đánh giá từ học sinh ({totalFeedbacks})
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
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="text-center py-4">
                    <p className="text-gray-500 dark:text-gray-400">Chưa có đánh giá nào</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Create Feedback Section */}
        {canCreateFeedback ? (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Đánh giá của bạn
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RatingSummary type="create" onSubmit={handleSubmitFeedback} isLoading={isLoading} />
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <Card className="border-0 shadow-sm bg-yellow-50 dark:bg-yellow-900/20">
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-yellow-800 dark:text-yellow-200">
                    Bạn cần hoàn thành ít nhất 2 buổi học để có thể đánh giá khóa học này.
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
