"use client";

import React, { useRef } from "react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("student.profile.form");
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
                alt={userData.fullName || "Student"}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-background"
              />
            ) : (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center border-4 border-background">
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
          </div>
        </div>

        <EBFormProvider
          key={userData?.userId || "default"} // Force re-render when userData changes
          validationSchema={studentProfileValidationSchema}
          formType="studentProfileForm"
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

            {/* Student Info */}
            <div className="space-y-4 sm:space-y-6">
              <h4 className="text-base sm:text-lg font-medium text-foreground pt-4 border-t border-border">
                {t("sections.learningInfo")}
              </h4>

              <EBSelectField
                allowCustom
                name="grade"
                label={t("fields.grade.label")}
                options={GRADE_OPTIONS}
                disabled={!isEditing}
              />

              <EBTextAreaField
                name="learningGoal"
                label={t("fields.learningGoal.label")}
                placeholder={t("fields.learningGoal.placeholder")}
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
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 sm:py-3"
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
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 sm:py-3"
                >
                  {t("buttons.save")}
                </EBButton>
                <EBButton
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={onCancel}
                  disabled={isSaving}
                  className="flex-1 bg-muted hover:bg-muted/80 text-foreground py-2.5 sm:py-3"
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

export default EBStudentProfileForm;
