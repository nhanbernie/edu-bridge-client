"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Star, MapPin, Users, Clock, Award, Heart, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import TabNavigation from "./components/tab-navigate/TabNavigation";
import TabContent from "./components/tab-navigate/TabContent";
import { Button } from "@/components/ui/button";

interface DetailTutorPageProps {
  tutorId?: string;
}

// Mock tutor data
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

const DetailTutorPage: React.FC<DetailTutorPageProps> = ({ tutorId }) => {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("courses");
  const [isFavorited, setIsFavorited] = useState(false);

  const currentTutorId = tutorId || params?.id;

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const handleContact = () => {
    console.log("Contact tutor:", currentTutorId);
    // Implement contact functionality
  };

  const renderTabContent = () => {
    return <TabContent activeTab={activeTab} />;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-400 rounded-full opacity-20"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-pink-500 rounded-full opacity-30"></div>
          <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-purple-400 rounded-full opacity-25"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="text-white space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
                <span className="text-blue-200">About Us</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                Welcome to the online
                <br />
                <span className="text-yellow-300">Learning Center</span>
              </h1>

              <p className="text-lg text-blue-100 leading-relaxed max-w-lg">
                Meet my startup design agency Shape Rex Currently I am working at CodeNext as
                Product Designer.
              </p>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-yellow-800" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">10+ Years Experience</div>
                    <div className="text-blue-200 text-sm">
                      in this game, Means Product Designing
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-blue-100 leading-relaxed">
                I love to work in User Experience & User interface designing. Because I love to
                solve the design problem and find easy and better solutions to solve it. I always
                try my best to make good user interface with the best user experience. I have been
                working as a UX Designer
              </p>

              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium">
                About More →
              </Button>
            </div>

            {/* Right side - Image */}
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="/api/placeholder/400/500"
                  alt="Online Learning"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                />
              </div>
              {/* Decorative background shape */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-blue-500 rounded-2xl transform rotate-6 scale-105 opacity-20"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl p-8 mb-8 shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Left Side - Avatar and Basic Info */}
            <div className="flex items-start space-x-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-primary font-bold text-3xl">
                  {mockTutor.avatar}
                </div>
                {mockTutor.status === "Online" && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white dark:border-gray-800 animate-pulse" />
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <h1 className="text-3xl font-bold text-foreground">{mockTutor.name}</h1>
                  {mockTutor.verified && (
                    <div className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20">
                      Verified
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold text-foreground">{mockTutor.rating}</span>
                    <span className="text-muted-foreground">
                      ({mockTutor.reviewCount} đánh giá)
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{mockTutor.location}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{mockTutor.studentCount} học sinh</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{mockTutor.experience}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="w-4 h-4" />
                    <span>{mockTutor.courseCount} khóa học</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Actions and Price */}
            <div className="flex-1 lg:text-right space-y-4">
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">
                  {mockTutor.price.toLocaleString()}
                  {mockTutor.currency}
                </div>
                <div className="text-muted-foreground">/ buổi học</div>
              </div>

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

                <button
                  onClick={handleContact}
                  className="flex items-center justify-center space-x-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Liên hệ ngay</span>
                </button>
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
              <p className="text-muted-foreground leading-relaxed">{mockTutor.bio}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Học vấn</h3>
              <p className="text-muted-foreground">{mockTutor.education}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Chuyên môn</h3>
              <div className="flex flex-wrap gap-2">
                {mockTutor.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/20"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Thành tích nổi bật</h3>
              <ul className="space-y-2">
                {mockTutor.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-center space-x-2 text-muted-foreground">
                    <Award className="w-4 h-4 text-primary" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 pt-6">
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
          <div className="p-8">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default DetailTutorPage;
