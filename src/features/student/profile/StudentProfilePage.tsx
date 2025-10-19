"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useStudentProfile } from "@/features/student/profile/hook/useStudentProfile";
import EBStudentProfileForm from "./components/EBStudentProfileForm";
import { StudentProfileSkeleton } from "./skeleton";

const StudentProfilePage: React.FC = () => {
  const t = useTranslations("student.profile");
  const {
    userData,
    isLoading,
    isEditing,
    isSaving,
    isUploadingAvatar,
    handleUpdateProfile,
    handleEdit,
    handleCancel,
    handleAvatarUpload,
  } = useStudentProfile();

  if (isLoading) {
    return <StudentProfileSkeleton />;
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 lg:mb-4">
            {t("title")}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <EBStudentProfileForm
          userData={userData}
          isEditing={isEditing}
          isSaving={isSaving}
          isUploadingAvatar={isUploadingAvatar}
          onSubmit={handleUpdateProfile}
          onEdit={handleEdit}
          onCancel={handleCancel}
          onAvatarChange={handleAvatarUpload}
        />
      </div>
    </div>
  );
};

export default StudentProfilePage;
