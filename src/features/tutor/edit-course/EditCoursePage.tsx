"use client";

import React from "react";
import { useParams } from "next/navigation";
import FormProvider from "@/components/form/FormProvider";
import { ArrowLeft, BookOpen } from "lucide-react";
import { CourseForm, type CourseFormData } from "@/components/form/course";
import { useSubjects } from "@/hooks/useSubjects";
import courseValidatorSchema from "@/lib/validator/courseValidator";
import { useEditCourse } from "./hooks/useEditCourse";
const EditCoursePage: React.FC = () => {
  const params = useParams();
  const courseId = params.courseId as string;

  const {
    initialData,
    isLoading,
    isLoadingCourse,
    tutorId,
    tutorLoading,
    handleUpdateCourse,
    handleCancel,
  } = useEditCourse(courseId);

  const { options: subjectOptions, isLoading: isSubjectsLoading } = useSubjects(tutorId);

  const handleSubmit = async (data: CourseFormData) => {
    await handleUpdateCourse(data);
  };

  const handleBack = () => {
    handleCancel();
  };

  // Show loading while fetching course data or tutor ID
  if (isLoadingCourse || tutorLoading || !initialData || !tutorId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {tutorLoading ? "Đang xác thực thông tin..." : "Đang tải thông tin khóa học..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-6 px-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-6 w-6 text-emerald-600" />
            <h1 className="text-2xl font-bold text-gray-900">Chỉnh sửa khóa học</h1>
          </div>
          <p className="text-gray-600 mb-4">Cập nhật thông tin khóa học của bạn</p>
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Quay lại
          </button>
        </div>

        <FormProvider
          validationSchema={courseValidatorSchema.createCourseSchema}
          defaultValues={initialData}
          onSubmit={handleSubmit}
          formType="createCourseSchema"
        >
          <CourseForm
            subjectOptions={subjectOptions}
            isSubjectsLoading={isSubjectsLoading}
            tutorLoading={tutorLoading}
            isLoading={isLoading}
            submitButtonText="Hoàn tất chỉnh sửa"
            showPreview={true}
          />
        </FormProvider>
      </div>
    </div>
  );
};

export default EditCoursePage;
