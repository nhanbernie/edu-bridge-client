import { ApiResponse } from "../api/type";

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
  createdAt: string;
}

// API Response Types
export type GetStudentUpcomingSessionsResponse = ApiResponse<ClassSessionDto[]>;
export type GetTutorUpcomingSessionsResponse = ApiResponse<ClassSessionDto[]>;

// Route Params
export interface StudentUpcomingSessionsParams {
  studentId: string;
}

export interface TutorUpcomingSessionsParams {
  tutorId: string;
}
