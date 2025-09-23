"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useWatch } from "react-hook-form";
import * as Yup from "yup";
import FormProvider from "@/components/form/FormProvider";
import TextField from "@/components/form/TextField";
import TextAreaField from "@/components/form/TextAreaField";
import SelectField from "@/components/form/SelectField";
import EBButton from "@/components/common/EBButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen } from "lucide-react";
import CoursePreview from "./components/CoursePreview";

export interface CourseFormData {
  title: string;
  subject: string;
  description: string;
  duration: number;
  pricePerSession: number;
  isPublished: boolean;
}

const createCourseSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, "Tên khóa học cần ít nhất 5 ký tự")
    .max(100, "Tên khóa học không được vượt quá 100 ký tự")
    .required("Vui lòng nhập tên khóa học"),
  subject: Yup.string().required("Vui lòng chọn môn học"),
  description: Yup.string()
    .min(20, "Mô tả khóa học cần ít nhất 20 ký tự")
    .max(500, "Mô tả không được vượt quá 500 ký tự")
    .required("Vui lòng nhập mô tả khóa học"),
  duration: Yup.number()
    .min(1, "Thời gian/buổi phải ít nhất 1 giờ")
    .max(8, "Thời gian/buổi không được vượt quá 8 giờ")
    .required("Vui lòng nhập thời gian/buổi"),
  pricePerSession: Yup.number()
    .min(50000, "Giá/buổi phải ít nhất 50,000 VNĐ")
    .max(2000000, "Giá/buổi không được vượt quá 2,000,000 VNĐ")
    .required("Vui lòng nhập giá/buổi"),
});

const CreateCoursePage: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CourseFormData | null>(null);

  const defaultValues: CourseFormData = {
    title: "",
    subject: "",
    description: "",
    duration: 2,
    pricePerSession: 100000,
    isPublished: false,
  };

  const subjectOptions = [
    { value: "math", label: "Toán" },
    { value: "physics", label: "Vật lý" },
    { value: "chemistry", label: "Hóa học" },
    { value: "biology", label: "Sinh học" },
    { value: "english", label: "Tiếng Anh" },
    { value: "literature", label: "Ngữ văn" },
    { value: "history", label: "Lịch sử" },
    { value: "geography", label: "Địa lý" },
  ];

  const handleSubmit = async (data: CourseFormData) => {
    setIsLoading(true);

    try {
      // TODO: Call API to create course
      console.log("Creating course:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Navigate back to courses list
      router.push("/tutor/courses");
    } catch (error) {
      console.error("Error creating course:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Component to watch form changes
  const FormWatcher: React.FC = () => {
    const watchedData = useWatch() as CourseFormData;

    React.useEffect(() => {
      if (watchedData) {
        setFormData(watchedData);
      }
    }, [watchedData]);

    return null;
  };

  const handleBack = () => {
    router.push("/tutor/courses");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-6 px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Quay lại
          </button>
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Tạo khóa học mới</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Thông tin khóa học
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FormProvider
                validationSchema={createCourseSchema}
                defaultValues={defaultValues}
                onSubmit={handleSubmit}
              >
                <FormWatcher />
                <div className="space-y-6">
                  {/* Course Title */}
                  <TextField
                    name="title"
                    label="Tên khóa học *"
                    placeholder="Ví dụ: Toán học cơ bản lớp 10"
                  />

                  {/* Subject */}
                  <SelectField name="subject" label="Môn học *" options={subjectOptions} />

                  {/* Description */}
                  <TextAreaField
                    name="description"
                    label="Mô tả khóa học *"
                    placeholder="Mô tả chi tiết về nội dung, phương pháp giảng dạy..."
                    rows={4}
                  />

                  {/* Duration */}
                  <TextField
                    name="duration"
                    label="Thời gian / buổi (giờ) *"
                    type="number"
                    placeholder="2"
                    min="1"
                    max="8"
                    step="0.5"
                  />

                  {/* Price */}
                  <TextField
                    name="pricePerSession"
                    label="Giá / buổi (VNĐ) *"
                    type="number"
                    placeholder="100000"
                    min="50000"
                    max="2000000"
                    step="10000"
                  />

                  {/* Submit Button */}
                  <div className="pt-4">
                    <EBButton
                      type="submit"
                      variant="default"
                      size="lg"
                      loading={isLoading}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {isLoading ? "Đang tạo khóa học..." : "Tạo khóa học"}
                    </EBButton>
                  </div>
                </div>
              </FormProvider>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-6">
            <CoursePreview formData={formData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCoursePage;
