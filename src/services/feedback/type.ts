import { ApiResponse } from "@/services/api/type";

// Feedback item interface
export interface FeedbackItem {
  feedbackId: string;
  courseId: string;
  tutorRating: number;
  courseRating: number;
  comment: string;
  createdAt: string;
  updatedAt: string | null;
  courseTitle: string;
  studentName: string;
}

// Rating counts interface
export interface RatingCounts {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
}

// Tutor feedbacks response interface
export interface TutorFeedbacksData {
  totalFeedbacks: number;
  averageTutorRating: number;
  ratingCounts: RatingCounts;
  feedbacks: FeedbackItem[];
}

// API response type
export type TutorFeedbacksResponse = ApiResponse<TutorFeedbacksData>;
