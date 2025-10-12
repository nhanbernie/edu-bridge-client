"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, GraduationCap } from "lucide-react";
import { useGetTutorTeachingsQuery } from "@/services/course";
import { useUserId } from "@/hooks/useUserId";
import { EnrolledCourseCard } from "@/features/student/feedback-list/components";
import EBLoadingSpinner from "@/components/common/EBLoadingSpinner";
import {
  PAGE_CONTAINER,
  CONTENT_WRAPPER,
  PAGE_HEADER,
  PAGE_TITLE,
  PAGE_SUBTITLE,
} from "@/common/constants/className.constant";

const TutorFeedbackListPage: React.FC = () => {
  const router = useRouter();
  const { userId: tutorId } = useUserId();

  const {
    data: teachingsData,
    isLoading,
    error,
  } = useGetTutorTeachingsQuery({ tutorId: tutorId || "" }, { skip: !tutorId });

  const teachings = teachingsData?.data || [];

  // Separate completed and in-progress courses
  const { completedCourses, inProgressCourses } = useMemo(() => {
    const completed = teachings.filter((e) => e.progressStatus === "Completed");
    const inProgress = teachings.filter((e) => e.progressStatus !== "Completed");
    return { completedCourses: completed, inProgressCourses: inProgress };
  }, [teachings]);

  const handleViewDetails = (courseId: string) => {
    router.push(`/tutor/feedback/${courseId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <EBLoadingSpinner message="Đang tải khóa học..." size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Có lỗi xảy ra</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Không thể tải danh sách khóa học. Vui lòng thử lại sau.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={PAGE_CONTAINER}>
      <div className={CONTENT_WRAPPER}>
        {/* Header */}
        <div className={PAGE_HEADER}>
          <h1 className={PAGE_TITLE}>Đánh giá khóa học</h1>
          <p className={PAGE_SUBTITLE}>Xem đánh giá từ học sinh cho các khóa học của bạn</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Tổng khóa học
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {teachings.length}
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Đang dạy</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {inProgressCourses.length}
                </p>
              </div>
              <GraduationCap className="h-8 w-8 text-orange-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Đã hoàn thành
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {completedCourses.length}
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Empty State */}
        {teachings.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-12">
            <div className="text-center">
              <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Chưa có khóa học nào
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Bạn chưa có khóa học nào đang được dạy.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* In Progress Courses */}
            {inProgressCourses.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Đang dạy ({inProgressCourses.length})
                </h2>
                <div className="grid gap-6">
                  {inProgressCourses.map((enrollment, index) => (
                    <EnrolledCourseCard
                      key={enrollment.courseId}
                      enrollment={enrollment}
                      index={index}
                      onViewDetails={handleViewDetails}
                      role="tutor"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Completed Courses */}
            {completedCourses.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Đã hoàn thành ({completedCourses.length})
                </h2>
                <div className="grid gap-6">
                  {completedCourses.map((enrollment, index) => (
                    <EnrolledCourseCard
                      key={enrollment.courseId}
                      enrollment={enrollment}
                      index={index}
                      onViewDetails={handleViewDetails}
                      role="tutor"
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TutorFeedbackListPage;
