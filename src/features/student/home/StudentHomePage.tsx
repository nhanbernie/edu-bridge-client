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
import { ENV } from "@/utils/env";

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

// Constants
const SUBJECT_OPTIONS = [
  "Toán học",
  "Môn nhạc",
  "Tiếng Anh",
  "Vật lý",
  "Hóa học",
  "Sinh học",
  "Văn học",
  "Lịch sử",
  "Địa lý",
  "Tin học",
];

const QUICK_FILTER_SUBJECTS = ["Môn toán", "Môn nhạc", "Tiếng Anh", "Vật lý"];

const PAGE_SIZE = 6;

const StudentHomePage = () => {
  const { push } = useLocaleRouter();
  const dispatch = useAppDispatch();
  const t = useTranslations("student.home");

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<TutorSearchRequest>({});
  const [allTutors, setAllTutors] = useState<TutorCardData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [quickFilters, setQuickFilters] = useState({
    highRating: false,
    subjects: [] as string[],
  });

  // Refs
  const observerTarget = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef(false);

  // Hooks
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [triggerFilter, { isLoading: isLoadingFilter }] = useLazyFilterTutorsQuery();
  const [triggerSearch, { isLoading: isLoadingSearch }] = useLazySearchTutorsQuery();

  const isLoadingMore = isSearchMode ? isLoadingSearch : isLoadingFilter;

  // API Calls
  const loadInitialTutors = useCallback(async () => {
    try {
      const result = await triggerFilter({
        PageNumber: 1,
        PageSize: PAGE_SIZE,
        ...advancedFilters,
      }).unwrap();

      if (result.success && result.data) {
        const tutors = result.data.map(transformTutorData);
        setAllTutors(tutors);
        setCurrentPage(1);
        setHasMore(tutors.length >= PAGE_SIZE);
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
          PageSize: PAGE_SIZE,
        }).unwrap();

        if (result.success && result.data) {
          const tutors = result.data.map(transformTutorData);
          setAllTutors(tutors);
          setHasMore(tutors.length >= PAGE_SIZE);
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
          PageSize: PAGE_SIZE,
        }).unwrap();
      } else {
        result = await triggerFilter({
          PageNumber: nextPage,
          PageSize: PAGE_SIZE,
          ...advancedFilters,
        }).unwrap();
      }

      if (result.success && result.data) {
        const newTutors = result.data.map(transformTutorData);
        setAllTutors((prev) => [...prev, ...newTutors]);
        setCurrentPage(nextPage);
        setHasMore(newTutors.length >= PAGE_SIZE);
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

  // Handlers
  const handleQuickFilterToggle = async (filterType: "highRating") => {
    const newQuickFilters = { ...quickFilters };
    const filterParams: TutorSearchRequest = {};

    if (filterType === "highRating") {
      // Toggle high rating filter
      newQuickFilters.highRating = !newQuickFilters.highRating;
      if (newQuickFilters.highRating) {
        filterParams.Grades = "Đánh giá cao nhất";
      }
    }

    setQuickFilters(newQuickFilters);
    setAdvancedFilters(filterParams);
    setCurrentPage(1);
    setAllTutors([]);
    setHasMore(true);
    setIsSearchMode(false);
    setSearchQuery("");

    try {
      const result = await triggerFilter({
        PageNumber: 1,
        PageSize: PAGE_SIZE,
        ...filterParams,
      }).unwrap();

      if (result.success && result.data) {
        const tutors = result.data.map(transformTutorData);
        setAllTutors(tutors);
        setHasMore(tutors.length >= PAGE_SIZE);
      }
    } catch (err) {
      console.error("Error applying quick filter:", err);
    }
  };

  const handleSubjectFilterToggle = async (subject: string) => {
    let newSubjects = [...quickFilters.subjects];

    if (newSubjects.includes(subject)) {
      // Remove subject
      newSubjects = newSubjects.filter((s) => s !== subject);
    } else {
      // Add subject
      newSubjects.push(subject);
    }

    const newQuickFilters = { ...quickFilters, subjects: newSubjects };
    setQuickFilters(newQuickFilters);

    const filterParams: TutorSearchRequest = {
      Subjects: newSubjects.length > 0 ? newSubjects : undefined,
      Grades: newQuickFilters.highRating ? "Đánh giá cao nhất" : undefined,
    };

    setAdvancedFilters(filterParams);
    setCurrentPage(1);
    setAllTutors([]);
    setHasMore(true);
    setIsSearchMode(false);
    setSearchQuery("");

    try {
      const result = await triggerFilter({
        PageNumber: 1,
        PageSize: PAGE_SIZE,
        ...filterParams,
      }).unwrap();

      if (result.success && result.data) {
        const tutors = result.data.map(transformTutorData);
        setAllTutors(tutors);
        setHasMore(tutors.length >= PAGE_SIZE);
      }
    } catch (err) {
      console.error("Error applying subject filter:", err);
    }
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
        PageSize: PAGE_SIZE,
        ...filters,
      }).unwrap();

      if (result.success && result.data) {
        const tutors = result.data.map(transformTutorData);
        setAllTutors(tutors);
        setHasMore(tutors.length >= PAGE_SIZE);
      }
    } catch (err) {
      console.error("Error applying filters:", err);
    }
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
        <div className="mb-8 bg-card border border-border rounded-3xl p-8 shadow-sm">
          {/* Search Row */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder={t("search.placeholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-background border border-border rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                           transition-all duration-200"
              />
            </div>

            <div className="relative min-w-[200px]">
              <select
                value={selectedSubject}
                onChange={(e) => {
                  setSelectedSubject(e.target.value);
                  if (e.target.value) {
                    handleSubjectFilterToggle(e.target.value);
                  }
                }}
                className="appearance-none bg-background border border-border rounded-xl px-4 py-3.5 pr-10 w-full
                           focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                           transition-all duration-200 cursor-pointer"
              >
                <option value="">Tất cả môn học</option>
                {SUBJECT_OPTIONS.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 pointer-events-none" />
            </div>

            <button
              onClick={() => setIsAdvancedFilterOpen(true)}
              className="flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground
                         rounded-xl hover:bg-primary/90 transition-colors duration-200 font-medium whitespace-nowrap"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Bộ lọc</span>
            </button>
          </div>

          {/* Quick Filters */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <SlidersHorizontal className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Lọc nhanh:</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleQuickFilterToggle("highRating")}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
                            border transition-all duration-200 ${
                              quickFilters.highRating
                                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                                : "bg-background text-foreground border-border hover:bg-secondary"
                            }`}
              >
                <span className="text-base">⭐</span>
                <span>Đánh giá cao nhất</span>
              </button>

              {QUICK_FILTER_SUBJECTS.map((subject) => (
                <button
                  key={subject}
                  onClick={() => handleSubjectFilterToggle(subject)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                    quickFilters.subjects.includes(subject)
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-background text-foreground border-border hover:bg-secondary"
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Filter Tags */}
          {(advancedFilters.MinHourlyRate ||
            advancedFilters.MaxHourlyRate ||
            advancedFilters.MinRating ||
            advancedFilters.HoursPerSession) && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
              {advancedFilters.MinHourlyRate && advancedFilters.MaxHourlyRate && (
                <div className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm border border-primary/20">
                  Giá: {advancedFilters.MinHourlyRate.toLocaleString()} -{" "}
                  {advancedFilters.MaxHourlyRate.toLocaleString()} đ
                </div>
              )}
              {advancedFilters.MinRating && (
                <div className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm border border-primary/20">
                  Đánh giá: ≥ {advancedFilters.MinRating} ⭐
                </div>
              )}
              {advancedFilters.HoursPerSession && (
                <div className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm border border-primary/20">
                  Thời lượng: {advancedFilters.HoursPerSession} giờ
                </div>
              )}
            </div>
          )}
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
