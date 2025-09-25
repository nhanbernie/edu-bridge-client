import { AvailabilityBlockDto, SlotDto } from "@/services/availability-block/type";

// EBSchedule interfaces
export interface TimeSlot {
  start: string;
  end: string;
  isBooked?: boolean;
  date?: string;
}

export interface DaySchedule {
  day: string;
  date?: string;
  timeSlots: TimeSlot[];
  isFullDay?: boolean;
}

// Utility functions
const getDayOfWeek = (dateString: string): string => {
  const date = new Date(dateString);
  const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  return dayNames[date.getDay()];
};

const formatTime = (timeString: string): string => {
  // Input: "2025-09-26 13:00" or "2025-09-26T13:00:00"
  // Output: "13:00"
  const date = new Date(timeString);
  return date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const formatDate = (dateString: string): string => {
  // Input: "2025-09-26 13:00" or "2025-09-26T13:00:00"
  // Output: "26/09"
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
  });
};

const getDateKey = (dateString: string): string => {
  // Input: "2025-09-26 13:00" or "2025-09-26T13:00:00"
  // Output: "2025-09-26"
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

/**
 * Transform availability blocks from API to EBSchedule format
 * @param availabilityBlocks - Array of availability blocks from API
 * @returns Array of DaySchedule for EBSchedule component
 */
export const transformAvailabilityBlocksToSchedule = (
  availabilityBlocks: AvailabilityBlockDto[]
): DaySchedule[] => {
  // Group slots by date
  const slotsByDate: Record<string, SlotDto[]> = {};

  availabilityBlocks.forEach((block) => {
    if (block.slots && block.slots.length > 0) {
      block.slots.forEach((slot) => {
        const dateKey = getDateKey(slot.startTime);
        if (!slotsByDate[dateKey]) {
          slotsByDate[dateKey] = [];
        }
        slotsByDate[dateKey].push(slot);
      });
    }
  });

  // Convert to DaySchedule format
  const daySchedules: DaySchedule[] = [];

  Object.entries(slotsByDate).forEach(([dateKey, slots]) => {
    const firstSlot = slots[0];
    const dayOfWeek = getDayOfWeek(firstSlot.startTime);
    const dateDisplay = formatDate(firstSlot.startTime);

    const timeSlots: TimeSlot[] = slots.map((slot) => ({
      start: formatTime(slot.startTime),
      end: formatTime(slot.endTime),
      isBooked: slot.isBooked,
      date: dateKey,
    }));

    // Sort time slots by start time
    timeSlots.sort((a, b) => a.start.localeCompare(b.start));

    daySchedules.push({
      day: dayOfWeek,
      date: dateDisplay,
      timeSlots,
      isFullDay: false,
    });
  });

  // Sort by date
  daySchedules.sort((a, b) => {
    if (a.timeSlots.length === 0 || b.timeSlots.length === 0) return 0;
    const dateA = a.timeSlots[0].date || "";
    const dateB = b.timeSlots[0].date || "";
    return dateA.localeCompare(dateB);
  });

  return daySchedules;
};

/**
 * Transform availability blocks to current week schedule
 * @param availabilityBlocks - Array of availability blocks from API
 * @returns Array of DaySchedule for current week (7 days)
 */
export const transformToCurrentWeekSchedule = (
  availabilityBlocks: AvailabilityBlockDto[]
): DaySchedule[] => {
  const allSchedules = transformAvailabilityBlocksToSchedule(availabilityBlocks);

  // Create a full week template
  const dayNames = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const currentWeek: DaySchedule[] = dayNames.map((day) => ({
    day,
    timeSlots: [],
    isFullDay: false,
  }));

  // Fill in the actual data
  allSchedules.forEach((schedule) => {
    const dayIndex = dayNames.indexOf(schedule.day);
    if (dayIndex !== -1) {
      currentWeek[dayIndex] = schedule;
    }
  });

  return currentWeek;
};

/**
 * Get summary statistics from availability blocks
 * @param availabilityBlocks - Array of availability blocks from API
 * @returns Summary object with counts
 */
export const getScheduleSummary = (availabilityBlocks: AvailabilityBlockDto[]) => {
  let totalSlots = 0;
  let bookedSlots = 0;
  let availableSlots = 0;

  availabilityBlocks.forEach((block) => {
    if (block.slots) {
      block.slots.forEach((slot) => {
        totalSlots++;
        if (slot.isBooked) {
          bookedSlots++;
        } else {
          availableSlots++;
        }
      });
    }
  });

  return {
    totalSlots,
    bookedSlots,
    availableSlots,
    totalBlocks: availabilityBlocks.length,
  };
};
