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
import { EBButtonAction } from "@/components/motion";
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
        colorClass = "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400";
        text = t("verification.verified");
        break;
      case "TRUSTED_BEGINNER":
        colorClass = "bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400";
        text = t("verification.trustedBeginner");
        break;
      case "PENDING":
        colorClass = "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400";
        text = t("verification.pending");
        break;
      default:
        return null;
    }
    return (
      <span
        className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}
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
    <Card className="border-0 shadow-lg rounded-2xl sm:rounded-3xl h-fit">
      <CardContent className="p-4 sm:p-6">
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Avatar Section */}
        <div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-border bg-muted p-4 sm:p-5 rounded-2xl sm:rounded-3xl">
          <div className="relative">
            {isUploadingAvatar && (
              <div className="absolute inset-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-black/50 flex items-center justify-center z-10">
                <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-spin" />
              </div>
            )}
            {userData?.avatarUrl ? (
              <img
                src={userData.avatarUrl}
                alt={userData.fullName || "Tutor"}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-background"
              />
            ) : (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center border-4 border-background">
                <span className="text-xl sm:text-2xl font-bold text-white">
                  {getInitials(userData?.fullName)}
                </span>
              </div>
            )}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingAvatar}
              className="absolute bottom-0 right-0 w-7 h-7 sm:w-8 sm:h-8 bg-card rounded-full shadow-lg flex items-center justify-center hover:bg-muted transition-colors border border-border disabled:opacity-50 disabled:cursor-not-allowed"
              title={t("buttons.changeAvatar")}
            >
              <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground hover:cursor-pointer" />
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground truncate">
              {userData?.fullName || t("messages.defaultName")}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground truncate">{userData?.email}</p>
            <div className="mt-2">{getVerificationBadge()}</div>
          </div>
        </div>

        {/* Tutor Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-border">
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl font-bold text-primary">
              {userData?.tutor?.totalStudents || 0}
            </span>
            <span className="text-xs sm:text-sm text-muted-foreground">{t("stats.students")}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl font-bold text-primary">
              {userData?.tutor?.totalCourses || 0}
            </span>
            <span className="text-xs sm:text-sm text-muted-foreground">{t("stats.courses")}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl font-bold text-primary">
              {userData?.tutor?.averageTutorRating?.toFixed(1) || "0.0"}
            </span>
            <span className="text-xs sm:text-sm text-muted-foreground">{t("stats.rating")}</span>
          </div>
        </div>

        <EBFormProvider
          key={userData?.userId || "default"} // Force re-render when userData changes
          validationSchema={tutorProfileValidationSchema}
          formType="tutorProfileForm"
          defaultValues={defaultValues}
          onSubmit={onSubmit}
        >
          <div className="space-y-4 sm:space-y-6">
            {/* Personal Info */}
            <h4 className="text-base sm:text-lg font-medium text-foreground">
              {t("sections.personalInfo")}
            </h4>
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
            <div className="space-y-4 sm:space-y-6">
              <h4 className="text-base sm:text-lg font-medium text-foreground pt-4 border-t border-border">
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
                  <span className="text-xs text-muted-foreground">
                    {t("fields.subjects.currentSubjects")}{" "}
                  </span>
                  <span className="text-xs text-foreground">
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
              <EBButtonAction
                type="button"
                onClick={onEdit}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 sm:py-3"
              >
                {t("buttons.edit")}
              </EBButtonAction>
            ) : (
              <div className="flex gap-3 pt-4">
                <EBButtonAction
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 sm:py-3"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t("buttons.saving")}
                    </>
                  ) : (
                    t("buttons.save")
                  )}
                </EBButtonAction>
                <EBButtonAction
                  type="button"
                  onClick={onCancel}
                  disabled={isSaving}
                  className="flex-1 bg-muted hover:bg-muted/80 text-foreground py-2.5 sm:py-3"
                >
                  {t("buttons.cancel")}
                </EBButtonAction>
              </div>
            )}
          </div>
        </EBFormProvider>
      </CardContent>
    </Card>
  );
};

export default EBTutorProfileForm;
