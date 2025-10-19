"use client";

import React, { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { buildTutorFeedbackDetailRoute } from "@/common/constants/route.constant";
import { BookOpen, GraduationCap } from "lucide-react";
import { useGetTutorTeachingsQuery } from "@/services/course";
import { useUserId } from "@/hooks/useUserId";
import { EnrolledCourseCard } from "@/features/student/feedback-list/components";
import { MotionContainer, MotionItem } from "@/components/motion";
import { TutorFeedbackListSkeleton } from "./skeleton";

const TutorFeedbackListPage: React.FC = () => {
  const t = useTranslations("tutor.feedback.list");
  const { push } = useLocaleRouter();
  const { userId: tutorId } = useUserId();

  const {
    data: teachingsData,
    isLoading,
    error,
  } = useGetTutorTeachingsQuery({ tutorId: tutorId || "" }, { skip: !tutorId });

  const teachings = useMemo(() => teachingsData?.data || [], [teachingsData?.data]);

  // Separate completed and in-progress courses
  const { completedCourses, inProgressCourses } = useMemo(() => {
    const completed = teachings.filter((e) => e.progressStatus === "Completed");
    const inProgress = teachings.filter((e) => e.progressStatus !== "Completed");
    return { completedCourses: completed, inProgressCourses: inProgress };
  }, [teachings]);

  const handleViewDetails = (courseId: string) => {
    push(buildTutorFeedbackDetailRoute(courseId));
  };

  if (isLoading) {
    return <TutorFeedbackListSkeleton />;
  }

  if (error) {
    return (
      <MotionContainer className="min-h-screen flex items-center justify-center">
        <MotionItem>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">{t("error")}</h2>
            <p className="text-muted-foreground">{t("errorMessage")}</p>
          </div>
        </MotionItem>
      </MotionContainer>
    );
  }

  return (
    <MotionContainer className="min-h-screen space-y-6 lg:space-y-8">
      {/* Header */}
      <MotionItem>
        <div className="mb-6 lg:mb-8">
          <div className="flex items-center gap-3 mb-3 lg:mb-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              {t("title")}
            </h1>
          </div>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
      </MotionItem>

      {/* Stats Cards */}
      <MotionItem>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-card rounded-2xl sm:rounded-3xl shadow-lg border border-border p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-3 bg-primary/10 rounded-lg sm:rounded-xl">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                  {t("stats.totalCourses")}
                </p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
                  {teachings.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl sm:rounded-3xl shadow-lg border border-border p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg sm:rounded-xl">
                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                  {t("stats.inProgress")}
                </p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
                  {inProgressCourses.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl sm:rounded-3xl shadow-lg border border-border p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-3 bg-green-100 dark:bg-green-900/20 rounded-lg sm:rounded-xl">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                  {t("stats.completed")}
                </p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
                  {completedCourses.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </MotionItem>

      {/* Empty State */}
      {teachings.length === 0 ? (
        <MotionItem>
          <div className="bg-card rounded-2xl sm:rounded-3xl shadow-lg border border-border p-8 sm:p-12">
            <div className="text-center">
              <BookOpen className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                {t("empty.title")}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-6">
                {t("empty.description")}
              </p>
            </div>
          </div>
        </MotionItem>
      ) : (
        <>
          {/* In Progress Courses */}
          {inProgressCourses.length > 0 && (
            <MotionItem>
              <div className="mb-6 lg:mb-8">
                <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6">
                  {t("sections.inProgress", { count: inProgressCourses.length })}
                </h2>
                <div className="grid gap-4 sm:gap-6">
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
            </MotionItem>
          )}

          {/* Completed Courses */}
          {completedCourses.length > 0 && (
            <MotionItem>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6">
                  {t("sections.completed", { count: completedCourses.length })}
                </h2>
                <div className="grid gap-4 sm:gap-6">
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
            </MotionItem>
          )}
        </>
      )}
    </MotionContainer>
  );
};

export default TutorFeedbackListPage;
