"use client";

import React, { useState, useMemo, useEffect } from "react";
import { EBMotionCard } from "@/components/motion/EBMotionCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar, Loader2, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { slideUpVariants } from "@/components/motion";
import type { AvailabilityBlockDto } from "@/services/availability-block/type";
import { SlotStatus } from "@/common/enums";

interface SelectedSession {
  date: Date;
  timeSlot: string;
  sessionNumber: number;
}

interface ScheduleSelectorProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  selectedBlockId: string | null;
  selectedPackage?: string | null; // Add to check if package is selected
  onDateChange: (date: Date | null) => void;
  onTimeChange: (time: string | null, blockId: string | null) => void;
  onAddSession: () => void;
  currentSessionCount: number;
  totalSessions: number;
  isDisabled: boolean;
  tutorId?: string;
  courseId?: string;
  availabilityBlocks?: AvailabilityBlockDto[];
  isLoadingAvailability?: boolean;
  selectedSessions?: SelectedSession[];
}

const ScheduleSelector: React.FC<ScheduleSelectorProps> = ({
  selectedDate,
  selectedTime,
  selectedBlockId,
  selectedPackage,
  onDateChange,
  onTimeChange,
  onAddSession,
  currentSessionCount,
  totalSessions,
  isDisabled,
  tutorId,
  courseId,
  availabilityBlocks,
  isLoadingAvailability,
  selectedSessions = [],
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const days = generateCalendarDays();
  const today = new Date();

  // Helper function to convert time string to minutes
  const timeToMinutes = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // Check if two time slots overlap
  const slotsOverlap = (
    slot1: { startMinutes: number; endMinutes: number },
    slot2: { startMinutes: number; endMinutes: number }
  ): boolean => {
    return (
      (slot1.startMinutes < slot2.endMinutes && slot1.endMinutes > slot2.startMinutes) ||
      (slot2.startMinutes < slot1.endMinutes && slot2.endMinutes > slot1.startMinutes)
    );
  };

  // Get available dates from API data
  const availableDates = useMemo(() => {
    if (!isClient || !availabilityBlocks || availabilityBlocks.length === 0) {
      return new Set<string>();
    }

    const dates = new Set<string>();
    availabilityBlocks.forEach((block) => {
      if (block.slots && block.slots.length > 0) {
        block.slots.forEach((slot) => {
          const dateStr = slot.startTime.split(/[T ]/)[0]; // Handle both formats
          dates.add(dateStr);
        });
      }
    });
    return dates;
  }, [isClient, availabilityBlocks]);

  // Transform availability blocks to time slots for selected date
  const timeSlots = useMemo(() => {
    if (!isClient || !selectedDate || !availabilityBlocks || availabilityBlocks.length === 0) {
      return [];
    }

    // Use local date string to avoid timezone issues
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const selectedDateStr = `${year}-${month}-${day}`;

    const availableSlots: {
      id: string;
      label: string;
      status: string;
      start: string;
      end: string;
      startMinutes: number;
      endMinutes: number;
      blockId: string;
    }[] = [];

    availabilityBlocks.forEach((block) => {
      if (block.slots && block.slots.length > 0) {
        block.slots.forEach((slot) => {
          // Handle both formats: "2025-09-29 08:30" and "2025-09-29T08:30:00"
          let slotDate: string;
          let startTimeForParsing: string;
          let endTimeForParsing: string;

          if (slot.startTime.includes("T")) {
            // ISO format: "2025-09-29T08:30:00"
            slotDate = slot.startTime.split("T")[0];
            startTimeForParsing = slot.startTime;
            endTimeForParsing = slot.endTime;
          } else {
            // Space format: "2025-09-29 08:30"
            slotDate = slot.startTime.split(" ")[0];
            startTimeForParsing = slot.startTime.replace(" ", "T") + ":00";
            endTimeForParsing = slot.endTime.replace(" ", "T") + ":00";
          }

          if (slotDate === selectedDateStr) {
            // Use consistent time formatting to avoid hydration issues
            const startDate = new Date(startTimeForParsing);
            const endDate = new Date(endTimeForParsing);

            const startTime = `${String(startDate.getHours()).padStart(2, "0")}:${String(startDate.getMinutes()).padStart(2, "0")}`;
            const endTime = `${String(endDate.getHours()).padStart(2, "0")}:${String(endDate.getMinutes()).padStart(2, "0")}`;

            // Convert time to minutes for overlap calculation
            const startMinutes = timeToMinutes(startTime);
            const endMinutes = timeToMinutes(endTime);

            availableSlots.push({
              id: `${startTime}-${endTime}`,
              label: `${startTime} - ${endTime}`,
              status: slot.status,
              start: startTime,
              end: endTime,
              startMinutes,
              endMinutes,
              blockId: block.blockId, // Add blockId to slot data
            });
          }
        });
      }
    });

    // Sort by start time
    return availableSlots.sort((a, b) => a.startMinutes - b.startMinutes);
  }, [isClient, selectedDate, availabilityBlocks]);

  // Get slots that should be disabled due to conflicts with selected sessions
  const disabledSlots = useMemo(() => {
    if (!isClient || !selectedDate) return new Set<string>();

    const selectedDateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;

    // Get selected sessions for current date
    const selectedSessionsForDate = selectedSessions.filter((session: SelectedSession) => {
      const sessionDateStr = `${session.date.getFullYear()}-${String(session.date.getMonth() + 1).padStart(2, "0")}-${String(session.date.getDate()).padStart(2, "0")}`;
      return sessionDateStr === selectedDateStr;
    });

    const disabledSlotIds = new Set<string>();

    // For each selected session, find overlapping slots
    selectedSessionsForDate.forEach((session: SelectedSession) => {
      const selectedSlot = timeSlots.find((slot) => slot.id === session.timeSlot);
      if (selectedSlot) {
        timeSlots.forEach((slot) => {
          if (slot.id !== selectedSlot.id && slotsOverlap(selectedSlot, slot)) {
            disabledSlotIds.add(slot.id);
          }
        });
      }
    });

    return disabledSlotIds;
  }, [isClient, selectedDate, selectedSessions, timeSlots]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const navigateMonth = (direction: number) => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const isDateDisabled = (date: Date) => {
    // Normalize date to start of day for proper comparison
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);

    const todayStart = new Date(today);
    todayStart.setHours(0, 0, 0, 0);

    // Only disable dates before today (past dates)
    return checkDate < todayStart;
  };

  const isDateSelected = (date: Date) => {
    return (
      selectedDate &&
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  return (
    <EBMotionCard
      className={cn("bg-card text-card-foreground", isDisabled && "opacity-50 pointer-events-none")}
      variants={slideUpVariants}
    >
      <div className="pb-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <Calendar className="w-5 h-5" />
          Chọn lịch học ({currentSessionCount}/{totalSessions} buổi)
        </h3>
        <div className="flex justify-between items-center text-sm mt-2">
          <span className="text-muted-foreground">Chọn ngày học</span>
          <span className="text-muted-foreground">Chọn giờ học</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Calendar */}
        <div>
          {/* Month EBNavigation */}
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth(-1)}
              className="text-foreground hover:bg-muted"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h3 className="font-semibold text-foreground">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth(1)}
              className="text-foreground hover:bg-muted"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-xs text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => {
              const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
              const isDisabled = isDateDisabled(date);
              const isSelected = isDateSelected(date);
              // Use same date formatting logic as timeSlots
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, "0");
              const day = String(date.getDate()).padStart(2, "0");
              const dateStr = `${year}-${month}-${day}`;
              const hasAvailableSlots = availableDates.has(dateStr);

              return (
                <button
                  key={index}
                  onClick={() => {
                    if (isDisabled) return;
                    onDateChange(date);
                  }}
                  disabled={isDisabled}
                  className={cn(
                    "aspect-square text-sm rounded-lg transition-colors relative",
                    isCurrentMonth ? "text-foreground" : "text-muted-foreground",
                    isDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-muted",
                    isSelected ? "bg-primary text-primary-foreground" : "",
                    hasAvailableSlots && !isSelected
                      ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400"
                      : "",
                    date.getDate() === today.getDate() &&
                      date.getMonth() === today.getMonth() &&
                      date.getFullYear() === today.getFullYear()
                      ? "ring-1 ring-primary"
                      : ""
                  )}
                >
                  {date.getDate()}
                  {hasAvailableSlots && !isSelected && (
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Available Days */}
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">
              Ngày có lịch rảnh ({availableDates.size} ngày):
            </p>
            <div className="flex flex-wrap gap-2">
              {isClient &&
                Array.from(availableDates)
                  .slice(0, 10)
                  .map((dateStr) => {
                    // Parse date string manually to avoid timezone issues
                    const [year, month, day] = dateStr.split("-").map(Number);
                    const date = new Date(year, month - 1, day); // month is 0-indexed
                    const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
                    const dayName = dayNames[date.getDay()];
                    const displayDate = `${day}/${month}`;

                    return (
                      <span
                        key={dateStr}
                        className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded border border-green-200 dark:border-green-800"
                      >
                        {dayName} {displayDate}
                      </span>
                    );
                  })}
              {availableDates.size > 10 && (
                <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded">
                  +{availableDates.size - 10} ngày khác
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Time Selection */}
        <div>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-foreground">
                Chọn giờ học {selectedDate && `(${timeSlots.length} khung giờ)`}
              </h4>
              <Button
                onClick={onAddSession}
                disabled={!selectedDate || !selectedTime || isDisabled}
                className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground"
                size="sm"
              >
                Thêm buổi học
              </Button>
            </div>
            {selectedDate && (
              <div className="text-sm text-muted-foreground mb-3">
                Thứ {selectedDate.getDay() === 0 ? "CN" : selectedDate.getDay() + 1},{" "}
                {selectedDate.getDate()} tháng {selectedDate.getMonth() + 1},{" "}
                {selectedDate.getFullYear()}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {isLoadingAvailability ? (
              <div className="col-span-2 flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span className="ml-2">Đang tải lịch rảnh...</span>
              </div>
            ) : timeSlots.length === 0 ? (
              <div className="col-span-2 text-center py-8">
                <Clock className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-muted-foreground">
                  {selectedDate
                    ? "Không có lịch rảnh cho ngày này"
                    : "Vui lòng chọn ngày để xem lịch rảnh"}
                </p>
              </div>
            ) : (
              timeSlots.map((slot) => {
                const isConflicted = disabledSlots.has(slot.id);
                const isAlreadySelected = selectedSessions.some(
                  (session) =>
                    session.timeSlot === slot.id &&
                    session.date.toDateString() === selectedDate?.toDateString()
                );
                const isBooked = slot.status === SlotStatus.BOOKED;
                const isReserved = slot.status === SlotStatus.RESERVED;
                const isAvailable = slot.status === SlotStatus.AVAILABLE;
                const isDisabledSlot = !selectedDate || isBooked || isReserved || isConflicted;

                return (
                  <button
                    key={slot.id}
                    onClick={() => !isDisabledSlot && onTimeChange(slot.id, slot.blockId)}
                    disabled={isDisabledSlot}
                    className={cn(
                      "py-3 px-3 text-sm rounded-lg border transition-colors text-center relative",
                      !selectedDate
                        ? "cursor-not-allowed opacity-50 border-border text-muted-foreground"
                        : isBooked
                          ? "cursor-not-allowed opacity-50 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 text-red-400 dark:text-red-300"
                          : isReserved
                            ? "cursor-not-allowed opacity-50 border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-400 dark:text-yellow-300"
                            : isConflicted
                              ? "cursor-not-allowed opacity-50 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20 text-orange-400 dark:text-orange-300"
                              : isAlreadySelected
                                ? "bg-green-100 dark:bg-green-900/20 border-green-300 dark:border-green-700 text-green-700 dark:text-green-400"
                                : selectedTime === slot.id
                                  ? "bg-primary border-primary text-primary-foreground"
                                  : "border-border text-foreground hover:border-primary hover:bg-muted"
                    )}
                  >
                    {slot.label}
                    {isBooked && (
                      <span className="absolute top-1 right-1 text-xs text-red-500 dark:text-red-400">
                        Đã đặt
                      </span>
                    )}
                    {isReserved && (
                      <span className="absolute top-1 right-1 text-xs text-yellow-500 dark:text-yellow-400">
                        Đang giữ
                      </span>
                    )}
                    {isConflicted && isAvailable && (
                      <span className="absolute top-1 right-1 text-xs text-orange-500 dark:text-orange-400">
                        Trùng
                      </span>
                    )}
                    {isAlreadySelected && (
                      <span className="absolute top-1 right-1 text-xs text-green-600 dark:text-green-400">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>
    </EBMotionCard>
  );
};

export default ScheduleSelector;
