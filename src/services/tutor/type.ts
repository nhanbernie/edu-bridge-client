import { ApiResponse } from "@/services/api/type";

// Search request interface
export interface TutorSearchRequest {
  MinHourlyRate?: number;
  MaxHourlyRate?: number;
  Subjects?: string[];
  Grades?: string;
  MinRating?: number;
  HoursPerSession?: string;
  PageNumber?: number;
  PageSize?: number;
}

// Tutor search response from API
export interface TutorSearchDto {
  tutorId: string;
  educationLevel: string;
  yearsOfExperience: number;
  bio: string;
  subjects: string[];
  languages: string[];
  hourlyRate?: number;
  currency: string;
  verifiedStatus: "VERIFIED" | "TRUSTED_BEGINNER" | "PENDING";
  averageTutorRating: number;
  fullName: string;
  email: string;
  // Additional fields that might be in response
  phone?: string;
  avatar?: string;
  location?: string;
  studentCount?: number;
  courseCount?: number;
  reviewCount?: number;
  status?: "Online" | "Offline";
}

// Response type
export type TutorSearchResponse = ApiResponse<TutorSearchDto[]>;

// Transformed tutor interface for TutorCard component
export interface TutorCardData {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  location: string;
  subjects: string[];
  experience: string;
  studentCount: number;
  courseCount: number;
  price: number;
  currency: string;
  status: "Online" | "Offline";
  verified?: boolean;
  // Additional fields
  bio?: string;
  languages?: string[];
  educationLevel?: string;
  email?: string;
  phone?: string;
}
