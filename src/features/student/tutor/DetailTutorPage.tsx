"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Star, MapPin, Users, Clock, Award, Heart, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { EBPageLoading } from "@/components/common";
import TabNavigation from "@/components/common/EBTabNavigation";
import TabContent from "./components/TabContent";
import { useManageCourses } from "@/features/tutor/courses/hooks/useManageCourses";
import { useAvailabilityBlock } from "@/hooks/useAvailabilityBlock";
import { useGetUser } from "@/hooks/useGetUser";
import { useTranslations } from "next-intl";

interface DetailTutorPageProps {
  tutorId?: string;
}

// Mock tutor data - COMMENTED OUT, using real API data now
/*
const mockTutor = {
  id: "1",
  name: "Nguyễn Văn An",
  avatar: "N",
  rating: 4.9,
  reviewCount: 127,
  location: "Hà Nội",
  subjects: ["Toán học", "Vật lý"],
  experience: "5 năm kinh nghiệm",
  studentCount: 89,
  courseCount: 5,
  price: 200000,
  currency: "đ",
  status: "Online" as const,
  verified: true,
  bio: "Tôi là giáo viên Toán với hơn 5 năm kinh nghiệm giảng dạy. Tôi đã giúp hàng trăm học sinh cải thiện điểm số và đạt được mục tiêu học tập của mình. Phương pháp giảng dạy của tôi tập trung vào việc giải thích khái niệm một cách dễ hiểu và áp dụng vào thực tế.",
  education: "Thạc sĩ Toán học - Đại học Bách Khoa Hà Nội",
  specialties: ["Đại số", "Hình học", "Giải tích", "Xác suất thống kê"],
  achievements: ["Giải nhất Olympic Toán toàn quốc", "Giáo viên xuất sắc 2023"],
};
*/

const DetailTutorPage: React.FC<DetailTutorPageProps> = ({ tutorId }) => {
  const params = useParams();
  const t = useTranslations("student.tutor.detail");
  const [activeTab, setActiveTab] = useState("courses");
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>();

  const currentTutorId = tutorId || (params?.id as string);

  // API hooks
  const {
    userData,
    isLoading: isLoadingUser,
    error: userError,
  } = useGetUser({
    userId: currentTutorId || "",
    enabled: !!currentTutorId,
  });

  const coursesHook = useManageCourses(currentTutorId || "", selectedCourseId);
  const availabilityHook = useAvailabilityBlock({
    tutorId: currentTutorId,
    courseId: selectedCourseId,
  });

  // RTK Query automatically refetches when tutorId or courseId changes
  // No need for manual refetch in useEffect

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const handleContact = () => {
    // Implement contact functionality
  };

  // Loading state
  if (isLoadingUser) {
    return <EBPageLoading message={t("loading")} />;
  }

  // Error state
  if (userError || !userData) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center py-12">
            <p className="text-destructive mb-4">{t("error.message")}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              {t("error.retry")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Extract tutor data from API response
  const tutor = userData.tutor;
  const user = userData;

  const renderTabContent = () => {
    return (
      <TabContent
        activeTab={activeTab}
        tutorId={currentTutorId}
        coursesData={coursesHook}
        availabilityData={availabilityHook}
        selectedCourseId={selectedCourseId}
        onCourseSelect={setSelectedCourseId}
      />
    );
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Header Section */}
        <div className="bg-card border border-border rounded-4xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8">
            {/* Left Side - Avatar and Basic Info */}
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 lg:gap-8 w-full lg:w-auto">
              {/* Avatar */}
              <div className="relative mx-auto sm:mx-0">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.fullName || "Tutor"}
                    className="w-32 h-32 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full object-cover border-4 border-border"
                  />
                ) : (
                  <div className="w-32 h-32 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-primary font-bold text-5xl sm:text-6xl lg:text-8xl border-4 border-border">
                    {user.fullName?.charAt(0).toUpperCase() || "T"}
                  </div>
                )}
                {user.status === "APPROVED" && (
                  <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-emerald-500 rounded-full border-4 border-card animate-pulse" />
                )}
              </div>

              {/* Basic Info */}
              <div className="space-y-2 sm:space-y-3 flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-3">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground">
                    {user.fullName || t("header.tutor")}
                  </h1>
                  {tutor?.verifiedStatus === "VERIFIED" && (
                    <div className="px-2.5 sm:px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-semibold rounded-full border border-emerald-500/20">
                      ✓ Verified
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold text-foreground text-sm sm:text-base">
                      {tutor?.averageTutorRating || 0}
                    </span>
                    <span className="text-muted-foreground text-xs sm:text-sm">
                      ({tutor?.totalFeedbacks || 0} {t("header.reviews")})
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs sm:text-sm">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{user.location || t("header.notUpdated")}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>
                      {tutor?.totalStudents || 0} {t("header.students")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>
                      {tutor?.yearsOfExperience || 0} {t("header.years")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>
                      {tutor?.totalCourses || 0} {t("header.courses")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Actions */}
            <div className="flex-1 lg:text-right w-full lg:w-auto">
              <div className="flex flex-col sm:flex-row lg:justify-end gap-3">
                <button
                  onClick={handleFavorite}
                  className={cn(
                    "flex items-center justify-center gap-2 px-4 py-2.5 border rounded-xl transition-all duration-200 font-medium text-sm",
                    isFavorited
                      ? "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                      : "border-border bg-background hover:bg-muted text-foreground"
                  )}
                >
                  <Heart
                    className={cn(
                      "w-4 h-4",
                      isFavorited ? "text-red-500 fill-red-500" : "text-muted-foreground"
                    )}
                  />
                  <span>{isFavorited ? t("header.favorited") : t("header.favorite")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-card border border-border rounded-4xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 shadow-xl">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">
            {t("about.title")}
          </h2>
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3">
                {t("about.aboutMe")}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {tutor?.bio || t("about.noInfo")}
              </p>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3">
                {t("about.education")}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                {tutor?.educationLevel || t("about.noEducation")}
              </p>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3">
                {t("about.specialties")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {tutor?.subjects?.map((subject, index) => (
                  <span
                    key={index}
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-primary/10 text-primary text-xs sm:text-sm font-medium rounded-lg border border-primary/20"
                  >
                    {subject}
                  </span>
                )) || (
                  <span className="text-sm sm:text-base text-muted-foreground">
                    {t("about.noSpecialties")}
                  </span>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3">
                {t("about.languages")}
              </h3>
              <div className="flex flex-wrap gap-2">
                {tutor?.languages?.map((language, index) => (
                  <span
                    key={index}
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-muted text-foreground text-xs sm:text-sm font-medium rounded-lg border border-border"
                  >
                    {language}
                  </span>
                )) || (
                  <span className="text-sm sm:text-base text-muted-foreground">
                    {t("about.noLanguages")}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-card border border-border rounded-3xl shadow-xl mb-6 sm:mb-8 lg:mb-10 overflow-hidden">
          <TabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabs={[
              { id: "courses", label: t("tabs.courses") },
              { id: "schedule", label: t("tabs.schedule") },
              { id: "reviews", label: t("tabs.reviews") },
              { id: "awards", label: t("tabs.awards") },
            ]}
          />
        </div>

        {/* Tab Content */}
        <div>{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default DetailTutorPage;
