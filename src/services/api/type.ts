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
export type UserRole = "PENDING" | "ADMIN" | "TUTOR" | "STUDENT" | "PARENT";
export type UserStatus = "PENDING" | "APPROVED" | "REJECTED";
export type TutorType = "VERIFIED" | "TRUSTED_BEGINNER";

export interface TutorDto {
  tutorId?: string;
  educationLevel?: string;
  yearsOfExperience?: number;
  bio?: string;
  subjects?: string[];
  languages?: string[];
  hourlyRate?: number;
  hoursPerSession?: number;
  verificationType?: TutorType;
}

export interface StudentDto {
  studentId?: string;
  grade?: string;
  learningGoal?: string;
}

export interface UserDto {
  userId: string;
  email: string;
  role: UserRole;
  fullName?: string | null;
  phone?: string | null;
  status?: UserStatus | null;
  tutor?: TutorDto | null;
  student?: StudentDto | null;
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
    subjects: string[];
    languages: string[];
    hourlyRate: number;
    hoursPerSession: number;
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

// Verification documents types
export interface VerificationDocument {
  docId: string;
  docType: DocumentType;
  filePath: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export interface GetVerificationDocsRequest {
  tutorId: string;
}

export interface GetVerificationDocsResponse {
  success: boolean;
  message: string;
  data: VerificationDocument[];
  errors: any[];
}

// Verify all documents types
export interface VerifyAllDocumentsRequest {
  tutorId: string;
  isApproved: boolean;
  rejectType?: "INVALID" | "INCOMPLETE" | "EXPIRED" | "OTHER";
  tutorType?: string;
}

export interface VerifyAllDocumentsResponse {
  success: boolean;
  message: string | null;
  data: string;
  errors: any[] | null;
}

// Get all users types
export interface GetAllUsersRequest {
  role?: 0 | 1 | 2 | 3 | 4; // STUDENT=0, TUTOR=1, PARENT=2, ADMIN=3, PENDING=4
  status?: 0 | 1 | 2; // PENDING=0, APPROVED=1, REJECTED=2
}

export interface GetAllUsersResponse {
  success: boolean;
  message: string;
  data: UserDto[];
  errors: any[] | null;
}

// Delete user types
export interface DeleteUserRequest {
  userId: string;
}

export interface DeleteUserResponse {
  success: boolean;
  message: string;
  data: null;
  errors: any[];
}

// Onboarding Response types
// Onboarding Response
export interface OnboardingResponse {
  message: string;
  userData: any;
}
