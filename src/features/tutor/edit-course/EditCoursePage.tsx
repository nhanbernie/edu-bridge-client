"use client";

import { useParams } from "next/navigation";
import { ArrowLeft, BookOpen } from "lucide-react";
import { CourseForm, type CourseFormData, EBFormProvider } from "@/components/form";
import { EBPageLoading } from "@/components/common";
import { useSubjects } from "@/hooks/useSubjects";
import { useEditCourse } from "./hooks/useEditCourse";
import courseValidatorSchema from "@/lib/validator/courseValidator";

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
      <EBPageLoading
        message={tutorLoading ? "Đang xác thực thông tin..." : "Đang tải thông tin khóa học..."}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-6 px-4">
        {/* EBHeader */}
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

        <EBFormProvider
          validationSchema={courseValidatorSchema.createCourseSchema}
          defaultValues={{}}
          onSubmit={handleSubmit}
          formType="createCourseSchema"
          mode="onSubmit"
        >
          <CourseForm
            subjectOptions={subjectOptions}
            isSubjectsLoading={isSubjectsLoading}
            tutorLoading={tutorLoading}
            isLoading={isLoading}
            submitButtonText="Hoàn tất chỉnh sửa"
            showPreview={true}
            initialData={initialData}
          />
        </EBFormProvider>
      </div>
    </div>
  );
};

export default EditCoursePage;
