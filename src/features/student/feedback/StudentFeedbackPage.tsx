"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, User, BookOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import RatingSummary from "@/components/common/EBRatingSummary";
import { useCreateFeedback } from "./hooks/useCreateFeedback";
import { useGetStudentHistorySessionsQuery } from "@/services/classSession/classSession.service";
import { useUserId } from "@/hooks/useUserId";
import { useRefetchSessions } from "@/hooks/useRefetchSessions";
import EBLoadingSpinner from "@/components/common/EBLoadingSpinner";
import SessionInfoCard from "@/components/common/EBSessionInfoCard";

interface StudentFeedbackPageProps {
  courseId: string;
}

const StudentFeedbackPage: React.FC<StudentFeedbackPageProps> = ({ courseId }) => {
  const router = useRouter();
  const { userId: studentId } = useUserId();
  const { createFeedback, isLoading } = useCreateFeedback();
  const { refetchAllSessions } = useRefetchSessions();

  const {
    data: historyData,
    isLoading: isLoadingSession,
    refetch: refetchHistory,
  } = useGetStudentHistorySessionsQuery({ studentId: studentId || "" }, { skip: !studentId });

  const currentSession = historyData?.data?.find((session) => session.courseId === courseId);

  // Note: With new API, we don't have feedbacks list in session anymore
  // Always show feedback form for now
  const hasExistingFeedback = false;

  const handleSubmitFeedback = async (
    tutorRating: number,
    courseRating: number,
    comment: string
  ) => {
    if (!currentSession) return;

    const result = await createFeedback({
      courseId: currentSession.courseId,
      tutorRating: tutorRating,
      courseRating: courseRating,
      comment: comment,
    });

    if (result.success) {
      // Refetch all sessions data to update the UI
      await refetchAllSessions();
      router.push("/student/my-schedule");
    }
  };

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
          <Button onClick={() => router.push("/student/my-schedule")}>Quay lại lịch học</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/student/my-schedule")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Quay lại lịch học
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Đánh giá gia sư</h1>
          <p className="text-gray-600 dark:text-gray-400">Chia sẻ trải nghiệm học tập của bạn</p>
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
              totalReviews={0}
            />
          </div>

          {/* Right Column - Feedback Form */}
          <div>
            <RatingSummary type="create" onSubmit={handleSubmitFeedback} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentFeedbackPage;
