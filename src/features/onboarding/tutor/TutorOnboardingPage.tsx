"use client";

import * as Yup from "yup";
import EBButton from "@/components/common/EBButton";
import FormProvider from "@/components/form/FormProvider";
import SelectField from "@/components/form/SelectField";
import TextAreaField from "@/components/form/TextAreaField";
import TextField from "@/components/form/TextField";
import { useTutorOnboarding } from "./hooks/useTutorOnboarding";

interface TutorFormData {
  educationLevel: string;
  yearsOfExperience: number;
  bio: string;
  subjects: string;
  languages: string;
  hourlyRate: number;
}

const TutorOnboardingPage = () => {
  const { submitOnboarding, isLoading } = useTutorOnboarding();

  const handleSubmit = async (data: TutorFormData) => {
    await submitOnboarding(data);
  };

  const educationOptions = [
    { value: "High School", label: "Tốt nghiệp THPT" },
    { value: "Bachelor", label: "Cử nhân" },
    { value: "Master", label: "Thạc sĩ" },
    { value: "PhD", label: "Tiến sĩ" },
  ];

  const validationSchema = Yup.object().shape({
    educationLevel: Yup.string().required("Vui lòng chọn trình độ học vấn"),
    yearsOfExperience: Yup.number()
      .min(0, "Số năm kinh nghiệm phải lớn hơn 0")
      .max(50, "Số năm kinh nghiệm không thể quá 50")
      .required("Trường này là bắt buộc"),
    bio: Yup.string()
      .min(20, "Giới thiệu bản thân phải có ít nhất 20 ký tự")
      .max(500, "Giới thiệu bản thân không được quá 500 ký tự")
      .required("Trường này là bắt buộc"),
    subjects: Yup.string()
      .min(2, "Vui lòng nhập ít nhất một môn học")
      .required("Trường này là bắt buộc"),
    languages: Yup.string()
      .min(2, "Vui lòng nhập ít nhất một ngôn ngữ")
      .required("Trường này là bắt buộc"),
    hourlyRate: Yup.number()
      .min(50000, "Học phí tối thiểu là 50,000 VNĐ/giờ")
      .max(5000000, "Học phí tối đa là 5,000,000 VNĐ/giờ")
      .required("Trường này là bắt buộc"),
  });
  const defaultValues: TutorFormData = {
    educationLevel: "",
    yearsOfExperience: 0,
    bio: "",
    subjects: "",
    languages: "",
    hourlyRate: 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-32">
      <div className="max-w-2xl mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Thiết lập hồ sơ gia sư</h1>
          <p className="text-muted-foreground">Tạo hồ sơ để học sinh có thể tìm thấy bạn</p>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-lg">
          <FormProvider<TutorFormData>
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            defaultValues={defaultValues}
          >
            <div className="space-y-6">
              <SelectField
                name="educationLevel"
                label="Trình độ học vấn"
                options={educationOptions}
              />

              <TextField
                name="yearsOfExperience"
                label="Số năm kinh nghiệm dạy học"
                type="number"
                placeholder="Ví dụ: 3"
              />

              <TextAreaField
                name="bio"
                label="Giới thiệu bản thân"
                placeholder="Ví dụ: Gia sư toán lý với 3 năm kinh nghiệm dạy học..."
                rows={4}
              />

              <TextField
                name="subjects"
                label="Môn học dạy"
                placeholder="Ví dụ: Toán, Vật lý, Hóa học"
              />

              <TextField
                name="languages"
                label="Ngôn ngữ giảng dạy"
                placeholder="Ví dụ: Tiếng Việt, Tiếng Anh"
              />

              <TextField
                name="hourlyRate"
                label="Học phí (VNĐ/giờ)"
                type="number"
                placeholder="Ví dụ: 200000"
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

export default TutorOnboardingPage;
