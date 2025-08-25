// API Response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data: T | null;
  message: string;
  errors: Array<{ field: string; message: string }>;
  statusCode: number;
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
