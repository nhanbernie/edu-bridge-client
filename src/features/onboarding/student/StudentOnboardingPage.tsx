"use client";

import * as Yup from "yup";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";

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

  const handleSubmit = async (data: StudentFormData) => {
    const result = await submitOnboarding(data);

    if (result.success) {
      // Navigate về HOME, để HomePage tự check và redirect đúng
      // Đã fetch + update localStorage ở hook rồi nên HomePage sẽ redirect ngay
      push(ROUTES.HOME);
    }
  };

  const gradeOptions = [
    { value: "6", label: "Lớp 6" },
    { value: "7", label: "Lớp 7" },
    { value: "8", label: "Lớp 8" },
    { value: "9", label: "Lớp 9" },
    { value: "10", label: "Lớp 10" },
    { value: "11", label: "Lớp 11" },
    { value: "12", label: "Lớp 12" },
  ];

  const validationSchema = Yup.object().shape({
    grade: Yup.string().required("Vui lòng chọn lớp học"),
    learningGoal: Yup.string()
      .min(10, "Mục tiêu học tập phải có ít nhất 10 ký tự")
      .max(300, "Mục tiêu học tập không được quá 300 ký tự")
      .required("Trường này là bắt buộc"),
    location: Yup.string()
      .min(2, "Địa điểm phải có ít nhất 2 ký tự")
      .max(100, "Địa điểm không được quá 100 ký tự")
      .required("Vui lòng nhập địa điểm"),
  });

  const defaultValues: StudentFormData = {
    grade: "",
    learningGoal: "",
    location: "",
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <div className="max-w-2xl mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Thiết lập hồ sơ học sinh</h1>
          <p className="text-muted-foreground">Giúp chúng tôi hiểu về mục tiêu học tập của bạn</p>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-lg">
          <EBFormProvider<StudentFormData>
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            defaultValues={defaultValues}
          >
            <div className="space-y-6">
              <EBSelectField
                name="grade"
                label="Lớp học hiện tại"
                options={gradeOptions}
                allowCustom
              />

              <EBTextField
                name="location"
                label="Địa điểm"
                placeholder="Ví dụ: Hà Nội, TP. Hồ Chí Minh, Đà Nẵng..."
              />

              <EBTextAreaField
                name="learningGoal"
                label="Mục tiêu học tập"
                placeholder="Ví dụ: Cải thiện điểm toán và lý, chuẩn bị thi đại học..."
                rows={4}
              />

              <div className="pt-4">
                <EBButton
                  type="submit"
                  className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? "Đang xử lý..." : "Hoàn thành thiết lập"}
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
