"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { MotionContainer, MotionItem } from "@/components/motion";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import TutorCard from "./components/TutorCard";
import AdvancedFilter from "./components/AdvancedFilter";
import type { TutorCardData, TutorSearchRequest, TutorSearchDto } from "@/services/tutor/type";
import { EBCharityCounter } from "@/components/common";
import { TutorCardSkeleton } from "@/components/common/skeletons";
import { PAGE_HEADER, PAGE_TITLE, PAGE_SUBTITLE } from "@/common/constants/className.constant";
import { useTranslations } from "next-intl";
import { useLazyFilterTutorsQuery, useLazySearchTutorsQuery } from "@/services/tutor";
import { toggleFavoriteTutor } from "@/redux/slices/tutor.slice";
import { useAppDispatch } from "@/redux/hooks";
import { useDebounce } from "@/hooks";

const transformTutorData = (dto: TutorSearchDto): TutorCardData => ({
  id: dto.tutorId,
  name: dto.fullName || "Unknown Tutor",
  avatar: dto.avatarUrl || dto.avatar || dto.fullName?.charAt(0).toUpperCase() || "T",
  rating: dto.averageTutorRating || 0,
  reviewCount: dto.totalFeedbacks || 0,
  location: dto.location || "Chưa cập nhật",
  subjects: dto.subjects || [],
  experience: `${dto.yearsOfExperience || 0} năm kinh nghiệm`,
  yearsOfExperience: dto.yearsOfExperience || 0,
  studentCount: dto.totalStudents || 0,
  courseCount: dto.totalCourses || 0,
  price: dto.hourlyRate || 0,
  currency: dto.currency || "VND",
  status: dto.status || "Offline",
  verified: dto.verifiedStatus === "VERIFIED",
  avatarUrl: dto.avatarUrl,
  totalStudents: dto.totalStudents,
  totalCourses: dto.totalCourses,
  totalFeedbacks: dto.totalFeedbacks,
  bio: dto.bio,
  languages: dto.languages,
  educationLevel: dto.educationLevel,
  email: dto.email,
  phone: dto.phone,
});

const StudentHomePage = () => {
  const { push } = useLocaleRouter();
  const dispatch = useAppDispatch();
  const t = useTranslations("student.home");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<TutorSearchRequest>({});
  const [allTutors, setAllTutors] = useState<TutorCardData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const [triggerFilter, { isLoading: isLoadingFilter }] = useLazyFilterTutorsQuery();
  const [triggerSearch, { isLoading: isLoadingSearch }] = useLazySearchTutorsQuery();

  const isLoadingMore = isSearchMode ? isLoadingSearch : isLoadingFilter;

  const loadInitialTutors = useCallback(async () => {
    try {
      const result = await triggerFilter({
        PageNumber: 1,
        PageSize: 6,
        ...advancedFilters,
      }).unwrap();

      if (result.success && result.data) {
        const tutors = result.data.map(transformTutorData);
        setAllTutors(tutors);
        setCurrentPage(1);
        setHasMore(tutors.length >= 6);
        setIsSearchMode(false);
      }
    } catch (err) {
      console.error("Error loading tutors:", err);
    }
  }, [triggerFilter, advancedFilters]);

  useEffect(() => {
    loadInitialTutors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedSearchQuery.trim()) {
        setIsSearchMode(false);
        loadInitialTutors();
        return;
      }

      setIsSearchMode(true);
      setCurrentPage(1);
      setAllTutors([]);
      setHasMore(true);

      try {
        const result = await triggerSearch({
          SearchTerm: debouncedSearchQuery,
          PageNumber: 1,
          PageSize: 6,
        }).unwrap();

        if (result.success && result.data) {
          const tutors = result.data.map(transformTutorData);
          setAllTutors(tutors);
          setHasMore(tutors.length >= 6);
        }
      } catch (err) {
        console.error("Error searching tutors:", err);
      }
    };

    performSearch();
  }, [debouncedSearchQuery, triggerSearch, loadInitialTutors]);

  const loadMoreTutors = useCallback(async () => {
    if (!hasMore || isLoadingMore || isLoadingRef.current) return;

    isLoadingRef.current = true;
    const nextPage = currentPage + 1;

    try {
      let result;

      if (isSearchMode && debouncedSearchQuery.trim()) {
        result = await triggerSearch({
          SearchTerm: debouncedSearchQuery,
          PageNumber: nextPage,
          PageSize: 6,
        }).unwrap();
      } else {
        result = await triggerFilter({
          PageNumber: nextPage,
          PageSize: 6,
          ...advancedFilters,
        }).unwrap();
      }

      if (result.success && result.data) {
        const newTutors = result.data.map(transformTutorData);
        setAllTutors((prev) => [...prev, ...newTutors]);
        setCurrentPage(nextPage);
        setHasMore(newTutors.length >= 6);
      }
    } catch (err) {
      console.error("Error loading more tutors:", err);
    } finally {
      isLoadingRef.current = false;
    }
  }, [
    currentPage,
    hasMore,
    isLoadingMore,
    advancedFilters,
    isSearchMode,
    debouncedSearchQuery,
    triggerSearch,
    triggerFilter,
  ]);

  const filterOptions = [
    { label: t("filter.options.all"), value: "all" },
    { label: t("filter.options.rating_desc"), value: "rating_desc" },
    { label: t("filter.options.price_asc"), value: "price_asc" },
    { label: t("filter.options.price_desc"), value: "price_desc" },
    { label: t("filter.options.experience_desc"), value: "experience_desc" },
    { label: t("filter.options.online"), value: "online" },
  ];

  const handleViewDetails = (tutorId: string) => {
    push(`/student/tutor/${tutorId}`);
  };

  const handleContact = (tutorId: string) => {};

  const handleFavorite = (tutorId: string) => {
    dispatch(toggleFavoriteTutor(tutorId));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreTutors();
        }
      },
      { threshold: 0.5, rootMargin: "100px" }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget && hasMore) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadMoreTutors, hasMore]);

  const filteredTutors: TutorCardData[] = allTutors
    .filter((tutor: TutorCardData) => {
      if (selectedFilter === "online") {
        return tutor.status === "Online";
      }
      return true;
    })
    .sort((a: TutorCardData, b: TutorCardData) => {
      switch (selectedFilter) {
        case "rating_desc":
          return b.rating - a.rating;
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "experience_desc":
          const aExp = parseInt(a.experience) || 0;
          const bExp = parseInt(b.experience) || 0;
          return bExp - aExp;
        default:
          return 0;
      }
    });

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleFilterChange = (filterValue: string) => {
    setSelectedFilter(filterValue);
  };

  const handleAdvancedFilterApply = async (filters: TutorSearchRequest) => {
    setAdvancedFilters(filters);
    setCurrentPage(1);
    setAllTutors([]);
    setHasMore(true);
    setIsSearchMode(false);
    setSearchQuery("");

    try {
      const result = await triggerFilter({
        PageNumber: 1,
        PageSize: 6,
        ...filters,
      }).unwrap();

      if (result.success && result.data) {
        const tutors = result.data.map(transformTutorData);
        setAllTutors(tutors);
        setHasMore(tutors.length >= 6);
      }
    } catch (err) {
      console.error("Error applying filters:", err);
    }
  };

  const handleAdvancedFilterOpen = () => {
    setIsAdvancedFilterOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* EBHeader Section */}
        <div className={PAGE_HEADER}>
          <h1 className={`${PAGE_TITLE} text-4xl`}>{t("title")}</h1>
          <p className={`${PAGE_SUBTITLE} text-lg`}>
            {t("subtitle.found", { count: filteredTutors.length })}
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
                placeholder={t("search.placeholder")}
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
                onChange={(e) => handleFilterChange(e.target.value)}
                className="appearance-none bg-card border border-border rounded-lg px-4 py-3 pr-10
                           focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                           transition-all duration-200 cursor-pointer"
              >
                {filterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none" />
            </div>

            {/* Advanced Filter Button */}
            <button
              onClick={handleAdvancedFilterOpen}
              className="flex items-center space-x-2 px-4 py-3 bg-card border border-border
                               rounded-lg hover:bg-secondary transition-colors duration-200"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>{t("filter.button")}</span>
            </button>
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2">
            <div
              className="flex items-center space-x-2 px-3 py-1 bg-primary/10 text-primary
                            rounded-full text-sm border border-primary/20"
            >
              <span>{t("filter.tags.highestRating")}</span>
            </div>
            <div
              className="flex items-center space-x-2 px-3 py-1 bg-primary/10 text-primary
                            rounded-full text-sm border border-primary/20"
            >
              <span>{t("filter.tags.newest")}</span>
            </div>
            <div
              className="flex items-center space-x-2 px-3 py-1 bg-primary/10 text-primary
                            rounded-full text-sm border border-primary/20"
            >
              <span>{t("filter.tags.newest")}</span>
            </div>
          </div>
        </div>

        {/* Tutors Grid */}
        {allTutors.length === 0 && !isLoadingMore ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">{t("empty.title")}</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedFilter("all");
                loadInitialTutors();
              }}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90"
            >
              {t("empty.button")}
            </button>
          </div>
        ) : (
          <>
            <MotionContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredTutors.map((tutor) => (
                <MotionItem key={tutor.id}>
                  <TutorCard
                    tutor={tutor}
                    onViewDetails={handleViewDetails}
                    onContact={handleContact}
                    onFavorite={handleFavorite}
                    isFavorited={false}
                  />
                </MotionItem>
              ))}
            </MotionContainer>

            {hasMore && (
              <div ref={observerTarget} className="min-h-[100px]">
                {isLoadingMore && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <TutorCardSkeleton count={6} />
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Advanced Filter Modal */}
      <AdvancedFilter
        isOpen={isAdvancedFilterOpen}
        onClose={() => setIsAdvancedFilterOpen(false)}
        onApplyFilters={handleAdvancedFilterApply}
        currentFilters={advancedFilters}
      />

      {/* Charity Counter - Fixed bottom right */}
      <EBCharityCounter />
    </div>
  );
};

export default StudentHomePage;
