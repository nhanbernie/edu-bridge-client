import React from "react";
import { useTranslations } from "next-intl";
import EBFormProvider from "@/components/form/EBFormProvider";
import EBTextField from "@/components/form/EBTextField";
import EBTextAreaField from "@/components/form/EBTextAreaField";
import EBSelectField from "@/components/form/EBSelectField";
import EBButton from "@/components/common/EBButton";
import { TutorFormData } from "../hooks/useTutorOnboarding";
import EBMultipleSelect from "@/components/form/EBMultipleSelect";
import roleSelectValidatorSchema from "@/lib/validator/roleSelectValidator";
import {
  EDUCATION_LEVEL_OPTIONS,
  SUBJECT_OPTIONS,
  LANGUAGE_OPTIONS,
} from "@/common/constants/profile.constant";

interface TutorStep1Props {
  onNext: (data: TutorFormData) => void;
  initialData?: Partial<TutorFormData>;
  isLoading?: boolean;
}

const TutorStep1: React.FC<TutorStep1Props> = ({ onNext, initialData = {}, isLoading = false }) => {
  const t = useTranslations("tutor.onboard.step1");
  const defaultValues: TutorFormData = {
    educationLevel: "",
    yearsOfExperience: undefined,
    bio: "",
    subjects: [],
    languages: [],
    location: "",
    ...initialData,
  } as TutorFormData;

  const handleSubmit = (data: TutorFormData) => {
    onNext(data);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{t("title")}</h2>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      <EBFormProvider
        validationSchema={roleSelectValidatorSchema.tutorStep1Schema}
        formType="tutorStep1Schema"
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
      >
        <div className="space-y-6">
          {/* Education Level */}
          <EBSelectField
            allowCustom
            name="educationLevel"
            label={t("fields.educationLevel.label")}
            options={EDUCATION_LEVEL_OPTIONS}
          />
          {/* Years of Experience */}
          <EBTextField
            name="yearsOfExperience"
            label={t("fields.yearsOfExperience.label")}
            type="number"
            placeholder={t("fields.yearsOfExperience.placeholder")}
            min="0"
            max="80"
            step="1"
          />
          {/* Location */}
          <EBTextField
            name="location"
            label={t("fields.location.label")}
            placeholder={t("fields.location.placeholder")}
          />

          {/* Bio */}
          <EBTextAreaField
            name="bio"
            label={t("fields.bio.label")}
            placeholder={t("fields.bio.placeholder")}
            rows={4}
          />

          {/* Subjects (multiple) */}
          <EBMultipleSelect
            allowCustom
            name="subjects"
            label={t("fields.subjects.label")}
            options={SUBJECT_OPTIONS}
          />
          {/* Languages (multiple) */}
          <EBMultipleSelect
            allowCustom
            name="languages"
            label={t("fields.languages.label")}
            options={LANGUAGE_OPTIONS}
          />
          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <EBButton
              type="submit"
              variant="default"
              size="lg"
              loading={isLoading}
              className="w-full font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {t("buttons.next")}
            </EBButton>
          </div>
        </div>
      </EBFormProvider>
    </div>
  );
};

export default TutorStep1;
