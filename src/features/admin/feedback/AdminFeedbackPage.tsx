"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, BookOpen, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import RatingSummary from "@/components/common/EBRatingSummary";
import { useGetStudentHistorySessionsQuery } from "@/services/classSession/classSession.service";
import EBLoadingSpinner from "@/components/common/EBLoadingSpinner";
import SessionInfoCard from "@/components/common/EBSessionInfoCard";

interface AdminFeedbackPageProps {
  courseId: string;
}

const AdminFeedbackPage: React.FC<AdminFeedbackPageProps> = ({ courseId }) => {
  const router = useRouter();

  // Get session data - admin có thể dùng studentId bất kỳ
  const { data: historyData, isLoading: isLoadingSession } = useGetStudentHistorySessionsQuery(
    { studentId: "admin" },
    { skip: false }
  );

  const currentSession = historyData?.data?.find((session) => session.courseId === courseId);

  if (isLoadingSession) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <EBLoadingSpinner message="Đang tải thông tin buổi học..." size="lg" />
      </div>
    );
  }

  if (!currentSession) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy buổi học</h2>
          <p className="text-gray-600 mb-6">Buổi học này không tồn tại hoặc đã bị xóa.</p>
          <Button onClick={() => router.push("/admin")}>Quay lại dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => router.push("/admin")} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại dashboard
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Xem đánh giá</h1>
          <p className="text-gray-600 dark:text-gray-400">Quản lý và xem đánh giá của học sinh</p>
        </div>

        {/* Session Info - Secondary Display */}
        <div className="mb-8">
          <SessionInfoCard
            courseTitle={currentSession.courseTitle}
            tutorName={currentSession.tutorName}
            startTime={currentSession.startTime}
            endTime={currentSession.endTime}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Rating Summary (View Mode) */}
          <div>
            <RatingSummary
              type="view"
              averageRating={currentSession.averageCourseRating}
              totalReviews={currentSession.feedbacks?.length || 0}
            />
          </div>

          {/* Right Column - Feedbacks */}
          <div>
            {currentSession.feedbacks && currentSession.feedbacks.length > 0 ? (
              <div className="space-y-4">
                {currentSession.feedbacks.map((feedback) => (
                  <RatingSummary
                    key={feedback.feedbackId}
                    type="view"
                    reviewerName={feedback.studentName}
                    tutorRatingValue={feedback.tutorRating}
                    courseRatingValue={feedback.courseRating}
                    existingComment={feedback.comment}
                    courseTitle={currentSession.courseTitle}
                    createdAt={feedback.createdAt}
                  />
                ))}
              </div>
            ) : (
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <p className="text-gray-500">Chưa có đánh giá nào</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFeedbackPage;
