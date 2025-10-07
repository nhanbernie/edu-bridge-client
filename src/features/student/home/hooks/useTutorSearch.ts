import { useCallback, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchTutorsQuery, useLazySearchTutorsQuery } from "@/services/tutor";
import type { TutorSearchRequest, TutorSearchDto, TutorCardData } from "@/services/tutor/type";
import {
  selectTutors,
  selectTutorSearchFilters,
  selectTutorLoading,
  selectTutorError,
  selectTutorPagination,
  selectFavoriteTutorIds,
  selectIsTutorFavorited,
  setTutors,
  setLoading,
  setError,
  updateSearchFilters,
  setPagination,
  toggleFavoriteTutor,
  setSelectedTutor,
  clearSearchResults,
  resetFilters,
} from "@/redux/slices/tutor.slice";

// Transform API response to TutorCard format
const transformTutorData = (tutorDto: TutorSearchDto): TutorCardData => {
  return {
    id: tutorDto.tutorId,
    name: tutorDto.fullName || "Unknown Tutor",
    avatar: tutorDto.avatar || tutorDto.fullName?.charAt(0).toUpperCase() || "T",
    rating: tutorDto.averageTutorRating || 0,
    reviewCount: tutorDto.reviewCount || 0,
    location: tutorDto.location || "Chưa cập nhật",
    subjects: tutorDto.subjects || [],
    experience: `${tutorDto.yearsOfExperience || 0} năm kinh nghiệm`,
    studentCount: tutorDto.studentCount || 0,
    courseCount: tutorDto.courseCount || 0,
    price: tutorDto.hourlyRate || 0,
    currency: tutorDto.currency || "VND",
    status: tutorDto.status || "Offline",
    verified: tutorDto.verifiedStatus === "VERIFIED",
    // Additional fields
    bio: tutorDto.bio,
    languages: tutorDto.languages,
    educationLevel: tutorDto.educationLevel,
    email: tutorDto.email,
    phone: tutorDto.phone,
  };
};

interface UseTutorSearchProps {
  searchParams?: TutorSearchRequest;
  enabled?: boolean;
}

export const useTutorSearch = ({ searchParams, enabled = true }: UseTutorSearchProps = {}) => {
  const dispatch = useDispatch();

  // Redux state
  const tutors = useSelector(selectTutors);
  const searchFilters = useSelector(selectTutorSearchFilters);
  const isLoadingState = useSelector(selectTutorLoading);
  const errorState = useSelector(selectTutorError);
  const pagination = useSelector(selectTutorPagination);
  const favoriteTutorIds = useSelector(selectFavoriteTutorIds);

  // Use searchParams or Redux filters
  const finalSearchParams = searchParams || searchFilters;

  // Auto search with params
  const {
    data: searchResponse,
    isLoading: isApiLoading,
    error: apiError,
    refetch,
  } = useSearchTutorsQuery(finalSearchParams, {
    skip: !enabled,
  });

  // Lazy search for manual triggers
  const [triggerSearch, { isLoading: isSearching }] = useLazySearchTutorsQuery();

  // Sync API response to Redux
  useEffect(() => {
    if (searchResponse?.success && searchResponse.data) {
      const transformedTutors = searchResponse.data.map(transformTutorData);
      dispatch(setTutors(transformedTutors));
      dispatch(setError(null));
    } else if (apiError) {
      dispatch(setError("Có lỗi xảy ra khi tìm kiếm gia sư"));
    }
  }, [searchResponse, apiError, dispatch]);

  // Sync loading state
  useEffect(() => {
    dispatch(setLoading(isApiLoading || isSearching));
  }, [isApiLoading, isSearching, dispatch]);

  // Manual search function
  const searchTutors = useCallback(
    async (params: TutorSearchRequest) => {
      dispatch(setLoading(true));
      dispatch(setError(null));

      try {
        const result = await triggerSearch(params).unwrap();

        if (result.success && result.data) {
          const transformedTutors = result.data.map(transformTutorData);
          dispatch(setTutors(transformedTutors));

          // Update pagination if provided
          if (params.PageNumber && params.PageSize) {
            dispatch(
              setPagination({
                page: params.PageNumber,
                pageSize: params.PageSize,
                hasNextPage: result.data.length === params.PageSize,
              })
            );
          }
        }

        return result;
      } catch (error) {
        dispatch(setError("Có lỗi xảy ra khi tìm kiếm gia sư"));
        throw error;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [triggerSearch, dispatch]
  );

  // Update filters function
  const updateFilters = useCallback(
    (filters: Partial<TutorSearchRequest>) => {
      dispatch(updateSearchFilters(filters));
    },
    [dispatch]
  );

  // Favorite actions
  const toggleFavorite = useCallback(
    (tutorId: string) => {
      dispatch(toggleFavoriteTutor(tutorId));
    },
    [dispatch]
  );

  const isTutorFavorited = useCallback(
    (tutorId: string) => {
      return favoriteTutorIds.includes(tutorId);
    },
    [favoriteTutorIds]
  );

  return {
    // Data from Redux
    tutors,
    totalCount: pagination.totalCount,

    // Loading states
    isLoading: isLoadingState,

    // Error
    error: errorState,

    // Pagination
    pagination,

    // Search filters
    searchFilters,

    // Actions
    searchTutors,
    updateFilters,
    refetch,
    toggleFavorite,
    isTutorFavorited,

    // Redux actions
    clearResults: () => dispatch(clearSearchResults()),
    resetFilters: () => dispatch(resetFilters()),
    selectTutor: (tutorId: string | null) => dispatch(setSelectedTutor(tutorId)),

    // Raw response for debugging
    rawResponse: searchResponse,
  };
};

// Hook for search with filters
export const useTutorSearchWithFilters = () => {
  const [triggerSearch, { data, isLoading, error }] = useLazySearchTutorsQuery();

  const searchWithFilters = useCallback(
    async (filters: {
      subjects?: string[];
      minPrice?: number;
      maxPrice?: number;
      grades?: string;
      minRating?: number;
      hoursPerSession?: string;
      page?: number;
      pageSize?: number;
    }) => {
      const searchParams: TutorSearchRequest = {
        Subjects: filters.subjects,
        MinHourlyRate: filters.minPrice,
        MaxHourlyRate: filters.maxPrice,
        Grades: filters.grades,
        MinRating: filters.minRating,
        HoursPerSession: filters.hoursPerSession,
        PageNumber: filters.page || 1,
        PageSize: filters.pageSize || 10,
      };

      return await triggerSearch(searchParams).unwrap();
    },
    [triggerSearch]
  );

  const tutors = useMemo(() => {
    if (!data?.success || !data.data) return [];
    return data.data.map(transformTutorData);
  }, [data]);

  return {
    tutors,
    isLoading,
    error,
    searchWithFilters,
    rawData: data,
  };
};
