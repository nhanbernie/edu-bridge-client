import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Rating cache interface
interface RatingCache {
  tutorId?: string;
  courseId?: string;
  rating: number;
  lastUpdated: number;
}

// Feedback form state
interface FeedbackFormState {
  tutorRating: number;
  courseRating: number;
  comment: string;
  isSubmitting: boolean;
  errors: Record<string, string>;
}

// Real-time feedback update
interface RealtimeFeedbackUpdate {
  feedbackId: string;
  courseId: string;
  tutorRating: number;
  courseRating: number;
  comment: string;
  createdAt: string;
  updatedAt: string | null;
}

interface FeedbackState {
  // Rating caches
  tutorRatings: Record<string, RatingCache>;
  courseRatings: Record<string, RatingCache>;

  // Feedback form state
  feedbackForm: FeedbackFormState;

  // Real-time updates
  recentFeedback: RealtimeFeedbackUpdate | null;

  // Tutor feedbacks list
  tutorFeedbacks: Record<string, any[]>; // tutorId -> feedbacks array

  // UI state
  isLoading: boolean;
  error: string | null;
}

const initialState: FeedbackState = {
  tutorRatings: {},
  courseRatings: {},
  feedbackForm: {
    tutorRating: 5,
    courseRating: 5,
    comment: "",
    isSubmitting: false,
    errors: {},
  },
  recentFeedback: null,
  tutorFeedbacks: {},
  isLoading: false,
  error: null,
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    // Rating cache actions
    setTutorRating: (state, action: PayloadAction<{ tutorId: string; rating: number }>) => {
      const { tutorId, rating } = action.payload;
      state.tutorRatings[tutorId] = {
        tutorId,
        rating,
        lastUpdated: Date.now(),
      };
    },

    setCourseRating: (state, action: PayloadAction<{ courseId: string; rating: number }>) => {
      const { courseId, rating } = action.payload;
      state.courseRatings[courseId] = {
        courseId,
        rating,
        lastUpdated: Date.now(),
      };
    },

    // Feedback form actions
    updateFeedbackForm: (state, action: PayloadAction<Partial<FeedbackFormState>>) => {
      state.feedbackForm = { ...state.feedbackForm, ...action.payload };
    },

    setFeedbackFormErrors: (state, action: PayloadAction<Record<string, string>>) => {
      state.feedbackForm.errors = action.payload;
    },

    clearFeedbackForm: (state) => {
      state.feedbackForm = {
        tutorRating: 5,
        courseRating: 5,
        comment: "",
        isSubmitting: false,
        errors: {},
      };
    },

    // Real-time feedback update
    setRecentFeedback: (state, action: PayloadAction<RealtimeFeedbackUpdate>) => {
      state.recentFeedback = action.payload;
    },

    // Tutor feedbacks actions
    setTutorFeedbacks: (state, action: PayloadAction<{ tutorId: string; feedbacks: any[] }>) => {
      const { tutorId, feedbacks } = action.payload;
      state.tutorFeedbacks[tutorId] = feedbacks;
    },

    clearTutorFeedbacks: (state, action: PayloadAction<string>) => {
      const tutorId = action.payload;
      delete state.tutorFeedbacks[tutorId];
    },

    // Loading and error states
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Clear all feedback state
    clearFeedbackState: (state) => {
      state.tutorRatings = {};
      state.courseRatings = {};
      state.feedbackForm = initialState.feedbackForm;
      state.recentFeedback = null;
      state.tutorFeedbacks = {};
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setTutorRating,
  setCourseRating,
  updateFeedbackForm,
  setFeedbackFormErrors,
  clearFeedbackForm,
  setRecentFeedback,
  setTutorFeedbacks,
  clearTutorFeedbacks,
  setLoading,
  setError,
  clearFeedbackState,
} = feedbackSlice.actions;

export const feedbackReducer = feedbackSlice.reducer;

// Selectors
export const selectTutorRating = (state: { feedback: FeedbackState }, tutorId: string) =>
  state.feedback.tutorRatings[tutorId]?.rating || 0;

export const selectCourseRating = (state: { feedback: FeedbackState }, courseId: string) =>
  state.feedback.courseRatings[courseId]?.rating || 0;

export const selectFeedbackForm = (state: { feedback: FeedbackState }) =>
  state.feedback.feedbackForm;

export const selectRecentFeedback = (state: { feedback: FeedbackState }) =>
  state.feedback.recentFeedback;

export const selectFeedbackLoading = (state: { feedback: FeedbackState }) =>
  state.feedback.isLoading;

export const selectFeedbackError = (state: { feedback: FeedbackState }) => state.feedback.error;

export const selectTutorFeedbacks = (state: { feedback: FeedbackState }, tutorId: string) =>
  state.feedback.tutorFeedbacks[tutorId] || [];
