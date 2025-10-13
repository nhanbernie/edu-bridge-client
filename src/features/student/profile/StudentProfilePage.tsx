"use client";

import React from "react";
import { useStudentProfile } from "@/hooks/useStudentProfile";
import EBStudentProfileForm from "./components/EBStudentProfileForm";
import { EBPageLoading } from "@/components/common";

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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Hồ sơ cá nhân</h1>
          <p className="mt-2 text-gray-600">Quản lý thông tin cá nhân và học tập của bạn</p>
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
