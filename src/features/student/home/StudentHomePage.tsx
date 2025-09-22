"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MotionContainer, MotionItem } from "@/components/motion";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import TutorCard from "./components/TutorCard";

// Mock data for tutors
const mockTutors = [
  {
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
  },
  {
    id: "2",
    name: "Trần Thị Bình",
    avatar: "T",
    rating: 4.8,
    reviewCount: 95,
    location: "TP.HCM",
    subjects: ["Tiếng Anh", "Văn học"],
    experience: "7 năm kinh nghiệm",
    studentCount: 67,
    courseCount: 3,
    price: 180000,
    currency: "đ",
    status: "Offline" as const,
    verified: true,
  },
  {
    id: "3",
    name: "Lê Minh Châu",
    avatar: "L",
    rating: 4.7,
    reviewCount: 78,
    location: "Đà Nẵng",
    subjects: ["Hóa học", "Sinh học"],
    experience: "3 năm kinh nghiệm",
    studentCount: 45,
    courseCount: 4,
    price: 150000,
    currency: "đ",
    status: "Online" as const,
    verified: false,
  },
  {
    id: "4",
    name: "Phạm Quốc Duy",
    avatar: "P",
    rating: 4.9,
    reviewCount: 156,
    location: "Hà Nội",
    subjects: ["Toán học", "Lý thuyết"],
    experience: "8 năm kinh nghiệm",
    studentCount: 112,
    courseCount: 6,
    price: 250000,
    currency: "đ",
    status: "Online" as const,
    verified: true,
  },
  {
    id: "5",
    name: "Hoàng Thị Mai",
    avatar: "H",
    rating: 4.6,
    reviewCount: 89,
    location: "Cần Thơ",
    subjects: ["Tiếng Anh", "IELTS"],
    experience: "4 năm kinh nghiệm",
    studentCount: 56,
    courseCount: 3,
    price: 170000,
    currency: "đ",
    status: "Offline" as const,
    verified: true,
  },
  {
    id: "6",
    name: "Đỗ Văn Thành",
    avatar: "Đ",
    rating: 4.8,
    reviewCount: 134,
    location: "Hải Phòng",
    subjects: ["Vật lý", "Toán học"],
    experience: "6 năm kinh nghiệm",
    studentCount: 78,
    courseCount: 5,
    price: 190000,
    currency: "đ",
    status: "Online" as const,
    verified: true,
  },
];

const StudentHomePage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Tất cả");
  const [favoritedTutors, setFavoritedTutors] = useState<Set<string>>(new Set());

  const filterOptions = [
    "Tất cả",
    "Đánh giá cao nhất",
    "Mới nhất",
    "Giá thấp nhất",
    "Giá cao nhất",
    "Online",
  ];

  const handleViewDetails = (tutorId: string) => {
    router.push(`/student/tutor/${tutorId}`);
  };

  const handleContact = (tutorId: string) => {
    console.log("Contact tutor:", tutorId);
  };

  const handleFavorite = (tutorId: string) => {
    setFavoritedTutors((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(tutorId)) {
        newSet.delete(tutorId);
      } else {
        newSet.add(tutorId);
      }
      return newSet;
    });
  };

  const filteredTutors = mockTutors.filter((tutor) => {
    const matchesSearch =
      tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.subjects.some((subject) => subject.toLowerCase().includes(searchQuery.toLowerCase()));

    if (selectedFilter === "Online") {
      return matchesSearch && tutor.status === "Online";
    }

    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Gia sư phù hợp</h1>
          <p className="text-muted-foreground text-lg">
            Tìm thấy 3 gia sư phù hợp với yêu cầu của bạn
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-8 space-y-4">
          {/* Search and Filter Row */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm gia sư theo tên hoặc môn học..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                           transition-all duration-200"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="appearance-none bg-card border border-border rounded-lg px-4 py-3 pr-10
                           focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                           transition-all duration-200 cursor-pointer"
              >
                {filterOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none" />
            </div>

            {/* Advanced Filter Button */}
            <button
              className="flex items-center space-x-2 px-4 py-3 bg-card border border-border
                               rounded-lg hover:bg-secondary transition-colors duration-200"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Bộ lọc</span>
            </button>
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2">
            <div
              className="flex items-center space-x-2 px-3 py-1 bg-primary/10 text-primary
                            rounded-full text-sm border border-primary/20"
            >
              <span>Đánh giá cao nhất</span>
            </div>
            <div
              className="flex items-center space-x-2 px-3 py-1 bg-primary/10 text-primary
                            rounded-full text-sm border border-primary/20"
            >
              <span>Mới nhất</span>
            </div>
            <div
              className="flex items-center space-x-2 px-3 py-1 bg-primary/10 text-primary
                            rounded-full text-sm border border-primary/20"
            >
              <span>Mới nhất</span>
            </div>
          </div>
        </div>

        {/* Tutors Grid */}
        <MotionContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {filteredTutors.map((tutor) => (
            <MotionItem key={tutor.id}>
              <TutorCard
                tutor={tutor}
                onViewDetails={handleViewDetails}
                onContact={handleContact}
                onFavorite={handleFavorite}
                isFavorited={favoritedTutors.has(tutor.id)}
              />
            </MotionItem>
          ))}
        </MotionContainer>

        {/* Load More Section */}
        <div className="text-center pb-12">
          <button
            className="px-8 py-3 bg-card border border-border rounded-lg
                             hover:bg-secondary transition-colors duration-200 font-medium"
          >
            Xem thêm gia sư
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentHomePage;
