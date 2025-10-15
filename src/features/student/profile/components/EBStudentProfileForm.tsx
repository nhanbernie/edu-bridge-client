"use client";

import React, { useRef } from "react";
import { Camera, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import EBFormProvider from "@/components/form/EBFormProvider";
import EBTextField from "@/components/form/EBTextField";
import EBTextAreaField from "@/components/form/EBTextAreaField";
import EBSelectField from "@/components/form/EBSelectField";
import EBButton from "@/components/common/EBButton";
import { studentProfileValidationSchema } from "@/lib/validator/profileValidator";
import { GRADE_OPTIONS } from "@/common/constants/profile.constant";
import type { UserDto } from "@/services/api/type";

interface StudentProfileFormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  grade: string;
  learningGoal: string;
}

interface EBStudentProfileFormProps {
  userData: UserDto | undefined;
  isEditing: boolean;
  isSaving: boolean;
  isUploadingAvatar: boolean;
  onSubmit: (data: StudentProfileFormData) => Promise<void>;
  onEdit: () => void;
  onCancel: () => void;
  onAvatarChange: (file: File) => Promise<void>;
}

const EBStudentProfileForm: React.FC<EBStudentProfileFormProps> = ({
  userData,
  isEditing,
  isSaving,
  isUploadingAvatar,
  onSubmit,
  onEdit,
  onCancel,
  onAvatarChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getInitials = (name?: string | null) => {
    if (!name) return "HS";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    await onAvatarChange(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const defaultValues: StudentProfileFormData = {
    fullName: userData?.fullName || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    location: userData?.location || "",
    grade: userData?.student?.grade || GRADE_OPTIONS[0]?.value || "",
    learningGoal: userData?.student?.learningGoal || "",
  };

  return (
    <Card className="border-0 shadow-lg h-fit">
      <CardContent className="p-6">
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Avatar Section */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b bg-gray-100 p-5 rounded-4xl">
          <div className="relative">
            {isUploadingAvatar && (
              <div className="absolute inset-0 w-24 h-24 rounded-full bg-black/50 flex items-center justify-center z-10">
                <Loader2 className="w-6 h-6 text-white animate-spin" />
              </div>
            )}
            {userData?.avatarUrl ? (
              <img
                src={userData.avatarUrl}
                alt={userData.fullName || "Student"}
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center border-4 border-gray-100">
                <span className="text-2xl font-bold text-white">
                  {getInitials(userData?.fullName)}
                </span>
              </div>
            )}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingAvatar}
              className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Thay đổi ảnh đại diện"
            >
              <Camera className="w-4 h-4 text-gray-700 hover:cursor-pointer" />
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{userData?.fullName || "Học sinh"}</h2>
            <p className="text-gray-600">{userData?.email}</p>
          </div>
        </div>

        <EBFormProvider
          key={userData?.userId || "default"} // Force re-render when userData changes
          validationSchema={studentProfileValidationSchema}
          formType="studentProfileForm"
          defaultValues={defaultValues}
          onSubmit={onSubmit}
        >
          <div className="space-y-6">
            {/* Personal Info */}
            <h4 className="text-lg font-medium text-gray-900">Thông tin cá nhân</h4>
            <EBTextField
              name="fullName"
              label="Họ và tên"
              placeholder="Nhập họ và tên của bạn"
              disabled={!isEditing}
            />
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
            <EBTextField
              name="phone"
              label="Số điện thoại"
              placeholder="Nhập số điện thoại"
              disabled={!isEditing}
            />
            <EBTextField
              name="location"
              label="Địa điểm"
              placeholder="Ví dụ: Hà Nội, TP. Hồ Chí Minh, Đà Nẵng..."
              disabled={!isEditing}
            />

            {/* Student Info */}
            <div className="space-y-6">
              <h4 className="text-lg font-medium text-gray-900 pt-4 border-t">Thông tin học tập</h4>

              <EBSelectField
                allowCustom
                name="grade"
                label="Lớp học"
                options={GRADE_OPTIONS}
                disabled={!isEditing}
              />

              <EBTextAreaField
                name="learningGoal"
                label="Mục tiêu học tập"
                placeholder="Hãy chia sẻ về mục tiêu học tập và định hướng của bạn..."
                rows={4}
                disabled={!isEditing}
              />
            </div>

            {/* Action Buttons */}
            {!isEditing ? (
              <EBButton
                type="button"
                variant="default"
                size="lg"
                onClick={onEdit}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
              >
                Chỉnh sửa hồ sơ
              </EBButton>
            ) : (
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
                  onClick={onCancel}
                  disabled={isSaving}
                  className="flex-1"
                >
                  Hủy
                </EBButton>
              </div>
            )}
          </div>
        </EBFormProvider>
      </CardContent>
    </Card>
  );
};

export default EBStudentProfileForm;
