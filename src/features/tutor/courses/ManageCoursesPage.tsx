"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import EBTutorCourseCard from "@/components/common/EBTutorCourseCard";
import EmptyState from "@/components/common/EmptyState";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import type { CourseData } from "@/components/common/EBTutorCourseCard";
import type { ActionItem } from "@/components/common/EBActionsMenu";

const ManageCoursesPage: React.FC = () => {
  const router = useRouter();
  const [courses, setCourses] = useState<CourseData[]>([
    {
      id: "course-1",
      title: "Toán học cơ bản lớp 10",
      tutorId: "tutor-1",
      tutorName: "Nguyễn Văn An",
      price: { min: 200000, max: 500000 },
      duration: "2 giờ/buổi",
      students: 25,
      popular: true,
    },
    {
      id: "course-2",
      title: "Vật lý nâng cao lớp 11",
      tutorId: "tutor-1",
      tutorName: "Nguyễn Văn An",
      price: { min: 300000, max: 700000 },
      duration: "1.5 giờ/buổi",
      students: 18,
      popular: false,
    },
    {
      id: "course-3",
      title: "Hóa học lớp 12",
      tutorId: "tutor-1",
      tutorName: "Nguyễn Văn An",
      price: { min: 250000, max: 600000 },
      duration: "2 giờ/buổi",
      students: 32,
      popular: true,
    },
  ]);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<CourseData | null>(null);

  const handleCreateCourse = () => {
    router.push("/tutor/courses/create");
  };

  const handleEditCourse = (courseId: string) => {
    router.push(`/tutor/courses/edit/${courseId}`);
  };

  const handleDeleteClick = (course: CourseData) => {
    setCourseToDelete(course);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (courseToDelete) {
      setCourses((prev) => prev.filter((course) => course.id !== courseToDelete.id));
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
        <Button onClick={handleCreateCourse} className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Tạo khóa học mới
        </Button>
      </div>

      {/* Content */}
      {courses.length === 0 ? (
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
