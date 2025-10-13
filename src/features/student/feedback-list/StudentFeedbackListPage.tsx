"use client";

import React, { useMemo } from "react";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { buildStudentFeedbackDetailRoute, ROUTES } from "@/common/constants/route.constant";
import { BookOpen, GraduationCap } from "lucide-react";
import { useGetStudentEnrollmentsQuery } from "@/services/course";
import { useUserId } from "@/hooks/useUserId";
import { EnrolledCourseCard } from "./components";
import { EnrolledCourseCardSkeleton, EBPageLoading } from "@/components/common/skeletons";
import {
  PAGE_CONTAINER,
  CONTENT_WRAPPER,
  PAGE_HEADER,
  PAGE_TITLE,
  PAGE_SUBTITLE,
} from "@/common/constants/className.constant";
import { useTranslations } from "next-intl";

const StudentFeedbackListPage: React.FC = () => {
  const { push } = useLocaleRouter();
  const t = useTranslations("student.feedback");
  const { userId: studentId } = useUserId();

  const {
    data: enrollmentsData,
    isLoading,
    error,
  } = useGetStudentEnrollmentsQuery({ studentId: studentId || "" }, { skip: !studentId });

  const enrollments = useMemo(() => enrollmentsData?.data || [], [enrollmentsData?.data]);

  // Separate completed and in-progress courses
  const { completedCourses, inProgressCourses } = useMemo(() => {
    const completed = enrollments.filter((e) => e.progressStatus === "Completed");
    const inProgress = enrollments.filter((e) => e.progressStatus !== "Completed");
    return { completedCourses: completed, inProgressCourses: inProgress };
  }, [enrollments]);

  const handleViewDetails = (courseId: string) => {
    // Navigate to feedback page for the course
    push(buildStudentFeedbackDetailRoute(courseId));
  };

  // Show skeleton only on initial load (no data yet)
  if (isLoading && enrollments.length === 0) {
    return (
      <div className={PAGE_CONTAINER}>
        <div className={CONTENT_WRAPPER}>
          <div className={PAGE_HEADER}>
            <h1 className={PAGE_TITLE}>{t("list.title")}</h1>
            <p className={PAGE_SUBTITLE}>{t("list.subtitle")}</p>
          </div>

          <EnrolledCourseCardSkeleton count={4} />
        </div>
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
          <h1 className={PAGE_TITLE}>{t("list.title")}</h1>
          <p className={PAGE_SUBTITLE}>{t("list.subtitle")}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t("list.stats.totalCourses")}
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t("list.stats.completedCourses")}
                </p>
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
                  {t("list.stats.canCreateFeedback")}
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
                {t("list.noCourses")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Bạn chưa tham gia khóa học nào. Hãy tìm gia sư phù hợp và bắt đầu học ngay!
              </p>
              <button
                onClick={() => push(ROUTES.STUDENT)}
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
