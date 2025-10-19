"use client";

import React from "react";
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
    return <EBPageLoading message="Đang tải thông tin hồ sơ..." />;
  }

  return (
    <div className={PAGE_CONTAINER}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className={PAGE_HEADER}>
          <h1 className={PAGE_TITLE}>Hồ sơ cá nhân</h1>
          <p className={PAGE_SUBTITLE}>Quản lý thông tin cá nhân và học tập của bạn</p>
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
