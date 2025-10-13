// Update User Profile Request
export interface UpdateUserProfileRequest {
  userId: string;
  fullName?: string;
  tutor?: {
    educationLevel?: string;
    yearsOfExperience?: number;
    bio?: string;
    subjects?: string[];
    languages?: string[];
    location?: string;
    phone?: string;
  };
  student?: {
    grade?: string;
    learningGoal?: string;
    location?: string;
    phone?: string;
  };
}

// Update User Profile Response
export interface UpdateUserProfileResponse {
  success: boolean;
  data?: {
    userId: string;
    avatarUrl?: string;
    email: string;
    role: string;
    fullName: string;
    phone?: string;
    location?: string;
    status: string;
    tutor?: {
      tutorId: string;
      educationLevel: string;
      yearsOfExperience: number;
      bio: string;
      subjects: string[];
      languages: string[];
      currency: string;
      verifiedStatus: string;
      isBankAccountVerified: boolean;
      totalStudents: number;
      totalCourses: number;
      totalFeedbacks: number;
      averageTutorRating: number;
    };
    student?: {
      grade: string;
      learningGoal: string;
      location: string;
      phone: string;
    } | null;
  };
  message?: string;
  errors?: string[] | null;
}
// NOTEJ: DTO USER USERDTO
