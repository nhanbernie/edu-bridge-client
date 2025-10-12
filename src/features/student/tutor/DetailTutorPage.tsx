"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Star, MapPin, Users, Clock, Award, Heart, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import TabNavigation from "@/components/common/EBTabNavigation";
import TabContent from "./components/TabContent";
import { useManageCourses } from "@/features/tutor/courses/hooks/useManageCourses";
import { useAvailabilityBlock } from "@/hooks/useAvailabilityBlock";
import { useGetUser } from "@/hooks/useGetUser";

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
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Đang tải thông tin gia sư...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (userError || !userData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">Không thể tải thông tin gia sư</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Thử lại
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* EBHeader Section */}
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 mb-8 shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Left Side - Avatar and Basic Info */}
            <div className="flex items-start space-x-8">
              <div className="relative">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.fullName || "Tutor"}
                    className="w-44 h-44 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-44 h-44 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-primary font-bold text-8xl">
                    {user.fullName?.charAt(0).toUpperCase() || "T"}
                  </div>
                )}
                {user.status === "APPROVED" && (
                  <div className="absolute bottom-2 right-2 w-10 h-10 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 animate-pulse" />
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <h1 className="text-5xl font-bold text-foreground">
                    {user.fullName || "Gia sư"}
                  </h1>
                  {tutor?.verifiedStatus === "VERIFIED" && (
                    <div className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20">
                      Verified
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold text-foreground">
                      {tutor?.averageTutorRating || 0}
                    </span>
                    <span className="text-muted-foreground">
                      ({tutor?.totalFeedbacks || 0} đánh giá)
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{user.location || "Chưa cập nhật"}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{tutor?.totalStudents || 0} học sinh</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{tutor?.yearsOfExperience || 0} năm kinh nghiệm</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="w-4 h-4" />
                    <span>{tutor?.totalCourses || 0} khóa học</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Actions and Price */}
            <div className="flex-1 lg:text-right space-y-4">
              {/* <div className="text-right">
                <div className="text-3xl font-bold text-primary">
                  {tutor?.hourlyRate?.toLocaleString() || "Liên hệ"}
                  {tutor?.currency || ""}
                </div>
                <div className="text-muted-foreground">/ buổi học</div>
              </div> */}

              <div className="flex flex-col sm:flex-row lg:justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={handleFavorite}
                  className={cn(
                    "flex items-center justify-center space-x-2 px-4 py-2 border rounded-lg transition-all duration-200",
                    isFavorited
                      ? "border-red-500 bg-red-50 text-red-600 dark:bg-red-900/20"
                      : "border-border hover:bg-secondary"
                  )}
                >
                  <Heart
                    className={cn(
                      "w-4 h-4",
                      isFavorited ? "text-red-500 fill-red-500" : "text-muted-foreground"
                    )}
                  />
                  <span className="text-sm font-medium">
                    {isFavorited ? "Đã yêu thích" : "Yêu thích"}
                  </span>
                </button>

                {/* <button
                  onClick={handleContact}
                  className="flex items-center justify-center space-x-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium"
                >
                  <MessageCircle className="w-4 h-4" />
                </button> */}
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 mb-8 shadow-xl">
          <h2 className="text-2xl font-bold text-foreground mb-6">Giới thiệu</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Về tôi</h3>
              <p className="text-muted-foreground leading-relaxed">
                {tutor?.bio || "Chưa có thông tin giới thiệu"}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Học vấn</h3>
              <p className="text-muted-foreground">
                {tutor?.educationLevel || "Chưa cập nhật thông tin học vấn"}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Chuyên môn</h3>
              <div className="flex flex-wrap gap-2">
                {tutor?.subjects?.map((subject, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20"
                  >
                    {subject}
                  </span>
                )) || <span className="text-muted-foreground">Chưa cập nhật chuyên môn</span>}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Ngôn ngữ</h3>
              <div className="flex flex-wrap gap-2">
                {tutor?.languages?.map((language, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-secondary text-secondary-foreground text-sm font-medium rounded-full"
                  >
                    {language}
                  </span>
                )) || <span className="text-muted-foreground">Chưa cập nhật ngôn ngữ</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs EBNavigation */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg mb-10">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Tab Content */}
        <div className="rounded-2xl">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default DetailTutorPage;
