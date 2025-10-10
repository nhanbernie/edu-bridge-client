import React from "react";
import EBFormProvider from "@/components/form/EBFormProvider";
import EBTextField from "@/components/form/EBTextField";
import EBTextAreaField from "@/components/form/EBTextAreaField";
import EBSelectField from "@/components/form/EBSelectField";
import EBButton from "@/components/common/EBButton";
import { TutorFormData } from "../hooks/useTutorOnboarding";
import EBMultipleSelect from "@/components/form/EBMultipleSelect";
import roleSelectValidatorSchema from "@/lib/validator/roleSelectValidator";

interface TutorStep1Props {
  onNext: (data: TutorFormData) => void;
  initialData?: Partial<TutorFormData>;
  isLoading?: boolean;
}

const TutorStep1: React.FC<TutorStep1Props> = ({ onNext, initialData = {}, isLoading = false }) => {
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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Thông tin cơ bản</h2>
        <p className="text-gray-600">Hãy cho chúng tôi biết về trình độ và kinh nghiệm của bạn</p>
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
          <EBTextField
            name="yearsOfExperience"
            label="Số năm kinh nghiệm dạy học"
            type="number"
            placeholder="Nhập số năm kinh nghiệm"
            min="0"
            max="80"
            step="1"
          />
          {/* Location */}
          <EBTextField
            name="location"
            label="Địa điểm"
            placeholder="Ví dụ: Hà Nội, TP. Hồ Chí Minh, Đà Nẵng..."
          />

          {/* Bio */}
          <EBTextAreaField
            name="bio"
            label="Mô tả về bản thân"
            placeholder="Hãy chia sẻ về phong cách dạy học, thành tích và kinh nghiệm của bạn..."
            rows={4}
          />

          {/* Subjects (multiple) */}
          <EBMultipleSelect
            allowCustom
            name="subjects"
            label="Môn học dạy (có thể chọn nhiều)"
            options={[
              { value: "MATH", label: "Toán" },
              { value: "PHYSICS", label: "Vật lý" },
              { value: "CHEMISTRY", label: "Hóa học" },
              { value: "BIOLOGY", label: "Sinh học" },
              { value: "ENGLISH", label: "Tiếng Anh" },
              { value: "LITERATURE", label: "Ngữ văn" },
              { value: "HISTORY", label: "Lịch sử" },
              { value: "GEOGRAPHY", label: "Địa lý" },
              { value: "COMPUTER_SCIENCE", label: "Tin học" },
            ]}
          />
          {/* Languages (multiple) */}
          <EBMultipleSelect
            allowCustom
            name="languages"
            label="Ngôn ngữ (có thể chọn nhiều)"
            options={[
              { value: "VI", label: "Tiếng Việt" },
              { value: "EN", label: "Tiếng Anh" },
              { value: "FR", label: "Tiếng Pháp" },
              { value: "JP", label: "Tiếng Nhật" },
              { value: "KR", label: "Tiếng Hàn" },
              { value: "ZH", label: "Tiếng Trung" },
            ]}
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
      </EBFormProvider>
    </div>
  );
};

export default TutorStep1;
