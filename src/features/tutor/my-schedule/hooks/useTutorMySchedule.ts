import { useGetTutorUpcomingSessionsQuery } from "@/services/classSession";
import { useTutorId } from "@/hooks/useTutorId";
import { calculateScheduleStats } from "@/utils/scheduleStats";

export const useTutorMySchedule = () => {
  const { tutorId, isLoading: tutorLoading } = useTutorId();

  const {
    data: sessionsResponse,
    isLoading: isLoadingSessions,
    error: sessionsError,
    refetch: refetchSessions,
  } = useGetTutorUpcomingSessionsQuery({ tutorId: tutorId || "" }, { skip: !tutorId });

  const sessions = sessionsResponse?.data || [];
  const isLoading = tutorLoading || isLoadingSessions;

  // Calculate stats using shared utility
  const { todaySessions, thisWeekSessions } = calculateScheduleStats(sessions);

  const uniqueStudents = new Set(sessions.map((session) => session.studentId)).size;

  return {
    // Data
    sessions,
    tutorId,

    // Loading states
    isLoading,
    tutorLoading,
    isLoadingSessions,

    // Error states
    sessionsError,

    // Actions
    refetchSessions,

    // Stats
    todaySessions,
    thisWeekSessions,
    uniqueStudents,
  };
};
