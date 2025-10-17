"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useStudentProfile } from "@/features/student/profile/hook/useStudentProfile";
import EBStudentProfileForm from "./components/EBStudentProfileForm";
import { EBPageLoading } from "@/components/common";
import {
  PAGE_HEADER,
  PAGE_TITLE,
  PAGE_SUBTITLE,
  PAGE_CONTAINER,
} from "@/common/constants/className.constant";

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
    return <EBPageLoading message={t("messages.loading")} />;
  }

  return (
    <div className={PAGE_CONTAINER}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className={PAGE_HEADER}>
          <h1 className={PAGE_TITLE}>{t("title")}</h1>
          <p className={PAGE_SUBTITLE}>{t("subtitle")}</p>
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
