"use client";

import React, { useState } from "react";
import { MapPin, BookOpen, Search, GraduationCap } from "lucide-react";
import Image from "next/image";
import EBButton from "@/components/common/EBButton";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { useTranslations } from "next-intl";

const HeroSection = () => {
  const { push } = useLocaleRouter();
  const t = useTranslations("marketing.hero");
  const [searchForm, setSearchForm] = useState({
    subject: "",
    level: "",
    location: "",
    budget: "",
  });

  const handleSearchTutors = () => {
    // Navigate to student page to search tutors
    push("/student");
  };

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
                  {t("title")}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed max-w-lg">{t("subtitle")}</p>
              </div>

              {/* Search Form */}
              <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-emerald-600" />
                      {t("searchForm.subject")}
                    </label>
                    <select
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      value={searchForm.subject}
                      onChange={(e) => setSearchForm({ ...searchForm, subject: e.target.value })}
                    >
                      <option value="">{t("searchForm.subjectPlaceholder")}</option>
                      <option value="math">{t("subjects.math")}</option>
                      <option value="english">{t("subjects.english")}</option>
                      <option value="physics">{t("subjects.physics")}</option>
                      <option value="chemistry">{t("subjects.chemistry")}</option>
                      <option value="biology">{t("subjects.biology")}</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-emerald-600" />
                      {t("searchForm.level")}
                    </label>
                    <select
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      value={searchForm.level}
                      onChange={(e) => setSearchForm({ ...searchForm, level: e.target.value })}
                    >
                      <option value="">{t("searchForm.levelPlaceholder")}</option>
                      <option value="elementary">{t("levels.elementary")}</option>
                      <option value="middle">{t("levels.middle")}</option>
                      <option value="high">{t("levels.high")}</option>
                      <option value="university">{t("levels.university")}</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      {t("searchForm.location")}
                    </label>
                    <select
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      value={searchForm.location}
                      onChange={(e) => setSearchForm({ ...searchForm, location: e.target.value })}
                    >
                      <option value="">{t("searchForm.locationPlaceholder")}</option>
                      <option value="hanoi">{t("locations.hanoi")}</option>
                      <option value="hcm">{t("locations.hcm")}</option>
                      <option value="danang">{t("locations.danang")}</option>
                      <option value="online">{t("locations.online")}</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      {t("searchForm.budget")}
                    </label>
                    <select
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      value={searchForm.budget}
                      onChange={(e) => setSearchForm({ ...searchForm, budget: e.target.value })}
                    >
                      <option value="">{t("searchForm.budgetPlaceholder")}</option>
                      <option value="100-200">{t("budgets.100-200")}</option>
                      <option value="200-500">{t("budgets.200-500")}</option>
                      <option value="500+">{t("budgets.500+")}</option>
                    </select>
                  </div>
                </div>

                <EBButton
                  onClick={handleSearchTutors}
                  size="lg"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  icon={Search}
                  iconPosition="left"
                >
                  {t("searchForm.searchButton")}
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
