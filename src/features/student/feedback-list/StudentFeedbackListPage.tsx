"use client";

import React, { useMemo, useRef } from "react";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { buildStudentFeedbackDetailRoute, ROUTES } from "@/common/constants/route.constant";
import { BookOpen, GraduationCap } from "lucide-react";
import { useGetStudentEnrollmentsQuery } from "@/services/course";
import { useUserId } from "@/hooks/useUserId";
import { EnrolledCourseCard } from "./components";
import { EnrolledCourseCardSkeleton } from "@/components/common/skeletons";
import { PAGE_CONTAINER, CONTENT_WRAPPER } from "@/common/constants/className.constant";
import { useTranslations } from "next-intl";
import { EBMotionCard } from "@/components/motion";

const StudentFeedbackListPage: React.FC = () => {
  const { push } = useLocaleRouter();
  const t = useTranslations("student.feedback.list");
  const { userId: studentId } = useUserId();
  const hasLoadedRef = useRef(false);

  const {
    data: enrollmentsData,
    isLoading,
    error,
  } = useGetStudentEnrollmentsQuery({ studentId: studentId || "" }, { skip: !studentId });

  const enrollments = useMemo(() => enrollmentsData?.data || [], [enrollmentsData?.data]);

  // Mark as loaded when we have data
  if (enrollments.length > 0 && !hasLoadedRef.current) {
    hasLoadedRef.current = true;
  }

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

  // Show skeleton only on initial load (no data yet and never loaded before)
  if (isLoading && !hasLoadedRef.current) {
    return (
      <div className={PAGE_CONTAINER}>
        <div className={CONTENT_WRAPPER}>
          <div className="space-y-4 mb-8 animate-pulse">
            <div className="h-8 sm:h-10 bg-muted rounded w-48 sm:w-64"></div>
            <div className="h-5 sm:h-6 bg-muted rounded w-64 sm:w-96"></div>
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl sm:rounded-3xl shadow-lg border border-border p-4 sm:p-6 animate-pulse"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 sm:p-3 bg-muted rounded-lg sm:rounded-xl w-10 h-10 sm:w-12 sm:h-12"></div>
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="h-3 sm:h-4 bg-muted rounded w-20 sm:w-24"></div>
                    <div className="h-6 sm:h-8 bg-muted rounded w-12 sm:w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <EnrolledCourseCardSkeleton count={4} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">{t("error")}</h2>
          <p className="text-sm sm:text-base text-muted-foreground">{t("errorMessage")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={PAGE_CONTAINER}>
      <div className={CONTENT_WRAPPER}>
        {/* Header */}
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">{t("list.title")}</h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
            {t("list.subtitle")}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <EBMotionCard variant="base" className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-3 bg-primary/10 rounded-lg sm:rounded-xl">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                  {t("stats.totalCourses")}
                </p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
                  {enrollments.length}
                </p>
              </div>
            </div>
          </EBMotionCard>

          <EBMotionCard variant="base" className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg sm:rounded-xl">
                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                  {t("stats.completedCourses")}
                </p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
                  {inProgressCourses.length}
                </p>
              </div>
            </div>
          </EBMotionCard>

          <EBMotionCard variant="base" className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-3 bg-green-100 dark:bg-green-900/20 rounded-lg sm:rounded-xl">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                  {t("stats.canCreateFeedback")}
                </p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
                  {completedCourses.length}
                </p>
              </div>
            </div>
          </EBMotionCard>
        </div>

        {/* Empty State */}
        {enrollments.length === 0 ? (
          <EBMotionCard variant="base" className="p-8 sm:p-12">
            <div className="text-center">
              <BookOpen className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                {t("noCourses")}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-6">
                {t("noCoursesDescription")}
              </p>
              <button
                onClick={() => push(ROUTES.STUDENT)}
                className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-colors"
              >
                {t("findTutor")}
              </button>
            </div>
          </EBMotionCard>
        ) : (
          <>
            {/* In Progress Courses */}
            {inProgressCourses.length > 0 && (
              <div className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">
                  {t("sections.inProgress", { count: inProgressCourses.length })}
                </h2>
                <div className="grid gap-4 sm:gap-6">
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
                <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">
                  {t("sections.completed", { count: completedCourses.length })}
                </h2>
                <div className="grid gap-4 sm:gap-6">
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
