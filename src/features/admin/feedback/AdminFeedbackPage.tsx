"use client";

import React from "react";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { ArrowLeft, BookOpen, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import RatingSummary from "@/components/common/EBRatingSummary";
import { useGetStudentHistorySessionsQuery } from "@/services/classSession/classSession.service";
import { EBPageLoading } from "@/components/common";
import SessionInfoCard from "@/components/common/EBSessionInfoCard";
import { ROUTES } from "@/common/constants/route.constant";

interface AdminFeedbackPageProps {
  courseId: string;
}

const AdminFeedbackPage: React.FC<AdminFeedbackPageProps> = ({ courseId }) => {
  const { push } = useLocaleRouter();

  // Get session data - admin có thể dùng studentId bất kỳ
  const { data: historyData, isLoading: isLoadingSession } = useGetStudentHistorySessionsQuery(
    { studentId: "admin" },
    { skip: false }
  );

  const currentSession = historyData?.data?.find((session) => session.courseId === courseId);

  if (isLoadingSession) {
    return <EBPageLoading message="Đang tải thông tin buổi học..." />;
  }

  if (!currentSession) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy buổi học</h2>
          <p className="text-gray-600 mb-6">Buổi học này không tồn tại hoặc đã bị xóa.</p>
          <Button onClick={() => push(ROUTES.ADMIN)}>Quay lại dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => push(ROUTES.ADMIN)} className="mb-4">
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
          {/* Rating Summary (View Mode) */}
          <div>
            <RatingSummary
              type="view"
              averageRating={currentSession.averageCourseRating}
              totalReviews={0}
            />
          </div>

          {/* Info Message */}
          <div>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-400">
                    Đánh giá trung bình: {currentSession.averageCourseRating || 0}/5
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFeedbackPage;
