"use client";

import React, { useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import EBFormProvider from "@/components/form/EBFormProvider";
import EBTextField from "@/components/form/EBTextField";
import EBTextAreaField from "@/components/form/EBTextAreaField";
import EBButton from "@/components/common/EBButton";
import { useUserId } from "@/hooks/useUserId";
import { useGetUser } from "@/hooks/useGetUser";
import { studentProfileValidationSchema } from "@/lib/validator/profileValidator";

interface ProfileFormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
}

const StudentProfilePage = () => {
  const { userId } = useUserId();
  const { userData, isLoading } = useGetUser({ userId: userId || "" });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Get initials for avatar placeholder
  const getInitials = (name?: string | null) => {
    if (!name) return "ST";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSubmit = async (data: ProfileFormData) => {
    setIsSaving(true);
    try {
      // TODO: Call update profile API here
      console.log("Profile data to save:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePhoto = () => {
    // TODO: Implement photo upload
    console.log("Change photo clicked");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Đang tải thông tin...</span>
      </div>
    );
  }

  const defaultValues: ProfileFormData = {
    fullName: userData?.fullName || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    location: userData?.location || "",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Hồ sơ cá nhân</h1>
          <p className="text-gray-600 mt-2">Quản lý thông tin cá nhân của bạn</p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-8">
            {/* Avatar Section */}
            <div className="flex items-center gap-6 mb-8 pb-8 border-b">
              <div className="relative">
                {userData?.avatarUrl ? (
                  <img
                    src={userData.avatarUrl}
                    alt={userData.fullName || "Student"}
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center border-4 border-gray-100">
                    <span className="text-2xl font-bold text-white">
                      {getInitials(userData?.fullName)}
                    </span>
                  </div>
                )}
                <button
                  onClick={handleChangePhoto}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200"
                  title="Thay đổi ảnh đại diện"
                >
                  <Camera className="w-4 h-4 text-gray-700" />
                </button>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {userData?.fullName || "Học sinh"}
                </h2>
                <p className="text-gray-600">{userData?.email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                  Học sinh
                </span>
              </div>
            </div>

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
                validationSchema={studentProfileValidationSchema}
                formType="studentProfileForm"
                defaultValues={defaultValues}
                onSubmit={handleSubmit}
              >
                <div className="space-y-6">
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

                  {/* Student specific fields */}
                  {userData?.student && (
                    <>
                      <EBTextField
                        name="grade"
                        label="Lớp học"
                        placeholder="Ví dụ: Lớp 12"
                        disabled={!isEditing}
                        defaultValue={userData.student.grade || ""}
                      />

                      <EBTextAreaField
                        name="learningGoal"
                        label="Mục tiêu học tập"
                        placeholder="Chia sẻ mục tiêu học tập của bạn..."
                        rows={3}
                        disabled={!isEditing}
                        defaultValue={userData.student.learningGoal || ""}
                      />
                    </>
                  )}

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

export default StudentProfilePage;
