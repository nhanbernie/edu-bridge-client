"use client";

import React, { useState } from "react";
import {
  EmptyState,
  ActionItem,
  EBConfirmDialog,
  EBTutorCourseCard,
  CourseData,
} from "@/components/common";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2, Loader2, RefreshCw } from "lucide-react";
import { useManageCourses } from "./hooks/useManageCourses";
import { useTutorId } from "@/hooks/useTutorId";

const ManageCoursesPage: React.FC = () => {
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
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang xác thực thông tin...</p>
        </div>
      </div>
    );
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
      {/* EBHeader */}
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
      <EBConfirmDialog
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
