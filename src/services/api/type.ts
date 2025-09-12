// API Response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data: T | null;
  message: string;
  errors: Array<{ field: string; message: string }>;
  statusCode?: number;
}

export interface ApiError {
  success: false;
  message: string;
  errors: Array<{ field: string; message: string }>;
  statusCode: number;
}

// User types
export interface UserDto {
  userId: string;
  email: string;
  role: "PENDING" | "ADMIN" | "TUTOR" | "STUDENT" | "PARENT";
  fullName?: string | null;
  phone?: string | null;
  status?: string | null;
  tutor?: any | null;
  student?: any | null;
}

// Auth Request types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

// Auth Response types
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserDto;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

// Legacy types for backward compatibility
export interface AuthResponse {
  success: boolean;
  data: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    user?: UserDto;
  };
  message: string;
  statusCode?: number;
  timestamp: string;
}

export interface User extends UserDto {
  id: string;
  username: string;
  roles: string[];
  firstName?: string;
  lastName?: string;
  createdAt: string;
  updatedAt: string;
  avatar?: string;
}

// Onboarding Request types
export interface StudentOnboardingRequest {
  role: "STUDENT";
  student: {
    grade: string;
    learningGoal: string;
  };
}

export interface TutorOnboardingRequest {
  role: "TUTOR";
  tutor: {
    educationLevel: string;
    yearsOfExperience: number;
    bio: string;
    subjects: string;
    languages: string;
    hourlyRate: number;
  };
}

export type OnboardingRequest = StudentOnboardingRequest | TutorOnboardingRequest;

// Document upload types
export type DocumentType =
  | "CCCD"
  | "CERTIFICATE"
  | "SELFIE"
  | "STUDENT_CARD"
  | "TRANSCRIPT"
  | "ENROLLMENT_CONFIRMATION";

export interface UploadDocumentRequest {
  tutorId: string;
  docType: DocumentType;
  file: File;
}

export interface UploadDocumentData {
  documentId: string;
  docType: DocumentType;
  filePath: string;
  uploadedAt: string;
}

export interface UploadDocumentResponse {
  success: boolean;
  message: string;
  data: UploadDocumentData;
  errors: any[];
}

// Onboarding Response types
// Onboarding Response
export interface OnboardingResponse {
  message: string;
  userData: any;
}
