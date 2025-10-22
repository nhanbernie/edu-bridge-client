import { AvailabilityBlockDto, SlotDto } from "@/services/availability-block/type";

// EBSchedule interfaces
export interface TimeSlot {
  start: string;
  end: string;
  status?: string; // AVAILABLE/BOOKED/RESERVED
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
      status: slot.status,
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
 * @param currentDate - The date to determine which week to show
 * @returns Array of DaySchedule for current week (7 days)
 */
export const transformToCurrentWeekSchedule = (
  availabilityBlocks: AvailabilityBlockDto[],
  currentDate: Date = new Date()
): DaySchedule[] => {
  // Group slots by date
  const slotsByDate: Record<string, SlotDto[]> = {};

  availabilityBlocks.forEach((block) => {
    if (block.slots && block.slots.length > 0) {
      block.slots.forEach((slot) => {
        // Extract date from startTime (format: "2025-10-09 17:00")
        const dateKey = slot.startTime.split(" ")[0]; // Get "2025-10-09"

        if (!slotsByDate[dateKey]) {
          slotsByDate[dateKey] = [];
        }
        slotsByDate[dateKey].push(slot);
      });
    }
  });

  // Create week template with actual dates
  const dayNames = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const currentWeek: DaySchedule[] = [];

  // Get week for the specified date (Monday to Sunday)
  const currentDay = currentDate.getDay();
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;

  const weekStart = new Date(currentDate);
  weekStart.setDate(currentDate.getDate() + mondayOffset);

  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    const dateKey = date.toISOString().split("T")[0];

    const timeSlots: TimeSlot[] = [];
    if (slotsByDate[dateKey]) {
      slotsByDate[dateKey].forEach((slot) => {
        timeSlots.push({
          start: formatTime(slot.startTime),
          end: formatTime(slot.endTime),
          status: slot.status,
          date: dateKey,
        });
      });

      // Sort by start time
      timeSlots.sort((a, b) => a.start.localeCompare(b.start));
    }

    currentWeek.push({
      day: dayNames[i],
      date: dateKey,
      timeSlots,
      isFullDay: false,
    });
  }

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
        if (slot.status === "BOOKED") {
          bookedSlots++;
        } else if (slot.status === "AVAILABLE") {
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
