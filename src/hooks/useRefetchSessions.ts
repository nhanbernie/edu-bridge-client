import { useCallback } from "react";
import { useGetStudentHistorySessionsQuery } from "@/services/classSession/classSession.service";
import { useGetTutorHistorySessionsQuery } from "@/services/classSession/classSession.service";
import { useUserId } from "./useUserId";

export const useRefetchSessions = () => {
  const { userId, userRole } = useUserId();

  // Get refetch functions for both student and tutor
  const { refetch: refetchStudentHistory } = useGetStudentHistorySessionsQuery(
    { studentId: userId || "" },
    { skip: !userId || userRole !== "STUDENT" }
  );

  const { refetch: refetchTutorHistory } = useGetTutorHistorySessionsQuery(
    { tutorId: userId || "" },
    { skip: !userId || userRole !== "TUTOR" }
  );

  const refetchAllSessions = useCallback(async () => {
    const promises = [];

    if (userRole === "STUDENT") {
      promises.push(refetchStudentHistory());
    } else if (userRole === "TUTOR") {
      promises.push(refetchTutorHistory());
    }

    await Promise.all(promises);
  }, [userRole, refetchStudentHistory, refetchTutorHistory]);

  return {
    refetchAllSessions,
    refetchStudentHistory,
    refetchTutorHistory,
  };
};
