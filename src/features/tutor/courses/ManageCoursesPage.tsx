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
    return <EBPageLoading message={t("loading.message")} />;
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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground">{t("title")}</h1>
              <p className="mt-2 text-lg text-muted-foreground">{t("subtitle")}</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              </Button>
              <Button onClick={handleCreateCourse} className="flex items-center gap-2">
                <PlusCircle className="h-5 w-5" />
                {t("buttons.create")}
              </Button>
            </div>
          </div>
        </MotionItem>

        {/* Content */}
        <MotionItem>
          {isLoading ? (
            <EBMotionCard
              variant="base"
              className="flex items-center justify-center py-12"
              initial={undefined}
              animate={undefined}
              whileHover={undefined}
              whileTap={undefined}
            >
              <Loader2 className="w-8 h-8 animate-spin mr-2 text-primary" />
              <span className="text-muted-foreground">{t("loading.message")}</span>
            </EBMotionCard>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
