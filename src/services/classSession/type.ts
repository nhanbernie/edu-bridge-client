import { ApiResponse } from "../api/type";

// Feedback Types
export interface FeedbackDto {
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

// Class Session Types
export interface ClassSessionDto {
  sessionId: string;
  startTime: string;
  endTime: string;
  isCompleted: boolean;
  courseId: string;
  courseTitle: string;
  tutorId: string;
  tutorName: string;
  studentId: string;
  studentName: string | null;
  createdAt: string;
  averageCourseRating: number;
  avatarUrl: string;
}

// API Response Types
export type GetStudentUpcomingSessionsResponse = ApiResponse<ClassSessionDto[]>;
export type GetStudentHistorySessionsResponse = ApiResponse<ClassSessionDto[]>;
export type GetTutorUpcomingSessionsResponse = ApiResponse<ClassSessionDto[]>;
export type GetTutorHistorySessionsResponse = ApiResponse<ClassSessionDto[]>;

// Route Params
export interface StudentUpcomingSessionsParams {
  studentId: string;
}

export interface TutorUpcomingSessionsParams {
  tutorId: string;
}
