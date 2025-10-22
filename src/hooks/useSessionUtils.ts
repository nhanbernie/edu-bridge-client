import { useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";

// Cache for expensive calculations
const durationCache = new Map<string, number>();
const dateFormatCache = new Map<string, string>();

/**
 * Hook for session-related utilities
 * Provides functions for calculating session duration and formatting dates
 */
export const useSessionUtils = () => {
  const t = useTranslations("common.sessionUtils");
  /**
   * Calculate session duration in hours from start and end time
   * @param startTime - ISO string of session start time
   * @param endTime - ISO string of session end time
   * @returns Duration in hours (e.g., 1.5 for 1 hour 30 minutes)
   */
  const calculateSessionDuration = useCallback((startTime: string, endTime: string): number => {
    const cacheKey = `${startTime}-${endTime}`;

    if (durationCache.has(cacheKey)) {
      return durationCache.get(cacheKey)!;
    }

    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffInMs = end.getTime() - start.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60); // Convert milliseconds to hours
    const result = Math.round(diffInHours * 10) / 10; // Round to 1 decimal place

    durationCache.set(cacheKey, result);
    return result;
  }, []);

  /**
   * Format date and time in localized format
   * Format: "Friday, 10/10/2025 - at 12:30"
   * @param dateString - ISO string of the date
   * @returns Formatted date string
   */
  const formatSessionDateTime = useCallback(
    (dateString: string): string => {
      if (dateFormatCache.has(dateString)) {
        return dateFormatCache.get(dateString)!;
      }

      const date = new Date(dateString);

      // Localized day names
      const dayNames = [
        t("days.sunday"),
        t("days.monday"),
        t("days.tuesday"),
        t("days.wednesday"),
        t("days.thursday"),
        t("days.friday"),
        t("days.saturday"),
      ];

      const dayName = dayNames[date.getDay()];
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      const result = t("dateTimeFormat", {
        dayName,
        day,
        month,
        year,
        hours,
        minutes,
      });
      dateFormatCache.set(dateString, result);
      return result;
    },
    [t]
  );

  /**
   * Format date only in Vietnamese format
   * Format: "10/10/2025"
   * @param dateString - ISO string of the date
   * @returns Formatted date string
   */
  const formatSessionDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  /**
   * Format time only in Vietnamese format
   * Format: "12:30"
   * @param dateString - ISO string of the date
   * @returns Formatted time string
   */
  const formatSessionTime = (dateString: string): string => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  /**
   * Get session duration text
   * @param duration - Duration in hours
   * @returns Formatted duration text
   */
  const getSessionDurationText = (duration: number): string => {
    if (duration === 1) {
      return t("duration.oneHour");
    } else if (duration < 1) {
      const minutes = Math.round(duration * 60);
      return t("duration.minutes", { count: minutes });
    } else {
      return t("duration.hours", { count: duration });
    }
  };

  /**
   * Format feedback date in Vietnamese format
   * Format: "2024-01-15" (for feedback cards)
   * @param dateString - ISO string of the date
   * @returns Formatted date string
   */
  const formatFeedbackDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return {
    calculateSessionDuration,
    formatSessionDateTime,
    formatSessionDate,
    formatSessionTime,
    getSessionDurationText,
    formatFeedbackDate,
  };
};

// Export specific hooks for different use cases
export const useSessionDuration = () => {
  const { calculateSessionDuration, getSessionDurationText } = useSessionUtils();
  return { calculateSessionDuration, getSessionDurationText };
};

export const useSessionDateFormat = () => {
  const { formatSessionDateTime, formatSessionDate, formatSessionTime } = useSessionUtils();
  return { formatSessionDateTime, formatSessionDate, formatSessionTime };
};

export default useSessionUtils;
