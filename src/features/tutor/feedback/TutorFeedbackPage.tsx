"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import RatingSummary from "@/components/common/EBRatingSummary";
import EBFeedbackCard from "@/components/common/EBFeedbackCard";
import { useGetCourseFeedbacksQuery } from "@/services/feedback";
import EBLoadingSpinner from "@/components/common/EBLoadingSpinner";
import { PAGE_HEADER, PAGE_TITLE, PAGE_SUBTITLE } from "@/common/constants/className.constant";

interface TutorFeedbackPageProps {
  courseId: string;
}

const TutorFeedbackPage: React.FC<TutorFeedbackPageProps> = ({ courseId }) => {
  const router = useRouter();

  // Get course feedbacks
  const { data: feedbacksData, isLoading: isLoadingFeedbacks } = useGetCourseFeedbacksQuery({
    courseId,
  });

  // Get course info (getCourse endpoint requires tutorId, not courseId)
  // For now, we'll just use the course title from feedbacks
  // const { data: courseData, isLoading: isLoadingCourse } = useGetCourseQuery({ tutorId: "xxx" });

  if (isLoadingFeedbacks) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <EBLoadingSpinner message="Đang tải đánh giá..." size="lg" />
      </div>
    );
  }

  const feedbacks = feedbacksData?.data?.feedbacks || [];
  const averageRating = feedbacksData?.data?.averageCourseRating || 0;
  const totalFeedbacks = feedbacksData?.data?.totalFeedbacks || 0;
  const ratingCounts = feedbacksData?.data?.ratingCounts;
  const courseTitle = feedbacks.length > 0 ? feedbacks[0].courseTitle : "Khóa học";

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className={PAGE_HEADER}>
        <Button variant="ghost" onClick={() => router.push("/tutor/feedback")} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại danh sách
        </Button>
        <h1 className={PAGE_TITLE}>{courseTitle}</h1>
        <p className={PAGE_SUBTITLE}>Xem đánh giá từ học sinh cho khóa học này</p>
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
    </div>
  );
};

export default TutorFeedbackPage;
