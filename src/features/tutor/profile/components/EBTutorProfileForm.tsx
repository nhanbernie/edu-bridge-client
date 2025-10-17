"use client";

import React, { useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Camera, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import EBFormProvider from "@/components/form/EBFormProvider";
import EBTextField from "@/components/form/EBTextField";
import EBTextAreaField from "@/components/form/EBTextAreaField";
import EBSelectField from "@/components/form/EBSelectField";
import EBMultipleSelect from "@/components/form/EBMultipleSelect";
import EBButton from "@/components/common/EBButton";
import { tutorProfileValidationSchema } from "@/lib/validator/profileValidator";
import {
  EDUCATION_LEVEL_OPTIONS,
  SUBJECT_OPTIONS,
  LANGUAGE_OPTIONS,
} from "@/common/constants/profile.constant";
import type { UserDto } from "@/services/api/type";

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

interface EBTutorProfileFormProps {
  userData: UserDto | undefined;
  isEditing: boolean;
  isSaving: boolean;
  isUploadingAvatar: boolean;
  onSubmit: (data: TutorProfileFormData) => Promise<void>;
  onEdit: () => void;
  onCancel: () => void;
  onAvatarChange: (file: File) => Promise<void>;
}

const EBTutorProfileForm: React.FC<EBTutorProfileFormProps> = ({
  userData,
  isEditing,
  isSaving,
  isUploadingAvatar,
  onSubmit,
  onEdit,
  onCancel,
  onAvatarChange,
}) => {
  const t = useTranslations("tutor.profile.form");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getInitials = (name?: string | null) => {
    if (!name) return t("messages.defaultName").slice(0, 2).toUpperCase();
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getVerificationBadge = () => {
    if (!userData?.tutor?.verifiedStatus) return null;

    let colorClass = "";
    let text = "";
    switch (userData.tutor.verifiedStatus) {
      case "VERIFIED":
        colorClass = "bg-green-100 text-green-800";
        text = t("verification.verified");
        break;
      case "TRUSTED_BEGINNER":
        colorClass = "bg-blue-100 text-blue-800";
        text = t("verification.trustedBeginner");
        break;
      case "PENDING":
        colorClass = "bg-yellow-100 text-yellow-800";
        text = t("verification.pending");
        break;
      default:
        return null;
    }
    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}
      >
        {text}
      </span>
    );
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    await onAvatarChange(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const defaultValues: TutorProfileFormData = {
    fullName: userData?.fullName || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    location: userData?.location || "",
    educationLevel: userData?.tutor?.educationLevel || EDUCATION_LEVEL_OPTIONS[0]?.value || "",
    yearsOfExperience: userData?.tutor?.yearsOfExperience || 0,
    bio: userData?.tutor?.bio || "",
    subjects: userData?.tutor?.subjects || [],
    languages: userData?.tutor?.languages || [],
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
                alt={userData.fullName || "Tutor"}
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center border-4 border-gray-100">
                <span className="text-2xl font-bold text-white">
                  {getInitials(userData?.fullName)}
                </span>
              </div>
            )}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingAvatar}
              className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              title={t("buttons.changeAvatar")}
            >
              <Camera className="w-4 h-4 text-gray-700 hover:cursor-pointer" />
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {userData?.fullName || t("messages.defaultName")}
            </h2>
            <p className="text-gray-600">{userData?.email}</p>
            <div className="mt-2">{getVerificationBadge()}</div>
          </div>
        </div>

        {/* Tutor Stats */}
        <div className="grid grid-cols-3 gap-4 text-center mb-8 pb-8 border-b">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-primary">
              {userData?.tutor?.totalStudents || 0}
            </span>
            <span className="text-sm text-muted-foreground">{t("stats.students")}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-primary">
              {userData?.tutor?.totalCourses || 0}
            </span>
            <span className="text-sm text-muted-foreground">{t("stats.courses")}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-primary">
              {userData?.tutor?.averageTutorRating?.toFixed(1) || "0.0"}
            </span>
            <span className="text-sm text-muted-foreground">{t("stats.rating")}</span>
          </div>
        </div>

        <EBFormProvider
          key={userData?.userId || "default"} // Force re-render when userData changes
          validationSchema={tutorProfileValidationSchema}
          formType="tutorProfileForm"
          defaultValues={defaultValues}
          onSubmit={onSubmit}
        >
          <div className="space-y-6">
            {/* Personal Info */}
            <h4 className="text-lg font-medium text-gray-900">{t("sections.personalInfo")}</h4>
            <EBTextField
              name="fullName"
              label={t("fields.fullName.label")}
              placeholder={t("fields.fullName.placeholder")}
              disabled={!isEditing}
            />
            <div>
              <EBTextField
                name="email"
                label={t("fields.email.label")}
                type="email"
                placeholder={t("fields.email.placeholder")}
                disabled={true}
              />
              <p className="text-xs text-muted-foreground mt-1">{t("fields.email.note")}</p>
            </div>
            <EBTextField
              name="phone"
              label={t("fields.phone.label")}
              placeholder={t("fields.phone.placeholder")}
              disabled={!isEditing}
            />
            <EBTextField
              name="location"
              label={t("fields.location.label")}
              placeholder={t("fields.location.placeholder")}
              disabled={!isEditing}
            />

            {/* Teaching Info */}
            <div className="space-y-6">
              <h4 className="text-lg font-medium text-gray-900 pt-4 border-t">
                {t("sections.teachingInfo")}
              </h4>

              <EBSelectField
                allowCustom
                name="educationLevel"
                label={t("fields.educationLevel.label")}
                options={EDUCATION_LEVEL_OPTIONS}
                disabled={!isEditing}
              />

              <EBTextField
                name="yearsOfExperience"
                label={t("fields.yearsOfExperience.label")}
                type="number"
                placeholder={t("fields.yearsOfExperience.placeholder")}
                min="0"
                max="80"
                step="1"
                disabled={!isEditing}
              />

              <EBTextAreaField
                name="bio"
                label={t("fields.bio.label")}
                placeholder={t("fields.bio.placeholder")}
                rows={4}
                disabled={!isEditing}
              />

              <EBMultipleSelect
                allowCustom
                name="subjects"
                label={t("fields.subjects.label")}
                options={SUBJECT_OPTIONS}
                disabled={!isEditing}
              />

              {/* Existing subjects display - moved below subjects field */}
              {userData?.tutor?.subjects && userData.tutor.subjects.length > 0 && (
                <div className="mt-1">
                  <span className="text-xs text-gray-600">
                    {t("fields.subjects.currentSubjects")}{" "}
                  </span>
                  <span className="text-xs text-gray-800 ">
                    {userData.tutor.subjects.join(", ")}
                  </span>
                </div>
              )}

              <EBMultipleSelect
                allowCustom
                name="languages"
                label={t("fields.languages.label")}
                options={LANGUAGE_OPTIONS}
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
                {t("buttons.edit")}
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
                  {t("buttons.save")}
                </EBButton>
                <EBButton
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={onCancel}
                  disabled={isSaving}
                  className="flex-1"
                >
                  {t("buttons.cancel")}
                </EBButton>
              </div>
            )}
          </div>
        </EBFormProvider>
      </CardContent>
    </Card>
  );
};

export default EBTutorProfileForm;
