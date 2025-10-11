// Course types
export interface CourseDto {
  courseId: string;
  tutorId: string;
  title: string;
  description: string;
  subjects: string[];
  isPublished: boolean;
  hoursPerSession: string;
  hourlyRate: number;
  createdAt: string;
  updatedAt: string | null;
}

// Package types
export enum PackageType {
  TRIAL = "TRIAL",
  SINGLE = "SINGLE",
  FOUR = "FOUR",
  EIGHT = "EIGHT",
  TWELVE = "TWELVE",
}

export interface PackageDto {
  packageId: string;
  courseId: string;
  packageType: string; // Changed to string to accept "TRIAL", "SINGLE", etc.
  numberOfSessions: number;
  price: number;
  serviceFeePercentage: number;
  createdAt: string;
  updatedAt: string | null;
}

// Course Request types
export interface CreateCourseRequest {
  title: string;
  description: string;
  subjects: string[];
  isPublished: boolean;
  hoursPerSession: string;
  hourlyRate: number;
}

export interface UpdateCourseRequest {
  title?: string;
  description?: string;
  subjects?: string[];
  isPublished?: boolean;
  hoursPerSession?: string;
  hourlyRate?: number;
}

// Course Response types
export interface GetCourseRequest {
  tutorId: string;
}

export interface GetCoursePackagesRequest {
  courseId: string;
}

export interface CreateCourseResponse {
  success: boolean;
  data: CourseDto;
  message: string;
  errors: any[] | null;
}

export interface GetCourseResponse {
  success: boolean;
  data: CourseDto;
  message: string;
  errors: any[] | null;
}

export interface UpdateCourseResponse {
  success: boolean;
  data: CourseDto;
  message: string;
  errors: any[] | null;
}

export interface GetCoursePackagesResponse {
  success: boolean;
  data: PackageDto[];
  message: string;
  errors: any[] | null;
}

export interface UpdateCourseResponse {
  success: boolean;
  data: CourseDto;
  message: string;
  errors: any[] | null;
}
