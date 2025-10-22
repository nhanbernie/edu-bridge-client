"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { ArrowLeft, BookOpen } from "lucide-react";
import { CourseForm, type CourseFormData, EBFormProvider } from "@/components/form";
import { EBPageLoading } from "@/components/common";
import { useSubjects } from "@/hooks/useSubjects";
import { useEditCourse } from "./hooks/useEditCourse";
import courseValidatorSchema from "@/lib/validator/courseValidator";
import { EBButtonAction, MotionContainer, MotionItem } from "@/components/motion";

const EditCoursePage: React.FC = () => {
  const t = useTranslations("tutor.courses.edit");
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
    return <EBPageLoading message={tutorLoading ? t("loading.auth") : t("loading.course")} />;
  }

  return (
    <MotionContainer className="min-h-screen">
      {/* Header */}
      <MotionItem>
        <div className="mb-8">
          {/* Return button */}
          <EBButtonAction
            enableIconAnimation={true}
            enableTextAnimation={true}
            onClick={handleBack}
            className="mb-4 text-muted-foreground hover:bg-muted flex items-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            {t("buttons.back")}
          </EBButtonAction>
          <div className="flex items-center gap-2 mb-4">
            <h1 className="text-4xl font-bold text-foreground">{t("title")}</h1>
          </div>
          <p className="text-lg text-muted-foreground mb-6">{t("subtitle")}</p>
        </div>
      </MotionItem>

      {/* Form Content */}
      <MotionItem>
        <div className="bg-card rounded-3xl shadow-lg border border-border p-8">
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
              submitButtonText={t("buttons.submit")}
              showPreview={true}
              initialData={initialData}
            />
          </EBFormProvider>
        </div>
      </MotionItem>
    </MotionContainer>
  );
};

export default EditCoursePage;
