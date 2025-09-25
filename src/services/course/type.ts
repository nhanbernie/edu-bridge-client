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
  TRIAL = 0,
  BASIC = 1,
  STANDARD = 2,
  PREMIUM = 3,
  CUSTOM = 4,
}

export interface PackageDto {
  packageId: string;
  courseId: string;
  packageType: PackageType;
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
