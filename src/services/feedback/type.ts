import { ApiResponse } from "../api/type";

// Feedback Request Types
export interface CreateFeedbackRequest {
  tutorRating: number;
  courseRating: number;
  comment: string;
}

// Feedback Data Types
export interface FeedbackData {
  feedbackId: string;
  courseId: string;
  tutorRating: number;
  courseRating: number;
  comment: string;
  createdAt: string;
  updatedAt: string | null;
  courseTitle?: string | null;
  studentName?: string | null;
}

// Response Types using generic ApiResponse
export type CreateFeedbackResponse = ApiResponse<FeedbackData>;
export type GetRatingResponse = ApiResponse<number>;
export type GetTutorFeedbacksResponse = ApiResponse<FeedbackData[]>;

// Route Parameters
export interface FeedbackRouteParams {
  courseId: string;
}

export interface TutorFeedbacksParams {
  tutorId: string;
}

export interface TutorRatingRouteParams {
  tutorId: string;
}

export interface CourseRatingRouteParams {
  courseId: string;
}

// Validation constraints
export const FEEDBACK_CONSTRAINTS = {
  MIN_RATING: 1,
  MAX_RATING: 5,
  MIN_COMMENT_LENGTH: 1,
  MAX_COMMENT_LENGTH: 1000,
} as const;

// Error messages
export const FEEDBACK_ERROR_MESSAGES = {
  INVALID_RATING: "Rating phải từ 1 đến 5",
  NO_COMPLETED_SESSIONS: "Phải tham gia ít nhất 1 buổi học trong khóa để feedback/rating",
  COURSE_NOT_FOUND: "Khóa học không tồn tại",
  SERVER_ERROR: "Lỗi server",
} as const;
