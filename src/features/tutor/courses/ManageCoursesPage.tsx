"use client";

import React, { useState } from "react";
import EBTutorCourseCard from "@/components/common/EBTutorCourseCard";
import EmptyState from "@/components/common/EmptyState";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2, Loader2, RefreshCw } from "lucide-react";
import type { CourseData } from "@/components/common/EBTutorCourseCard";
import type { ActionItem } from "@/components/common/EBActionsMenu";
import { useManageCourses } from "./hooks/useManageCourses";

const ManageCoursesPage: React.FC = () => {
  // For demo purposes, using a hardcoded tutor ID
  // In real app, this would come from auth context or user session
  const tutorId = "dd4eaa0c-5f90-44bb-b501-6da25154f646";

  // Sử dụng hook để quản lý courses
  const {
    courses,
    isLoading,
    handleCreateCourse,
    handleEditCourse,
    handleDeleteCourse,
    handleRefresh,
  } = useManageCourses(tutorId);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<CourseData | null>(null);

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
      label: "Chỉnh sửa",
      icon: Edit,
      onClick: () => handleEditCourse(course.id),
    },
    {
      label: "Xóa khóa học",
      icon: Trash2,
      onClick: () => handleDeleteClick(course),
      danger: true,
    },
  ];

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Quản lý khóa học</h1>
          <p className="text-muted-foreground">Quản lý tất cả khóa học của bạn</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Làm mới
          </Button>
          <Button onClick={handleCreateCourse} className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Tạo khóa học mới
          </Button>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Đang tải khóa học...</span>
        </div>
      ) : courses.length === 0 ? (
        <EmptyState
          title="Chưa có khóa học nào"
          description="Bạn chưa tạo khóa học nào. Hãy tạo khóa học đầu tiên để bắt đầu dạy học."
          actionLabel="Tạo khóa học đầu tiên"
          onAction={handleCreateCourse}
          className="max-w-md mx-auto"
        />
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

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Xác nhận xóa khóa học"
        description={
          courseToDelete
            ? `Bạn có chắc chắn muốn xóa khóa học "${courseToDelete.title}"? Hành động này không thể hoàn tác.`
            : ""
        }
        confirmLabel="Xóa khóa học"
        onConfirm={handleDeleteConfirm}
        variant="destructive"
      />
    </div>
  );
};

export default ManageCoursesPage;
