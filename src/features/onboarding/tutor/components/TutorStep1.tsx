import React from "react";
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
        <h2 className="text-2xl font-bold text-foreground mb-2">Thông tin cơ bản</h2>
        <p className="text-muted-foreground">
          Hãy cho chúng tôi biết về trình độ và kinh nghiệm của bạn
        </p>
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
            options={EDUCATION_LEVEL_OPTIONS}
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
            options={SUBJECT_OPTIONS}
          />
          {/* Languages (multiple) */}
          <EBMultipleSelect
            allowCustom
            name="languages"
            label="Ngôn ngữ (có thể chọn nhiều)"
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
              Tiếp theo
            </EBButton>
          </div>
        </div>
      </EBFormProvider>
    </div>
  );
};

export default TutorStep1;
