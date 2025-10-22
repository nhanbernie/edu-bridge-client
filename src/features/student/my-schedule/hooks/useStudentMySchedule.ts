import { useGetStudentUpcomingSessionsQuery } from "@/services/classSession";
import { useStudentId } from "@/hooks/useStudentId";
import { calculateScheduleStats } from "@/utils/scheduleStats";

export const useStudentMySchedule = () => {
  const { studentId, isLoading: studentLoading } = useStudentId();

  const {
    data: sessionsResponse,
    isLoading: isLoadingSessions,
    error: sessionsError,
    refetch: refetchSessions,
  } = useGetStudentUpcomingSessionsQuery({ studentId: studentId || "" }, { skip: !studentId });

  const sessions = sessionsResponse?.data || [];
  const isLoading = studentLoading || isLoadingSessions;

  // Calculate stats using shared utility
  const { todaySessions, thisWeekSessions } = calculateScheduleStats(sessions);

  const uniqueTutors = new Set(sessions.map((session) => session.tutorId)).size;

  return {
    // Data
    sessions,
    studentId,

    // Loading states
    isLoading,
    studentLoading,
    isLoadingSessions,

    // Error states
    sessionsError,

    // Actions
    refetchSessions,

    // Stats
    todaySessions,
    thisWeekSessions,
    uniqueTutors,
  };
};
