"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MotionContainer, MotionItem } from "@/components/motion";
import { Search, SlidersHorizontal, ChevronDown, Loader2 } from "lucide-react";
import TutorCard from "./components/TutorCard";
import { useTutorSearch } from "./hooks/useTutorSearch";
import type { TutorCardData } from "@/services/tutor/type";

// Initial search params
const initialSearchParams = {
  PageNumber: 1,
  PageSize: 10,
};

const StudentHomePage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Tất cả");

  // Use tutor search hook
  const {
    tutors,
    totalCount,
    isLoading,
    error,
    searchTutors,
    updateFilters,
    toggleFavorite,
    isTutorFavorited,
  } = useTutorSearch({
    searchParams: initialSearchParams,
    enabled: true,
  });

  // Load initial data
  useEffect(() => {
    searchTutors(initialSearchParams);
  }, [searchTutors]);

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
    toggleFavorite(tutorId);
  };

  // Filter tutors based on search and selected filter
  const filteredTutors: TutorCardData[] = tutors.filter((tutor: TutorCardData) => {
    const matchesSearch =
      tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.subjects.some((subject: string) =>
        subject.toLowerCase().includes(searchQuery.toLowerCase())
      );

    if (selectedFilter === "Online") {
      return matchesSearch && tutor.status === "Online";
    }

    return matchesSearch;
  });

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    // Optionally trigger API search with query
    if (value.trim()) {
      // Could implement server-side search here
      console.log("Search query:", value);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Gia sư phù hợp</h1>
          <p className="text-muted-foreground text-lg">
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Đang tìm kiếm gia sư...
              </span>
            ) : error ? (
              <span className="text-red-500">Có lỗi xảy ra khi tải dữ liệu</span>
            ) : (
              `Tìm thấy ${filteredTutors.length} gia sư phù hợp với yêu cầu của bạn`
            )}
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
                onChange={(e) => handleSearchChange(e.target.value)}
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
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin mr-2" />
            <span>Đang tải danh sách gia sư...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => searchTutors(initialSearchParams)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Thử lại
            </button>
          </div>
        ) : filteredTutors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              Không tìm thấy gia sư phù hợp với tiêu chí tìm kiếm
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedFilter("Tất cả");
                searchTutors(initialSearchParams);
              }}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90"
            >
              Xóa bộ lọc
            </button>
          </div>
        ) : (
          <MotionContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {filteredTutors.map((tutor) => (
              <MotionItem key={tutor.id}>
                <TutorCard
                  tutor={tutor}
                  onViewDetails={handleViewDetails}
                  onContact={handleContact}
                  onFavorite={handleFavorite}
                  isFavorited={isTutorFavorited(tutor.id)}
                />
              </MotionItem>
            ))}
          </MotionContainer>
        )}

        {/* Load More Section */}
        {!isLoading && !error && filteredTutors.length > 0 && (
          <div className="text-center pb-12">
            <button
              onClick={() => {
                // Load more tutors with pagination
                const nextPage = Math.floor(tutors.length / 10) + 1;
                searchTutors({
                  ...initialSearchParams,
                  PageNumber: nextPage,
                  PageSize: 10,
                });
              }}
              disabled={isLoading}
              className="px-8 py-3 bg-card border border-border rounded-lg
                               hover:bg-secondary transition-colors duration-200 font-medium
                               disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang tải...
                </span>
              ) : (
                "Xem thêm gia sư"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentHomePage;
