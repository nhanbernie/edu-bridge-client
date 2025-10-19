import { useMemo } from "react";
import { useTutorMySchedule } from "@/features/tutor/my-schedule/hooks/useTutorMySchedule";

export const useScheduleData = () => {
  const { sessions, isLoading, sessionsError } = useTutorMySchedule();

  // Get all upcoming sessions (for testing, show all sessions)
  const todaySessions = useMemo(() => {
    return sessions
      .filter((session) => !session.isCompleted)
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  }, [sessions]);

  // Convert sessions to display format with colors
  const scheduleItems = useMemo(() => {
    if (!todaySessions.length) return [];

    const colors = [
      {
        bg: "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
        text: "text-green-600",
        status: "Sắp tới",
      },
      {
        bg: "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
        text: "text-green-600",
        status: "Sắp tới",
      },
      {
        bg: "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
        text: "text-green-600",
        status: "Sắp tới",
      },
      {
        bg: "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
        text: "text-green-600",
        status: "Sắp tới",
      },
    ];

    return todaySessions.slice(0, 4).map((session, index) => {
      const colorConfig = colors[index % colors.length];

      // Format time
      const startTime = new Date(session.startTime);
      const timeString = startTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      // Always show "Sắp tới" status
      const status = "Sắp tới";

      return {
        id: session.sessionId,
        title: session.courseTitle || "Tutoring Session",
        student: session.studentName || "Student",
        time: timeString,
        status,
        colorConfig: {
          ...colorConfig,
          status,
        },
      };
    });
  }, [todaySessions]);

  return {
    scheduleItems,
    isLoading,
    sessionsError,
    hasSessions: todaySessions.length > 0,
  };
};
