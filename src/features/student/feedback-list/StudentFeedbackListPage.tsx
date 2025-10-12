"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, GraduationCap } from "lucide-react";
import { useGetStudentEnrollmentsQuery } from "@/services/course";
import { useUserId } from "@/hooks/useUserId";
import { EnrolledCourseCard } from "./components";
import EBLoadingSpinner from "@/components/common/EBLoadingSpinner";

const StudentFeedbackListPage: React.FC = () => {
  const router = useRouter();
  const { userId: studentId } = useUserId();

  const {
    data: enrollmentsData,
    isLoading,
    error,
  } = useGetStudentEnrollmentsQuery({ studentId: studentId || "" }, { skip: !studentId });

  const enrollments = enrollmentsData?.data || [];

  // Separate completed and in-progress courses
  const { completedCourses, inProgressCourses } = useMemo(() => {
    const completed = enrollments.filter((e) => e.progressStatus === "Completed");
    const inProgress = enrollments.filter((e) => e.progressStatus !== "Completed");
    return { completedCourses: completed, inProgressCourses: inProgress };
  }, [enrollments]);

  const handleViewDetails = (courseId: string) => {
    // Navigate to feedback page for the course
    router.push(`/student/feedback/${courseId}`);
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Khóa học đã tham gia
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Xem lại các khóa học bạn đã đăng ký và theo dõi tiến độ học tập
          </p>
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
                  {enrollments.length}
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Đang học</p>
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
        {enrollments.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-12">
            <div className="text-center">
              <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Chưa có khóa học nào
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Bạn chưa tham gia khóa học nào. Hãy tìm gia sư phù hợp và bắt đầu học ngay!
              </p>
              <button
                onClick={() => router.push("/student")}
                className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-colors"
              >
                Tìm gia sư
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* In Progress Courses */}
            {inProgressCourses.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Đang học ({inProgressCourses.length})
                </h2>
                <div className="grid gap-6">
                  {inProgressCourses.map((enrollment, index) => (
                    <EnrolledCourseCard
                      key={enrollment.courseId}
                      enrollment={enrollment}
                      index={index}
                      onViewDetails={handleViewDetails}
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

export default StudentFeedbackListPage;
