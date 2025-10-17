"use client";

import React, { useMemo } from "react";
import { useTranslations } from "next-intl";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { buildTutorFeedbackDetailRoute } from "@/common/constants/route.constant";
import { BookOpen, GraduationCap } from "lucide-react";
import { useGetTutorTeachingsQuery } from "@/services/course";
import { useUserId } from "@/hooks/useUserId";
import { EnrolledCourseCard } from "@/features/student/feedback-list/components";
import EBLoadingSpinner from "@/components/common/EBLoadingSpinner";
import { EnrolledCourseCardSkeleton } from "@/components/common/skeletons";
import { MotionContainer, MotionItem } from "@/components/motion";

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
    return (
      <MotionContainer className="min-h-screen space-y-8">
        <MotionItem>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold text-foreground">{t("title")}</h1>
            </div>
            <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
          </div>
        </MotionItem>
        <MotionItem>
          <EnrolledCourseCardSkeleton count={4} />
        </MotionItem>
      </MotionContainer>
    );
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
    <MotionContainer className="min-h-screen space-y-8">
      {/* Header */}
      <MotionItem>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">{t("title")}</h1>
          </div>
          <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
        </div>
      </MotionItem>

      {/* Stats Cards */}
      <MotionItem>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card rounded-3xl shadow-lg border border-border p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-xl">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("stats.totalCourses")}</p>
                <p className="text-2xl font-bold text-foreground">{teachings.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-3xl shadow-lg border border-border p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-xl">
                <GraduationCap className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("stats.inProgress")}</p>
                <p className="text-2xl font-bold text-foreground">{inProgressCourses.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-3xl shadow-lg border border-border p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl">
                <BookOpen className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("stats.completed")}</p>
                <p className="text-2xl font-bold text-foreground">{completedCourses.length}</p>
              </div>
            </div>
          </div>
        </div>
      </MotionItem>

      {/* Empty State */}
      {teachings.length === 0 ? (
        <MotionItem>
          <div className="bg-card rounded-3xl shadow-lg border border-border p-12">
            <div className="text-center">
              <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">{t("empty.title")}</h3>
              <p className="text-muted-foreground mb-6">{t("empty.description")}</p>
            </div>
          </div>
        </MotionItem>
      ) : (
        <>
          {/* In Progress Courses */}
          {inProgressCourses.length > 0 && (
            <MotionItem>
              <div className="mb-8">
                <h2 className="text-xl font-bold text-foreground mb-4">
                  {t("sections.inProgress", { count: inProgressCourses.length })}
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
            </MotionItem>
          )}

          {/* Completed Courses */}
          {completedCourses.length > 0 && (
            <MotionItem>
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">
                  {t("sections.completed", { count: completedCourses.length })}
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
            </MotionItem>
          )}
        </>
      )}
    </MotionContainer>
  );
};

export default TutorFeedbackListPage;
