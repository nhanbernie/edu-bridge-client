"use client";

import * as Yup from "yup";
import EBButton from "@/components/common/EBButton";
import FormProvider from "@/components/form/FormProvider";
import SelectField from "@/components/form/SelectField";
import TextAreaField from "@/components/form/TextAreaField";
import { useStudentOnboarding } from "./hooks/useStudentOnboarding";

interface StudentFormData {
  grade: string;
  learningGoal: string;
}

const StudentOnboardingPage = () => {
  const { submitOnboarding, isLoading } = useStudentOnboarding();

  const handleSubmit = async (data: StudentFormData) => {
    await submitOnboarding(data);
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
  });

  const defaultValues: StudentFormData = {
    grade: "",
    learningGoal: "",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-32">
      <div className="max-w-2xl mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Thiết lập hồ sơ học sinh</h1>
          <p className="text-muted-foreground">Giúp chúng tôi hiểu về mục tiêu học tập của bạn</p>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-lg">
          <FormProvider<StudentFormData>
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            defaultValues={defaultValues}
          >
            <div className="space-y-6">
              <SelectField name="grade" label="Lớp học hiện tại" options={gradeOptions} />

              <TextAreaField
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
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default StudentOnboardingPage;
