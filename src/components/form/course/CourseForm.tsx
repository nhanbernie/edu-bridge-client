"use client";

import React, { useEffect } from "react";
import { useWatch, useFormContext } from "react-hook-form";
import EBTextField from "@/components/form/EBTextField";
import EBTextAreaField from "@/components/form/EBTextAreaField";
import EBMultipleSelect from "@/components/form/EBMultipleSelect";
import EBSwitchField from "@/components/form/EBSwitchField";
import EBButton from "@/components/common/EBButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import CoursePreview from "./CoursePreview";

export interface CourseFormData {
  title: string;
  description: string;
  subjects: string[];
  isPublished: boolean;
  hoursPerSession: string;
  hourlyRate: number;
}

interface CourseFormProps {
  subjectOptions: any[];
  isSubjectsLoading: boolean;
  tutorLoading: boolean;
  isLoading: boolean;
  submitButtonText?: string;
  showPreview?: boolean;
  initialData?: CourseFormData;
}

// Component wrapper để sử dụng useWatch bên trong EBFormProvider
const CourseForm: React.FC<CourseFormProps> = ({
  subjectOptions,
  isSubjectsLoading,
  tutorLoading,
  isLoading,
  submitButtonText = "Tạo khóa học",
  showPreview = true,
  initialData,
}) => {
  const { setValue } = useFormContext<CourseFormData>();
  const watchedValues = useWatch<CourseFormData>();

  // Set initial values when initialData is provided
  useEffect(() => {
    if (initialData) {
      setValue("title", initialData.title);
      setValue("description", initialData.description);
      setValue("subjects", initialData.subjects);
      setValue("isPublished", initialData.isPublished);
      setValue("hoursPerSession", initialData.hoursPerSession);
      setValue("hourlyRate", initialData.hourlyRate);
    }
  }, [initialData, setValue]);

  return (
    <div className={`grid grid-cols-1 ${showPreview ? "lg:grid-cols-2" : ""} gap-8`}>
      {/* Form Section */}
      <Card className="h-fit rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Thông tin khóa học
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Course Title */}
            <EBTextField
              name="title"
              label="Tên khóa học *"
              placeholder="Ví dụ: Toán học cơ bản lớp 10"
            />

            {/* Subjects */}
            <EBMultipleSelect
              name="subjects"
              label="Môn học (có thể chọn nhiều) *"
              options={subjectOptions}
              disabled={isSubjectsLoading || tutorLoading}
            />

            {/* Description */}
            <EBTextAreaField
              name="description"
              label="Mô tả khóa học *"
              placeholder="Mô tả chi tiết về nội dung, phương pháp giảng dạy..."
              rows={4}
            />

            {/* Hours per session */}
            <EBTextField
              name="hoursPerSession"
              label="Thời gian / buổi (giờ) *"
              type="number"
              placeholder="2"
              min="0.5"
              max="8"
              step="0.5"
            />

            {/* Hourly rate */}
            <EBTextField
              name="hourlyRate"
              label="Giá / buổi (VNĐ) *"
              type="number"
              placeholder="100000"
              min="50000"
              max="2000000"
              step="10000"
            />

            {/* Publish Switch */}
            <EBSwitchField
              name="isPublished"
              label="Xuất bản khóa học"
              description="Khóa học được xuất bản, chi tiết có thể thay đổi sau"
            />

            {/* Submit Button */}
            <div className="pt-4">
              <EBButton
                type="submit"
                variant="default"
                size="lg"
                loading={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isLoading ? "Đang xử lý..." : submitButtonText}
              </EBButton>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Section */}
      {showPreview && (
        <div className="lg:sticky lg:top-6">
          <CoursePreview formData={watchedValues as CourseFormData} />
        </div>
      )}
    </div>
  );
};

export default CourseForm;
