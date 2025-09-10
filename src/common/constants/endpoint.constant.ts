import { ENV } from "@/utils/env";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/Auth/login",
    REGISTER: "/api/Auth/register",
    REFRESH: "/api/Auth/refresh-token",
    LOGOUT: "/api/Auth/logout",
    PROFILE: "/api/Auth/profile",
    FORGOT_PASSWORD: "/api/Auth/forgot-password",
    VERIFY_OTP: "/api/Auth/verify-otp",
    RESET_PASSWORD: "/api/Auth/reset-password",
    CHANGE_PASSWORD: "/api/Auth/change-password",
    CREATE_OTP: "/api/Auth/create-otp",
  },
  USER: {
    SELECT_ROLE: "/api/user/{id}/select-role",
  },
} as const;

export const API_CONFIG = {
  BASE_URL: ENV.API.BASE_URL,
  TIMEOUT: ENV.API.TIMEOUT,
} as const;

export const PUBLIC_ENDPOINTS = [
  API_ENDPOINTS.AUTH.LOGIN,
  API_ENDPOINTS.AUTH.REGISTER,
  API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
  API_ENDPOINTS.AUTH.VERIFY_OTP,
  API_ENDPOINTS.AUTH.RESET_PASSWORD,
  API_ENDPOINTS.AUTH.CREATE_OTP,
];
