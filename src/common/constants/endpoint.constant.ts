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
    RESEND_OTP: `${AUTH_ENDPOINT}/resend-otp`,
  },
  USER: {
    GET_ALL_USERS: "/api/user",
    GET_USER: "/api/user/{id}",
    DELETE_USER: "/api/user/{id}",
    SELECT_ROLE: "/api/user/{id}/select-role",
    UPLOAD_VERIFICATION_DOC: "/api/user/{tutorId}/upload-verification-doc",
    GET_VERIFICATION_DOCS: "/api/user/{tutorId}/verification-docs",
    VERIFY_ALL_DOCUMENTS: "/api/user/{tutorId}/verify-all-documents",
  },
  TUTOR: {
    GET_SUBJECTS: "/api/tutor/{tutorId}/subjects",
  },
  COURSE: {
    GET_COURSE: "/api/course",
    CREATE_COURSE: "/api/course",
    UPDATE_COURSE: "/api/course/{courseId}",
    GET_COURSE_PACKAGES: "/api/course/{courseId}/packages",
  },
  AVAILABILITY_BLOCK: {
    GET_AVAILABILITY_BLOCKS: "/api/availability-block/tutor/{tutorId}",
    CREATE_AVAILABILITY_BLOCK: "/api/availability-block",
    UPDATE_AVAILABILITY_BLOCK: "/api/availability-block/{blockId}",
    DELETE_AVAILABILITY_BLOCK: "/api/availability-block/{blockId}",
  },
  FEEDBACK: {
    CREATE_FEEDBACK: "/api/feedback/course/{courseId}",
    GET_TUTOR_RATING: "/api/feedback/tutor/{tutorId}/rating",
    GET_COURSE_RATING: "/api/feedback/course/{courseId}/rating",
    GET_TUTOR_FEEDBACKS: "/api/feedback/tutor/{tutorId}/feedbacks",
  },
  TRANSACTION: {
    GET_TUTOR_TRANSACTIONS: "/api/transaction/tutor",
    GET_STUDENT_TRANSACTIONS: "/api/transaction/student",
    GET_ADMIN_TRANSACTIONS: "/api/transaction/admin",
    GET_SERVICE_FEES: "/api/transaction/admin/service-fees",
  },
  CLASS_SESSION: {
    GET_STUDENT_UPCOMING_SESSIONS: "/api/class-session/student/{studentId}/upcoming",
    GET_TUTOR_UPCOMING_SESSIONS: "/api/class-session/tutor/{tutorId}/upcoming",
    GET_TUTOR_UPCOMING_SESSIONS_BY_COURSE:
      "/api/class-session/tutor/{tutorId}/course/{courseId}/upcoming",
    GET_STUDENT_SCHEDULE: "/api/class-session/student/{studentId}/schedule",
    JOIN_SESSION: "/api/class-session/{sessionId}/join",
  },
  MEETING: {
    GET_WHITEBOARD: "/api/class-session/{sessionId}/whiteboard",
    SAVE_WHITEBOARD: "/api/class-session/{sessionId}/whiteboard",
    JOIN_MEETING: "/api/class-session/{sessionId}/join",
    GET_CHAT_HISTORY: "/api/class-session/{sessionId}/chat",
    SEND_MESSAGE: "/api/class-session/{sessionId}/chat",
  },
} as const;

export const API_CONFIG = {
  BASE_URL: ENV.API.BASE_URL,
  TIMEOUT: ENV.API.TIMEOUT,
} as const;

export const PUBLIC_ENDPOINTS = [
  API_ENDPOINTS.AUTH.LOGIN,
  API_ENDPOINTS.AUTH.REGISTER,
  API_ENDPOINTS.AUTH.REFRESH,
  API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
  API_ENDPOINTS.AUTH.VERIFY_OTP,
  API_ENDPOINTS.AUTH.RESET_PASSWORD,
  API_ENDPOINTS.AUTH.CREATE_OTP,
];
