"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  EmptyState,
  ActionItem,
  EBConfirmDialog,
  EBTutorCourseCard,
  CourseData,
  EBPageLoading,
} from "@/components/common";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2, Loader2, RefreshCw } from "lucide-react";
import { useManageCourses } from "./hooks/useManageCourses";
import { useTutorId } from "@/hooks/useTutorId";
import { MotionContainer, MotionItem, EBMotionCard } from "@/components/motion";
import { ManageCoursesSkeleton } from "./skeletons";

const ManageCoursesPage: React.FC = () => {
  const t = useTranslations("tutor.courses.manage");
  const { tutorId, isLoading: tutorLoading } = useTutorId();

  // Sử dụng hook để quản lý courses - chỉ call khi có tutorId
  const {
    courses,
    isLoading,
    handleCreateCourse,
    handleEditCourse,
    handleDeleteCourse,
    handleRefresh,
  } = useManageCourses(tutorId || "");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<CourseData | null>(null);

  // Show loading if tutor ID is still loading
  if (tutorLoading || !tutorId) {
    return <ManageCoursesSkeleton />;
  }

  const handleDeleteClick = (course: CourseData) => {
    setCourseToDelete(course);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (courseToDelete) {
      handleDeleteCourse(courseToDelete.id);
    }
    setDeleteDialogOpen(false);
    setCourseToDelete(null);
  };

  const getActionsForCourse = (course: CourseData): ActionItem[] => [
    {
      label: t("actions.edit"),
      icon: Edit,
      onClick: () => handleEditCourse(course.id),
    },
    {
      label: t("actions.delete"),
      icon: Trash2,
      onClick: () => handleDeleteClick(course),
      danger: true,
    },
  ];

  return (
    <>
      <MotionContainer className="min-h-screen">
        {/* Header */}
        <MotionItem>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                {t("title")}
              </h1>
              <p className="mt-2 text-base sm:text-lg text-muted-foreground">{t("subtitle")}</p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              </Button>
              <Button onClick={handleCreateCourse} className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">{t("buttons.create")}</span>
                <span className="sm:hidden">Create</span>
              </Button>
            </div>
          </div>
        </MotionItem>

        {/* Content */}
        <MotionItem>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="p-4 sm:p-6 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl border-l-4 border-muted animate-pulse"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="h-5 sm:h-6 bg-muted rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-muted rounded w-1/2"></div>
                      </div>
                      <div className="w-8 h-8 bg-muted rounded ml-4"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 sm:h-4 bg-muted rounded w-full"></div>
                      <div className="h-3 sm:h-4 bg-muted rounded w-2/3"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 bg-muted rounded"></div>
                        <div className="h-4 bg-muted rounded w-16"></div>
                      </div>
                      <div className="h-4 bg-muted rounded w-12"></div>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-2">
                      <div className="h-8 w-8 bg-muted rounded"></div>
                      <div className="h-8 w-8 bg-muted rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : courses.length === 0 ? (
            <EBMotionCard
              variant="base"
              className="max-w-md mx-auto"
              initial={undefined}
              animate={undefined}
              whileHover={undefined}
              whileTap={undefined}
            >
              <EmptyState
                icon={<PlusCircle className="w-12 h-12" />}
                title={t("empty.title")}
                description={t("empty.description")}
                actionLabel={t("empty.action")}
                onAction={handleCreateCourse}
              />
            </EBMotionCard>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {courses.map((course, index) => (
                <EBTutorCourseCard
                  key={course.id}
                  course={index + 1}
                  mode="tutor"
                  courseData={course}
                  actions={getActionsForCourse(course)}
                />
              ))}
            </div>
          )}
        </MotionItem>
      </MotionContainer>

      {/* Delete Confirmation Dialog */}
      <EBConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title={t("delete.title")}
        description={courseToDelete ? t("delete.description", { title: courseToDelete.title }) : ""}
        confirmLabel={t("delete.confirm")}
        onConfirm={handleDeleteConfirm}
        variant="destructive"
      />
    </>
  );
};

export default ManageCoursesPage;
