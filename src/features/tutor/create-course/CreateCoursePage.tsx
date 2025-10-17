"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { ArrowLeft, BookOpen } from "lucide-react";
import { EBFormProvider } from "@/components/form";
import { CourseForm, type CourseFormData } from "@/components/form/course";
import courseValidatorSchema from "@/lib/validator/courseValidator";
import { useCreateCourse } from "./hooks/useCreateCourse";
import { useSubjects } from "@/hooks/useSubjects";
import { MotionContainer, MotionItem } from "@/components/motion";

const CreateCoursePage: React.FC = () => {
  const t = useTranslations("tutor.courses.create");
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
            <h1 className="text-4xl font-bold text-foreground">{t("title")}</h1>
          </div>
          <p className="text-lg text-muted-foreground mb-6">{t("subtitle")}</p>
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            {t("buttons.back")}
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
              submitButtonText={t("buttons.submit")}
              showPreview={true}
            />
          </EBFormProvider>
        </div>
      </MotionItem>
    </MotionContainer>
  );
};

export default CreateCoursePage;
