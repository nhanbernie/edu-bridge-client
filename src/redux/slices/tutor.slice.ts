import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { TutorCardData, TutorSearchRequest } from "@/services/tutor/type";

// Tutor search filters state
interface TutorSearchFilters extends TutorSearchRequest {
  // Additional UI-specific filters
  searchQuery?: string;
  sortBy?: "rating" | "price" | "experience" | "name";
  sortOrder?: "asc" | "desc";
}

// Tutor slice state
interface TutorState {
  // Search results
  tutors: TutorCardData[];
  totalCount: number;

  // Search filters
  searchFilters: TutorSearchFilters;

  // UI state
  isLoading: boolean;
  error: string | null;

  // Pagination
  currentPage: number;
  pageSize: number;
  hasNextPage: boolean;

  // Selected/favorited tutors
  selectedTutorId: string | null;
  favoriteTutorIds: string[];

  // Cache
  lastSearchTimestamp: number | null;
}

const initialState: TutorState = {
  // Search results
  tutors: [],
  totalCount: 0,

  // Search filters
  searchFilters: {
    PageNumber: 1,
    PageSize: 10,
    sortBy: "rating",
    sortOrder: "desc",
  },

  // UI state
  isLoading: false,
  error: null,

  // Pagination
  currentPage: 1,
  pageSize: 10,
  hasNextPage: false,

  // Selected/favorited tutors
  selectedTutorId: null,
  favoriteTutorIds: [],

  // Cache
  lastSearchTimestamp: null,
};

const tutorSlice = createSlice({
  name: "tutor",
  initialState,
  reducers: {
    // Set tutors from API response
    setTutors: (state, action: PayloadAction<TutorCardData[]>) => {
      state.tutors = action.payload;
      state.totalCount = action.payload.length;
      state.lastSearchTimestamp = Date.now();
    },

    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },

    // Set error
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Update search filters
    updateSearchFilters: (state, action: PayloadAction<Partial<TutorSearchFilters>>) => {
      state.searchFilters = { ...state.searchFilters, ...action.payload };
      // Reset to first page when filters change
      if (
        action.payload.MinHourlyRate !== undefined ||
        action.payload.MaxHourlyRate !== undefined ||
        action.payload.Subjects !== undefined ||
        action.payload.Grades !== undefined ||
        action.payload.MinRating !== undefined ||
        action.payload.searchQuery !== undefined
      ) {
        state.currentPage = 1;
        state.searchFilters.PageNumber = 1;
      }
    },

    // Set pagination
    setPagination: (
      state,
      action: PayloadAction<{ page: number; pageSize: number; hasNextPage: boolean }>
    ) => {
      state.currentPage = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.hasNextPage = action.payload.hasNextPage;
      state.searchFilters.PageNumber = action.payload.page;
      state.searchFilters.PageSize = action.payload.pageSize;
    },

    // Select tutor
    setSelectedTutor: (state, action: PayloadAction<string | null>) => {
      state.selectedTutorId = action.payload;
    },

    // Toggle favorite tutor
    toggleFavoriteTutor: (state, action: PayloadAction<string>) => {
      const tutorId = action.payload;
      const index = state.favoriteTutorIds.indexOf(tutorId);
      if (index >= 0) {
        state.favoriteTutorIds.splice(index, 1);
      } else {
        state.favoriteTutorIds.push(tutorId);
      }
    },

    // Clear search results
    clearSearchResults: (state) => {
      state.tutors = [];
      state.totalCount = 0;
      state.error = null;
      state.lastSearchTimestamp = null;
    },

    // Reset filters
    resetFilters: (state) => {
      state.searchFilters = {
        PageNumber: 1,
        PageSize: 10,
        sortBy: "rating",
        sortOrder: "desc",
      };
      state.currentPage = 1;
    },
  },
});

export const {
  setTutors,
  setLoading,
  setError,
  updateSearchFilters,
  setPagination,
  setSelectedTutor,
  toggleFavoriteTutor,
  clearSearchResults,
  resetFilters,
} = tutorSlice.actions;

// Selectors
export const selectTutors = (state: RootState) => state.tutor.tutors;
export const selectTutorById = (state: RootState, tutorId: string) =>
  state.tutor.tutors.find((tutor: any) => tutor.id === tutorId);
export const selectTutorSearchFilters = (state: RootState) => state.tutor.searchFilters;
export const selectTutorLoading = (state: RootState) => state.tutor.isLoading;
export const selectTutorError = (state: RootState) => state.tutor.error;
export const selectTutorPagination = createSelector(
  [
    (state: RootState) => state.tutor.currentPage,
    (state: RootState) => state.tutor.pageSize,
    (state: RootState) => state.tutor.hasNextPage,
    (state: RootState) => state.tutor.totalCount,
  ],
  (currentPage, pageSize, hasNextPage, totalCount) => ({
    currentPage,
    pageSize,
    hasNextPage,
    totalCount,
  })
);
export const selectSelectedTutor = (state: RootState) => {
  if (!state.tutor.selectedTutorId) return null;
  return state.tutor.tutors.find((tutor: any) => tutor.id === state.tutor.selectedTutorId) || null;
};
export const selectFavoriteTutorIds = (state: RootState) => state.tutor.favoriteTutorIds;
export const selectIsTutorFavorited = (state: RootState, tutorId: string) =>
  state.tutor.favoriteTutorIds.includes(tutorId);

export const tutorReducer = tutorSlice.reducer;
