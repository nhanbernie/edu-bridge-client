import { ENV } from "@/utils/env";

export const API_VERSION = "api";
export const AUTH_ENDPOINT = `${API_VERSION}/auth`;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${AUTH_ENDPOINT}/login`,
    REGISTER: `${AUTH_ENDPOINT}/register`,
    REFRESH: `${AUTH_ENDPOINT}/refresh-token`,
    LOGOUT: `${AUTH_ENDPOINT}/logout`,
    PROFILE: `${AUTH_ENDPOINT}/profile`,
    FORGOT_PASSWORD: `${AUTH_ENDPOINT}/forgot-password`,
    VERIFY_OTP: `${AUTH_ENDPOINT}/verify-otp`,
    RESET_PASSWORD: `${AUTH_ENDPOINT}/reset-password`,
    CHANGE_PASSWORD: `${AUTH_ENDPOINT}/change-password`,
    CREATE_OTP: `${AUTH_ENDPOINT}/create-otp`,
  },
  USER: {
    SELECT_ROLE: "/api/user/{id}/select-role",
    UPLOAD_VERIFICATION_DOC: "/api/user/{tutorId}/upload-verification-doc",
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
