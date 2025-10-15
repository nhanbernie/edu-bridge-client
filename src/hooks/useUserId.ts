import { useTutorId } from "./useTutorId";
import { useStudentId } from "./useStudentId";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

export function useUserId(): {
  userId: string | null;
  isLoading: boolean;
  userRole: string | null;
} {
  const { tutorId, isLoading: tutorLoading } = useTutorId();
  const { studentId, isLoading: studentLoading } = useStudentId();
  const user = useSelector((state: RootState) => state.auth.user);

  // Determine user role and ID
  const userRole = user?.role || null;
  let userId: string | null = null;
  let isLoading = false;

  if (userRole === "TUTOR") {
    userId = tutorId;
    isLoading = tutorLoading;
  } else if (userRole === "STUDENT") {
    userId = studentId;
    isLoading = studentLoading;
  } else {
    // Fallback to general userId
    userId = user?.userId || null;
    isLoading = tutorLoading || studentLoading;
  }

  return {
    userId,
    isLoading,
    userRole,
  };
}
