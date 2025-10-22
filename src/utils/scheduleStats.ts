import { ClassSessionDto } from "@/services/classSession/type";

export const calculateScheduleStats = (sessions: ClassSessionDto[]) => {
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

  // Get start of week (Monday)
  const startOfWeek = new Date(today);
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  startOfWeek.setDate(diff);
  startOfWeek.setHours(0, 0, 0, 0);

  // Get end of week (Sunday)
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const todaySessions = sessions.filter((session) => {
    const sessionDate = new Date(session.startTime);
    return sessionDate >= todayStart && sessionDate < todayEnd;
  }).length;

  const thisWeekSessions = sessions.filter((session) => {
    const sessionDate = new Date(session.startTime);
    return sessionDate >= startOfWeek && sessionDate <= endOfWeek;
  }).length;

  return {
    todaySessions,
    thisWeekSessions,
  };
};
