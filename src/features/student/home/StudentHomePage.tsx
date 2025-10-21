"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { MotionContainer, MotionItem } from "@/components/motion";
import TutorCard from "./components/TutorCard";
import AdvancedFilter from "./components/AdvancedFilter";
import { TutorFilterSection } from "./components/TutorFilterSection";
import { useTutorInfiniteScroll } from "./hooks";
import type { TutorCardData, TutorSearchRequest, TutorSearchDto } from "@/services/tutor/type";
import { EBCharityCounter } from "@/components/common";
import { TutorCardSkeleton } from "@/components/common/skeletons";
import { PAGE_HEADER, PAGE_TITLE, PAGE_SUBTITLE } from "@/common/constants/className.constant";
import { useTranslations } from "next-intl";
import {
  useLazyFilterTutorsQuery,
  useLazySearchTutorsQuery,
  useGetTutorSubjectsQuery,
} from "@/services/tutor";
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

// Constants
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
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [quickFilters, setQuickFilters] = useState({
    highRating: false,
    subjects: [] as string[],
  });

  // Refs
  const isLoadingRef = useRef(false);

  // Hooks
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [triggerFilter, { isLoading: isLoadingFilter }] = useLazyFilterTutorsQuery();
  const [triggerSearch, { isLoading: isLoadingSearch }] = useLazySearchTutorsQuery();
  const { data: subjectsData, isLoading: isLoadingSubjects } = useGetTutorSubjectsQuery();

  const isLoadingMore = isSearchMode ? isLoadingSearch : isLoadingFilter;

  // Process subjects data from API
  const allSubjects = subjectsData?.data || [];

  // Subject options for dropdown (all subjects)
  const subjectOptions = allSubjects;

  // Quick filter subjects - only show first 4 items
  const quickFilterSubjects = allSubjects.slice(0, 4);

  // API Calls
  const loadInitialTutors = useCallback(async () => {
    try {
      setIsInitialLoading(true);
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
    } finally {
      setIsInitialLoading(false);
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
      } catch (err) {}
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

  const handleViewDetails = (tutorId: string) => {
    push(`/student/tutor/${tutorId}`);
  };

  const handleContact = (_tutorId: string) => {
    // TODO: Implement contact functionality
  };

  const handleFavorite = (tutorId: string) => {
    dispatch(toggleFavoriteTutor(tutorId));
  };

  // Infinite scroll hook with optimized settings (after loadMoreTutors is defined)
  const { observerTarget } = useTutorInfiniteScroll({
    hasMore,
    isLoading: isLoadingMore,
    onLoadMore: loadMoreTutors,
    rootMargin: "300px", // Trigger 300px before reaching element (fixes footer issue)
    threshold: 0.1, // Trigger when 10% visible (more sensitive)
  });

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
    } catch (err) {}
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
    } catch (err) {}
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
    } catch (err) {}
  };

  return (
    <div className="min-h-screen pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* EBHeader Section */}
        <div className={PAGE_HEADER}>
          <h1 className={`${PAGE_TITLE} text-4xl`}>{t("title")}</h1>
          <p className={`${PAGE_SUBTITLE} text-lg`}>
            {t("subtitle.found", { count: filteredTutors.length })}
          </p>
        </div>

        {/* Filter Section */}
        <TutorFilterSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedSubject={selectedSubject}
          onSubjectChange={(value) => {
            setSelectedSubject(value);
            if (value) {
              handleSubjectFilterToggle(value);
            }
          }}
          quickFilters={quickFilters}
          onQuickFilterToggle={handleQuickFilterToggle}
          onSubjectFilterToggle={handleSubjectFilterToggle}
          onAdvancedFilterOpen={() => setIsAdvancedFilterOpen(true)}
          advancedFilters={advancedFilters}
          subjectOptions={subjectOptions}
          quickFilterSubjects={quickFilterSubjects}
          isLoadingSubjects={isLoadingSubjects}
          searchPlaceholder={t("search.placeholder")}
          allSubjectsText={t("filter.subjects.all")}
          filterButtonText={t("filter.button")}
          highRatingText={t("filter.quickFilters.highRating")}
          priceText={t("filter.tags.price")}
          ratingText={t("filter.tags.rating")}
          durationText={t("filter.tags.duration")}
          hoursText={t("filter.tags.hours")}
        />

        {/* Tutors Grid */}
        {isInitialLoading ? (
          // Initial loading skeleton
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
            <TutorCardSkeleton count={6} />
          </div>
        ) : allTutors.length === 0 ? (
          // Empty state (only show after initial load)
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
          // Tutors list
          <>
            <MotionContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
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
        subjectOptions={subjectOptions}
        isLoadingSubjects={isLoadingSubjects}
      />

      {/* Charity Counter - Fixed bottom right */}
      <EBCharityCounter />
    </div>
  );
};

export default StudentHomePage;
