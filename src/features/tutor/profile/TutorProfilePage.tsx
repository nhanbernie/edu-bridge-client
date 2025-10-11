"use client";

import React, { useState, useRef } from "react";
import { Camera, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import EBFormProvider from "@/components/form/EBFormProvider";
import EBTextField from "@/components/form/EBTextField";
import EBTextAreaField from "@/components/form/EBTextAreaField";
import EBSelectField from "@/components/form/EBSelectField";
import EBMultipleSelect from "@/components/form/EBMultipleSelect";
import EBButton from "@/components/common/EBButton";
import { useUserId } from "@/hooks/useUserId";
import { useGetUser } from "@/hooks/useGetUser";
import { useUploadAvatar } from "@/hooks/useUploadAvatar";
import { tutorProfileValidationSchema } from "@/lib/validator/profileValidator";
import {
  EDUCATION_LEVEL_OPTIONS,
  SUBJECT_OPTIONS,
  LANGUAGE_OPTIONS,
} from "@/common/constants/profile.constant";

interface TutorProfileFormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  educationLevel: string;
  yearsOfExperience: number;
  bio: string;
  subjects: string[];
  languages: string[];
}

const TutorProfilePage = () => {
  const { userId } = useUserId();
  const { userData, isLoading, refetch } = useGetUser({ userId: userId || "" });
  const { handleUploadAvatar, isUploading } = useUploadAvatar();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get initials for avatar placeholder
  const getInitials = (name?: string | null) => {
    if (!name) return "TT";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Get verification badge
  const getVerificationBadge = () => {
    if (!userData?.tutor?.verifiedStatus) return null;

    const badges = {
      VERIFIED: { text: "Đã xác minh", color: "bg-emerald-100 text-emerald-700" },
      TRUSTED_BEGINNER: { text: "Người mới đáng tin cậy", color: "bg-blue-100 text-blue-700" },
      PENDING: { text: "Đang chờ xác minh", color: "bg-yellow-100 text-yellow-700" },
    };

    const badge = badges[userData.tutor.verifiedStatus];
    return badge ? (
      <span
        className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${badge.color}`}
      >
        {badge.text}
      </span>
    ) : null;
  };

  const handleSubmit = async (data: TutorProfileFormData) => {
    setIsSaving(true);
    try {
      console.log("Tutor profile data to save:", data);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePhoto = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !userId) return;

    const avatarUrl = await handleUploadAvatar(userId, file);
    if (avatarUrl) {
      // Refetch user data to update avatar
      refetch();
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Đang tải thông tin...</span>
      </div>
    );
  }

  const defaultValues: TutorProfileFormData = {
    fullName: userData?.fullName || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    location: userData?.location || "",
    educationLevel: userData?.tutor?.educationLevel || "",
    yearsOfExperience: userData?.tutor?.yearsOfExperience || 0,
    bio: userData?.tutor?.bio || "",
    subjects: userData?.tutor?.subjects || [],
    languages: userData?.tutor?.languages || [],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Hồ sơ gia sư</h1>
          <p className="text-gray-600 mt-2">Quản lý thông tin cá nhân và hồ sơ gia sư của bạn</p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Avatar Section */}
            <div className="flex items-center gap-6 mb-8 pb-8 border-b">
              <div className="relative">
                {isUploading && (
                  <div className="absolute inset-0 w-24 h-24 rounded-full bg-black/50 flex items-center justify-center z-10">
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  </div>
                )}
                {userData?.avatarUrl ? (
                  <img
                    src={userData.avatarUrl}
                    alt={userData.fullName || "Tutor"}
                    className="w-34 h-34 rounded-full object-cover border-4 border-gray-100"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center border-4 border-gray-100">
                    <span className="text-2xl font-bold text-white">
                      {getInitials(userData?.fullName)}
                    </span>
                  </div>
                )}
                <button
                  onClick={handleChangePhoto}
                  disabled={isUploading}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Thay đổi ảnh đại diện"
                >
                  <Camera className="w-4 h-4 text-gray-700 hover:cursor-pointer" />
                </button>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {userData?.fullName || "Gia sư"}
                </h2>
                <p className="text-gray-600">{userData?.email}</p>
                {getVerificationBadge()}
              </div>
            </div>

            {/* Stats Section - Only for Tutor */}
            {userData?.tutor && (
              <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {userData.tutor.totalStudents || 0}
                  </div>
                  <div className="text-sm text-gray-600">Học sinh</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {userData.tutor.totalCourses || 0}
                  </div>
                  <div className="text-sm text-gray-600">Khóa học</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {userData.tutor.averageTutorRating?.toFixed(1) || "0.0"}
                  </div>
                  <div className="text-sm text-gray-600">Đánh giá</div>
                </div>
              </div>
            )}

            {/* Form Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Thông tin cá nhân</h3>
                {!isEditing && (
                  <EBButton variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    Chỉnh sửa
                  </EBButton>
                )}
              </div>

              <EBFormProvider
                validationSchema={tutorProfileValidationSchema}
                formType="tutorProfileForm"
                defaultValues={defaultValues}
                onSubmit={handleSubmit}
              >
                <div className="space-y-6">
                  {/* Basic Info Section */}
                  <div className="space-y-6">
                    <h4 className="text-lg font-medium text-gray-900 pt-4 border-t">
                      Thông tin cơ bản
                    </h4>

                    {/* Full Name */}
                    <EBTextField
                      name="fullName"
                      label="Họ và tên"
                      placeholder="Nhập họ và tên của bạn"
                      disabled={!isEditing}
                    />

                    {/* Email */}
                    <div>
                      <EBTextField
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="example@email.com"
                        disabled={true}
                      />
                      <p className="text-xs text-muted-foreground mt-1">Email không thể thay đổi</p>
                    </div>

                    {/* Phone */}
                    <EBTextField
                      name="phone"
                      label="Số điện thoại"
                      placeholder="Nhập số điện thoại"
                      disabled={!isEditing}
                    />

                    {/* Location */}
                    <EBTextField
                      name="location"
                      label="Địa điểm"
                      placeholder="Ví dụ: Hà Nội, TP. Hồ Chí Minh, Đà Nẵng..."
                      disabled={!isEditing}
                    />
                  </div>

                  {/* Teaching Info Section */}
                  <div className="space-y-6">
                    <h4 className="text-lg font-medium text-gray-900 pt-4 border-t">
                      Thông tin giảng dạy
                    </h4>

                    {/* Education Level */}
                    <EBSelectField
                      allowCustom
                      name="educationLevel"
                      label="Trình độ học vấn"
                      options={EDUCATION_LEVEL_OPTIONS}
                      disabled={!isEditing}
                    />

                    {/* Years of Experience */}
                    <EBTextField
                      name="yearsOfExperience"
                      label="Số năm kinh nghiệm dạy học"
                      type="number"
                      placeholder="Nhập số năm kinh nghiệm"
                      min="0"
                      max="80"
                      step="1"
                      disabled={!isEditing}
                    />

                    {/* Bio */}
                    <EBTextAreaField
                      name="bio"
                      label="Mô tả về bản thân"
                      placeholder="Hãy chia sẻ về phong cách dạy học, thành tích và kinh nghiệm của bạn..."
                      rows={4}
                      disabled={!isEditing}
                    />

                    {/* Subjects */}
                    <EBMultipleSelect
                      allowCustom
                      name="subjects"
                      label="Môn học dạy (có thể chọn nhiều)"
                      options={SUBJECT_OPTIONS}
                      disabled={!isEditing}
                    />

                    {/* Languages */}
                    <EBMultipleSelect
                      allowCustom
                      name="languages"
                      label="Ngôn ngữ (có thể chọn nhiều)"
                      options={LANGUAGE_OPTIONS}
                      disabled={!isEditing}
                    />
                  </div>

                  {/* Action Buttons */}
                  {isEditing && (
                    <div className="flex gap-3 pt-4">
                      <EBButton
                        type="submit"
                        variant="default"
                        size="lg"
                        loading={isSaving}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                      >
                        Lưu thay đổi
                      </EBButton>
                      <EBButton
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={() => setIsEditing(false)}
                        disabled={isSaving}
                        className="flex-1"
                      >
                        Hủy
                      </EBButton>
                    </div>
                  )}
                </div>
              </EBFormProvider>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TutorProfilePage;
