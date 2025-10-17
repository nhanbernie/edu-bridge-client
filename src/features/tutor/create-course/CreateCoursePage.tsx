"use client";

import React from "react";
import { ArrowLeft, BookOpen } from "lucide-react";
import { EBFormProvider } from "@/components/form";
import { CourseForm, type CourseFormData } from "@/components/form/course";
import courseValidatorSchema from "@/lib/validator/courseValidator";
import { useCreateCourse } from "./hooks/useCreateCourse";
import { useSubjects } from "@/hooks/useSubjects";
import { MotionContainer, MotionItem } from "@/components/motion";

const CreateCoursePage: React.FC = () => {
  const { tutorId, isLoading, tutorLoading, handleCreateCourse, handleCancel } = useCreateCourse();

  const { options: subjectOptions, isLoading: isSubjectsLoading } = useSubjects(tutorId);

  const defaultValues: Partial<CourseFormData> = {};

  const handleSubmit = async (data: CourseFormData) => {
    await handleCreateCourse(data);
  };

  const handleBack = () => {
    handleCancel();
  };

  return (
    <MotionContainer className="min-h-screen">
      {/* Header */}
      <MotionItem>
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h1 className="text-4xl font-bold text-foreground">Tạo khóa học mới</h1>
          </div>
          <p className="text-lg text-muted-foreground mb-6">
            Khóa học được xuất bản, chi tiết có thể thay đổi sau
          </p>
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Quay lại
          </button>
        </div>
      </MotionItem>

      {/* Form Content */}
      <MotionItem>
        <div className="bg-card rounded-3xl shadow-lg border border-border p-8">
          <EBFormProvider
            validationSchema={courseValidatorSchema.createCourseSchema}
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            formType="createCourseSchema"
          >
            <CourseForm
              subjectOptions={subjectOptions}
              isSubjectsLoading={isSubjectsLoading}
              tutorLoading={tutorLoading}
              isLoading={isLoading}
              submitButtonText="Tạo khóa học"
              showPreview={true}
            />
          </EBFormProvider>
        </div>
      </MotionItem>
    </MotionContainer>
  );
};

export default CreateCoursePage;
