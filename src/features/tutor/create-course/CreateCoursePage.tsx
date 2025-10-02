"use client";

import React from "react";
import EBFormProvider from "@/components/form/EBFormProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen } from "lucide-react";
import { CourseForm, type CourseFormData } from "@/components/form/course";
import { useSubjects } from "@/hooks/useSubjects";
import courseValidatorSchema from "@/lib/validator/courseValidator";
import { useCreateCourse } from "./hooks/useCreateCourse";

const CreateCoursePage: React.FC = () => {
  const { tutorId, isLoading, tutorLoading, handleCreateCourse, handleCancel } = useCreateCourse();

  const { options: subjectOptions, isLoading: isSubjectsLoading } = useSubjects(tutorId);

  const defaultValues: CourseFormData = {
    title: "",
    subjects: [],
    description: "",
    hoursPerSession: "2",
    hourlyRate: 100000,
    isPublished: false,
  };

  const handleSubmit = async (data: CourseFormData) => {
    await handleCreateCourse(data);
  };

  const handleBack = () => {
    handleCancel();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-6 px-4">
        {/* EBHeader */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-6 w-6 text-emerald-600" />
            <h1 className="text-2xl font-bold text-gray-900">Tạo khóa học mới</h1>
          </div>
          <p className="text-gray-600 mb-4">Khóa học được xuất bản, chi tiết có thể thay đổi sau</p>
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
    </div>
  );
};

export default CreateCoursePage;
