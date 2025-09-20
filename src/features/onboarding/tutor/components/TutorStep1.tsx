import React from "react";
import * as Yup from "yup";
import FormProvider from "@/components/form/FormProvider";
import TextField from "@/components/form/TextField";
import TextAreaField from "@/components/form/TextAreaField";
import SelectField from "@/components/form/SelectField";
import EBButton from "@/components/common/EBButton";
import { TutorFormData } from "../hooks/useTutorOnboarding";

interface TutorStep1Props {
  onNext: (data: TutorFormData) => void;
  initialData?: Partial<TutorFormData>;
  isLoading?: boolean;
}

const tutorStep1Schema = Yup.object().shape({
  educationLevel: Yup.string().required("Vui lòng chọn trình độ học vấn"),
  yearsOfExperience: Yup.number()
    .min(0, "Số năm kinh nghiệm không được âm")
    .required("Vui lòng nhập số năm kinh nghiệm"),
  bio: Yup.string()
    .min(50, "Mô tả cần ít nhất 50 ký tự")
    .max(500, "Mô tả không được vượt quá 500 ký tự")
    .required("Vui lòng nhập mô tả về bản thân"),
  subjects: Yup.string().required("Vui lòng nhập môn học dạy"),
  languages: Yup.string().required("Vui lòng nhập ngôn ngữ"),
});

const TutorStep1: React.FC<TutorStep1Props> = ({ onNext, initialData = {}, isLoading = false }) => {
  const defaultValues: TutorFormData = {
    educationLevel: "",
    yearsOfExperience: 0,
    bio: "",
    subjects: "",
    languages: "",
    ...initialData,
  };

  const handleSubmit = (data: TutorFormData) => {
    onNext(data);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Thông tin cơ bản</h2>
        <p className="text-gray-600">Hãy cho chúng tôi biết về trình độ và kinh nghiệm của bạn</p>
      </div>

      <FormProvider
        validationSchema={tutorStep1Schema}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
      >
        <div className="space-y-6">
          {/* Education Level */}
          <SelectField
            name="educationLevel"
            label="Trình độ học vấn"
            options={[
              { value: "HIGH_SCHOOL", label: "Tốt nghiệp THPT" },
              { value: "COLLEGE", label: "Cao đẳng" },
              { value: "BACHELOR", label: "Cử nhân" },
              { value: "MASTER", label: "Thạc sĩ" },
              { value: "DOCTORATE", label: "Tiến sĩ" },
            ]}
          />

          {/* Years of Experience */}
          <TextField
            name="yearsOfExperience"
            label="Số năm kinh nghiệm dạy học"
            type="number"
            placeholder="Nhập số năm kinh nghiệm"
            min="0"
          />

          {/* Bio */}
          <TextAreaField
            name="bio"
            label="Mô tả về bản thân"
            placeholder="Hãy chia sẻ về phong cách dạy học, thành tích và kinh nghiệm của bạn..."
            rows={4}
          />

          {/* Subjects */}
          <TextField
            name="subjects"
            label="Môn học dạy"
            placeholder="Ví dụ: Toán, Lý, Hóa, Tiếng Anh..."
          />

          {/* Languages */}
          <TextField
            name="languages"
            label="Ngôn ngữ"
            placeholder="Ví dụ: Tiếng Việt, Tiếng Anh..."
          />

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <EBButton
              type="submit"
              variant="default"
              size="lg"
              loading={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Tiếp theo
            </EBButton>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default TutorStep1;
