"use client";

import React from "react";
import { MapPin, BookOpen, Search, GraduationCap, DollarSign } from "lucide-react";
import Image from "next/image";
import EBButton from "@/components/common/EBButton";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { EBSelectField } from "@/components/form/EBSelectField";
import EBFormProvider from "@/components/form/EBFormProvider";
import * as yup from "yup";

const HeroSection = () => {
  const { push } = useLocaleRouter();

  const handleSearchTutors = (data: any) => {
    // Navigate to student page to search tutors
    push("/student");
  };

  // Validation schema for the search form
  const searchSchema = yup.object().shape({
    subject: yup.string().optional(),
    level: yup.string().optional(),
    location: yup.string().optional(),
    budget: yup.string().optional(),
  });

  // Define options for each select field
  const subjectOptions = [
    { value: "math", label: "Toán học" },
    { value: "english", label: "Tiếng Anh" },
    { value: "physics", label: "Vật lý" },
    { value: "chemistry", label: "Hóa học" },
    { value: "biology", label: "Sinh học" },
  ];

  const levelOptions = [
    { value: "elementary", label: "Tiểu học" },
    { value: "middle", label: "THCS" },
    { value: "high", label: "THPT" },
    { value: "university", label: "Đại học" },
  ];

  const locationOptions = [
    { value: "hanoi", label: "Hà Nội" },
    { value: "hcm", label: "TP. HCM" },
    { value: "danang", label: "Đà Nẵng" },
    { value: "online", label: "Trực tuyến" },
  ];

  const budgetOptions = [
    { value: "100-200", label: "< 200k/giờ" },
    { value: "200-500", label: "200k - 500k/giờ" },
    { value: "500+", label: "> 500k/giờ" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/8 to-accent/10 relative overflow-hidden pt-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-secondary/20 to-accent/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Kết Nối Với Gia Sư Chất Lượng Cao
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                  Tìm kiếm và kết nối với hàng nghìn gia sư được xác thực. Nâng cao kiến thức và đạt
                  mục tiêu học tập của bạn.
                </p>
              </div>

              {/* Search Form */}
              <div className="bg-card/80 backdrop-blur-sm rounded-3xl shadow-xl border border-border p-6 space-y-4">
                <EBFormProvider onSubmit={handleSearchTutors} validationSchema={searchSchema}>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-primary" />
                        Môn học
                      </label>
                      <EBSelectField
                        name="subject"
                        options={subjectOptions}
                        placeholder="Chọn môn"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-primary" />
                        Cấp độ
                      </label>
                      <EBSelectField name="level" options={levelOptions} placeholder="Chọn cấp" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        Địa điểm
                      </label>
                      <EBSelectField
                        name="location"
                        options={locationOptions}
                        placeholder="Chọn nơi"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-primary" />
                        Ngân sách
                      </label>
                      <EBSelectField name="budget" options={budgetOptions} placeholder="Chọn mức" />
                    </div>
                  </div>

                  <EBButton
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    icon={Search}
                    iconPosition="left"
                  >
                    Tìm Gia Sư
                  </EBButton>
                </EBFormProvider>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              {/* Background Circle */}
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="w-96 h-96 bg-gradient-to-br from-primary to-secondary rounded-full"></div>
              </div>

              {/* Hero Image */}
              <div className="relative z-10 flex justify-center items-center pt-8">
                <Image
                  src="/images/student.png"
                  alt="Student with luggage"
                  width={320}
                  height={320}
                  className="w-80 h-80 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
