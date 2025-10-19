"use client";

import * as Yup from "yup";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { useTranslations } from "next-intl";

import EBButton from "@/components/common/EBButton";
import EBFormProvider from "@/components/form/EBFormProvider";
import EBSelectField from "@/components/form/EBSelectField";
import EBTextAreaField from "@/components/form/EBTextAreaField";
import EBTextField from "@/components/form/EBTextField";
import { useStudentOnboarding } from "./hooks/useStudentOnboarding";
import { ROUTES } from "@/common/constants/route.constant";

interface StudentFormData {
  grade: string;
  learningGoal: string;
  location: string;
}

const StudentOnboardingPage = () => {
  const { push } = useLocaleRouter();
  const { submitOnboarding, isLoading } = useStudentOnboarding();
  const t = useTranslations("student.onboard");

  const handleSubmit = async (data: StudentFormData) => {
    const result = await submitOnboarding(data);

    if (result.success) {
      // Navigate về HOME, để HomePage tự check và redirect đúng
      // Đã fetch + update localStorage ở hook rồi nên HomePage sẽ redirect ngay
      push(ROUTES.HOME);
    }
  };

  const gradeOptions = [
    { value: "6", label: t("gradeOptions.6") },
    { value: "7", label: t("gradeOptions.7") },
    { value: "8", label: t("gradeOptions.8") },
    { value: "9", label: t("gradeOptions.9") },
    { value: "10", label: t("gradeOptions.10") },
    { value: "11", label: t("gradeOptions.11") },
    { value: "12", label: t("gradeOptions.12") },
  ];

  const validationSchema = Yup.object().shape({
    grade: Yup.string().required(t("validation.grade.required")),
    learningGoal: Yup.string()
      .min(10, t("validation.learningGoal.minLength"))
      .max(300, t("validation.learningGoal.maxLength"))
      .required(t("validation.learningGoal.required")),
    location: Yup.string()
      .min(2, t("validation.location.minLength"))
      .max(100, t("validation.location.maxLength"))
      .required(t("validation.location.required")),
  });

  const defaultValues: StudentFormData = {
    grade: "",
    learningGoal: "",
    location: "",
  };

  return (
    <div className="min-h-screen bg-background pt-32">
      <div className="max-w-2xl mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">{t("title")}</h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="bg-card/70 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-border">
          <EBFormProvider<StudentFormData>
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            defaultValues={defaultValues}
          >
            <div className="space-y-6">
              <EBSelectField
                name="grade"
                label={t("form.grade.label")}
                options={gradeOptions}
                allowCustom
              />

              <EBTextField
                name="location"
                label={t("form.location.label")}
                placeholder={t("form.location.placeholder")}
              />

              <EBTextAreaField
                name="learningGoal"
                label={t("form.learningGoal.label")}
                placeholder={t("form.learningGoal.placeholder")}
                rows={4}
              />

              <div className="pt-4">
                <EBButton
                  type="submit"
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? t("form.submit.loading") : t("form.submit.default")}
                </EBButton>
              </div>
            </div>
          </EBFormProvider>
        </div>
      </div>
    </div>
  );
};

export default StudentOnboardingPage;
