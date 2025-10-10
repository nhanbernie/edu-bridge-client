import { useMemo } from "react";

/**
 * Hook for session-related utilities
 * Provides functions for calculating session duration and formatting dates
 */
export const useSessionUtils = () => {
  /**
   * Calculate session duration in hours from start and end time
   * @param startTime - ISO string of session start time
   * @param endTime - ISO string of session end time
   * @returns Duration in hours (e.g., 1.5 for 1 hour 30 minutes)
   */
  const calculateSessionDuration = (startTime: string, endTime: string): number => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diffInMs = end.getTime() - start.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60); // Convert milliseconds to hours
    return Math.round(diffInHours * 10) / 10; // Round to 1 decimal place
  };

  /**
   * Format date and time in Vietnamese format
   * Format: "Thứ Sáu, 10/10/2025 - lúc 12:30"
   * @param dateString - ISO string of the date
   * @returns Formatted date string
   */
  const formatSessionDateTime = (dateString: string): string => {
    const date = new Date(dateString);

    // Vietnamese day names
    const dayNames = ["Chủ nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];

    const dayName = dayNames[date.getDay()];
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${dayName}, ${day}/${month}/${year} - lúc ${hours}:${minutes}`;
  };

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
      return "1 giờ";
    } else if (duration < 1) {
      const minutes = Math.round(duration * 60);
      return `${minutes} phút`;
    } else {
      return `${duration} giờ`;
    }
  };

  return {
    calculateSessionDuration,
    formatSessionDateTime,
    formatSessionDate,
    formatSessionTime,
    getSessionDurationText,
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
