"use client";

import React, { useState } from "react";
import { MapPin, BookOpen, Search, GraduationCap } from "lucide-react";
import Image from "next/image";
import EBButton from "@/components/common/EBButton";

const HeroSection = () => {
  const [searchForm, setSearchForm] = useState({
    subject: "",
    level: "",
    location: "",
    budget: "",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 relative overflow-hidden pt-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-green-400/10 to-emerald-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Enjoy The <span className="text-emerald-600">Trip</span>
                  <br />
                  With <span className="text-emerald-600">Good</span>
                  <br />
                  Moments.
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                  Tìm kiếm giảng viên và gia sư uy tín, chất lượng cao để nâng cao kiến thức và kỹ
                  năng của bạn một cách hiệu quả nhất.
                </p>
              </div>

              {/* Search Form */}
              <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-emerald-600" />
                      Môn học
                    </label>
                    <select
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      value={searchForm.subject}
                      onChange={(e) => setSearchForm({ ...searchForm, subject: e.target.value })}
                    >
                      <option value="">Chọn môn học</option>
                      <option value="math">Toán học</option>
                      <option value="english">Tiếng Anh</option>
                      <option value="physics">Vật lý</option>
                      <option value="chemistry">Hóa học</option>
                      <option value="biology">Sinh học</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-emerald-600" />
                      Cấp độ
                    </label>
                    <select
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      value={searchForm.level}
                      onChange={(e) => setSearchForm({ ...searchForm, level: e.target.value })}
                    >
                      <option value="">Chọn cấp độ</option>
                      <option value="elementary">Tiểu học</option>
                      <option value="middle">THCS</option>
                      <option value="high">THPT</option>
                      <option value="university">Đại học</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      Khu vực
                    </label>
                    <select
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      value={searchForm.location}
                      onChange={(e) => setSearchForm({ ...searchForm, location: e.target.value })}
                    >
                      <option value="">Chọn khu vực</option>
                      <option value="hanoi">Hà Nội</option>
                      <option value="hcm">TP.HCM</option>
                      <option value="danang">Đà Nẵng</option>
                      <option value="online">Online</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Ngân sách</label>
                    <select
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      value={searchForm.budget}
                      onChange={(e) => setSearchForm({ ...searchForm, budget: e.target.value })}
                    >
                      <option value="">Chọn mức giá</option>
                      <option value="100-200">100k - 200k/buổi</option>
                      <option value="200-500">200k - 500k/buổi</option>
                      <option value="500+">Trên 500k/buổi</option>
                    </select>
                  </div>
                </div>

                <EBButton
                  size="lg"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  icon={Search}
                  iconPosition="left"
                >
                  Tìm Gia Sư Ngay
                </EBButton>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              {/* Background Circle */}
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="w-96 h-96 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full"></div>
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
