// Route patterns for navigation
export const ROUTES = {
  // Auth routes
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",

  // Home routes
  HOME: "/home",

  // Student routes
  STUDENT: "/student",
  STUDENT_PROFILE: "/student/profile",
  STUDENT_DASHBOARD: "/student/dashboard",
  STUDENT_MY_SCHEDULE: "/student/my-schedule",
  STUDENT_FEEDBACK: "/student/feedback",
  STUDENT_FEEDBACK_DETAIL: "/student/feedback",
  STUDENT_TUTOR_DETAIL: "/student/tutor",
  STUDENT_BOOKING: "/student/booking",
  STUDENT_BOOKING_SUCCESS: "/student/booking/success",
  STUDENT_BOOKING_CANCEL: "/student/booking/cancel",
  STUDENT_TRANSACTIONS: "/student/transactions",

  // Tutor routes
  TUTOR: "/tutor",
  TUTOR_PROFILE: "/tutor/profile",
  TUTOR_DASHBOARD: "/tutor/dashboard",
  TUTOR_COURSES: "/tutor/courses",
  TUTOR_COURSES_CREATE: "/tutor/courses/create",
  TUTOR_COURSES_EDIT: "/tutor/courses/edit",
  TUTOR_SCHEDULES: "/tutor/schedules",
  TUTOR_SCHEDULES_CREATE: "/tutor/schedules/create",
  TUTOR_MY_SCHEDULE: "/tutor/my-schedule",
  TUTOR_FEEDBACK: "/tutor/feedback",
  TUTOR_FEEDBACK_DETAIL: "/tutor/feedback",
  TUTOR_TRANSACTIONS: "/tutor/transactions",

  // Admin routes
  ADMIN: "/admin",
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_TUTOR_DETAIL: "/admin/tutor",
  ADMIN_TRANSACTIONS: "/admin/transactions",

  // Meeting routes
  MEETING: "/meeting",

  // Onboarding routes
  ONBOARDING_STUDENT: "/onboarding/student",
  ONBOARDING_TUTOR: "/onboarding/tutor",
} as const;

// Helper function to build dynamic routes
export const buildRoute = (baseRoute: string, params: Record<string, string> = {}) => {
  let route = baseRoute;
  Object.entries(params).forEach(([key, value]) => {
    route = route.replace(`{${key}}`, value);
  });
  return route;
};

// Dynamic route builders - Simple template approach
export const buildStudentTutorDetailRoute = (tutorId: string) => `/student/tutor/${tutorId}`;

export const buildStudentFeedbackDetailRoute = (courseId: string) =>
  `/student/feedback/${courseId}`;

export const buildStudentBookingRoute = (tutorId: string, courseId?: string) => {
  const baseRoute = `/student/booking/${tutorId}`;
  return courseId ? `${baseRoute}?courseId=${courseId}` : baseRoute;
};

export const buildTutorCoursesEditRoute = (courseId: string) => `/tutor/courses/edit/${courseId}`;

export const buildTutorFeedbackDetailRoute = (courseId: string) => `/tutor/feedback/${courseId}`;

export const buildAdminTutorDetailRoute = (tutorId: string) => `/admin/tutor/${tutorId}`;

export const buildMeetingRoute = (sessionId: string) => `/meeting/${sessionId}`;
