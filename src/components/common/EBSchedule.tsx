"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  isSameMonth,
  isToday,
  format,
  eachDayOfInterval,
} from "date-fns";
import { vi } from "date-fns/locale";

interface TimeSlot {
  start: string;
  end: string;
  isBooked?: boolean;
  date?: string;
}

interface DaySchedule {
  day: string;
  date?: string;
  timeSlots: TimeSlot[];
  isFullDay?: boolean;
}

interface EBScheduleProps {
  scheduleData?: DaySchedule[];
  title?: string;
  showHeader?: boolean;
  showDate?: boolean;
  mode?: "week" | "month" | "list";
  showNavigation?: boolean;
  onDateChange?: (date: Date) => void;
  onSlotClick?: (slot: TimeSlot, day: DaySchedule) => void;
}

const EBSchedule: React.FC<EBScheduleProps> = ({
  scheduleData,
  title = "Lịch rảnh trong tuần",
  showHeader = true,
  showDate = false,
  mode = "week",
  showNavigation = true,
  onDateChange,
  onSlotClick,
}) => {
  // State for current date navigation
  const [currentDate, setCurrentDate] = useState(new Date());

  // Navigation handlers
  const handlePrevious = () => {
    const newDate = mode === "month" ? subMonths(currentDate, 1) : subWeeks(currentDate, 1);
    setCurrentDate(newDate);
    onDateChange?.(newDate);
  };

  const handleNext = () => {
    const newDate = mode === "month" ? addMonths(currentDate, 1) : addWeeks(currentDate, 1);
    setCurrentDate(newDate);
    onDateChange?.(newDate);
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    onDateChange?.(today);
  };

  // Calculate date ranges based on mode
  const dateRange = useMemo(() => {
    if (mode === "month") {
      const monthStart = startOfMonth(currentDate);
      const monthEnd = endOfMonth(currentDate);
      const weekStart = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday
      const weekEnd = endOfWeek(monthEnd, { weekStartsOn: 1 }); // Monday
      return { start: weekStart, end: weekEnd };
    } else {
      const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Monday
      const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 }); // Monday
      return { start: weekStart, end: weekEnd };
    }
  }, [currentDate, mode]);

  // Generate days for display
  const displayDays = useMemo(() => {
    const days = eachDayOfInterval(dateRange);
    return days.map((date) => {
      // Map to Vietnamese day names to match scheduleTransform format
      const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
      const dayIndex = date.getDay();
      const dayName = dayNames[dayIndex];

      return {
        date,
        dayName,
        dayNumber: format(date, "d"),
        isToday: isToday(date),
        isCurrentMonth: isSameMonth(date, currentDate),
      };
    });
  }, [dateRange, currentDate]);

  const schedule = scheduleData || [];

  const getTimeSlotStyle = (slot: TimeSlot) => {
    if (slot.isBooked) {
      return "bg-orange-100 text-orange-800 border border-orange-200";
    }
    return "bg-green-100 text-green-800 border border-green-200";
  };

  const handleSlotClick = (slot: TimeSlot, day: DaySchedule) => {
    onSlotClick?.(slot, day);
  };

  const renderWeekMode = () => {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-7 gap-2 sm:gap-4">
        {displayDays.map((dayInfo) => {
          // Find matching schedule data for this specific date
          const dayData = schedule.find((s) => {
            // Check if any timeSlot matches this specific date
            return s.timeSlots.some((slot) => {
              if (!slot.date) return false;
              const slotDate = new Date(slot.date);
              return slotDate.toDateString() === dayInfo.date.toDateString();
            });
          });

          // If no exact date match, create empty day data
          const finalDayData = dayData || {
            day: dayInfo.dayName,
            timeSlots: [],
            isFullDay: false,
          };

          return (
            <div key={dayInfo.date.toISOString()} className="text-center">
              <div
                className={`font-medium mb-1 text-sm ${dayInfo.isToday ? "text-blue-600 font-bold" : ""}`}
              >
                {dayInfo.dayName}
              </div>
              {showDate && (
                <div
                  className={`text-xs mb-2 ${dayInfo.isCurrentMonth ? "text-muted-foreground" : "text-gray-300"}`}
                >
                  {dayInfo.dayNumber}
                </div>
              )}
              <div className="space-y-1">
                {finalDayData.isFullDay ? (
                  <div className="bg-blue-100 text-blue-800 text-xs p-1 rounded border border-blue-200">
                    Cả ngày
                  </div>
                ) : finalDayData.timeSlots.length === 0 ? (
                  <div className="text-gray-400 text-xs p-1">Không có lịch</div>
                ) : (
                  finalDayData.timeSlots.map((slot, index) => (
                    <div
                      key={index}
                      className={`text-xs p-1 rounded transition-colors cursor-pointer hover:opacity-80 ${getTimeSlotStyle(slot)}`}
                      title={slot.isBooked ? "Đã có lịch dạy" : "Lịch rảnh"}
                      onClick={() => handleSlotClick(slot, finalDayData)}
                    >
                      {slot.start}-{slot.end}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderListMode = () => (
    <div className="space-y-4">
      {schedule
        .filter((dayData) => dayData.timeSlots.length > 0 || dayData.isFullDay)
        .map((dayData) => (
          <div key={dayData.day} className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="font-medium text-sm">{dayData.day}</div>
              {showDate && dayData.date && (
                <div className="text-xs text-muted-foreground">({dayData.date})</div>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {dayData.isFullDay ? (
                <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded border border-blue-200">
                  Cả ngày
                </div>
              ) : (
                dayData.timeSlots.map((slot, index) => (
                  <div
                    key={index}
                    className={`text-xs px-2 py-1 rounded transition-colors cursor-pointer hover:opacity-80 ${getTimeSlotStyle(slot)}`}
                    title={slot.isBooked ? "Đã có lịch dạy" : "Lịch rảnh"}
                    onClick={() => handleSlotClick(slot, dayData)}
                  >
                    {slot.start}-{slot.end}
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
    </div>
  );

  const renderMonthMode = () => (
    <div className="space-y-2">
      {/* Month header */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
        {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => (
          <div
            key={day}
            className="text-center font-medium text-xs sm:text-sm text-gray-600 py-1 sm:py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Month grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {displayDays.map((dayInfo) => {
          // Find matching schedule data for this specific date
          const dayData = schedule.find((s) => {
            // Check if any timeSlot matches this specific date
            return s.timeSlots.some((slot) => {
              if (!slot.date) return false;
              const slotDate = new Date(slot.date);
              return slotDate.toDateString() === dayInfo.date.toDateString();
            });
          });

          // If no exact date match, create empty day data
          const finalDayData = dayData || {
            day: dayInfo.dayName,
            timeSlots: [],
            isFullDay: false,
          };

          return (
            <div
              key={dayInfo.date.toISOString()}
              className={`min-h-[60px] sm:min-h-[80px] p-1 sm:p-2 border rounded-lg ${
                dayInfo.isToday
                  ? "bg-blue-50 border-blue-200"
                  : dayInfo.isCurrentMonth
                    ? "bg-white border-gray-200"
                    : "bg-gray-50 border-gray-100"
              }`}
            >
              <div
                className={`text-xs sm:text-sm font-medium mb-1 ${
                  dayInfo.isToday
                    ? "text-blue-600"
                    : dayInfo.isCurrentMonth
                      ? "text-gray-900"
                      : "text-gray-400"
                }`}
              >
                {dayInfo.dayNumber}
              </div>
              <div className="space-y-1">
                {finalDayData.isFullDay ? (
                  <div className="bg-blue-100 text-blue-800 text-xs p-1 rounded border border-blue-200">
                    Cả ngày
                  </div>
                ) : finalDayData.timeSlots.length > 0 ? (
                  finalDayData.timeSlots.slice(0, 2).map((slot, index) => (
                    <div
                      key={index}
                      className={`text-xs p-1 rounded transition-colors cursor-pointer hover:opacity-80 ${getTimeSlotStyle(slot)}`}
                      title={slot.isBooked ? "Đã có lịch dạy" : "Lịch rảnh"}
                      onClick={() => handleSlotClick(slot, finalDayData)}
                    >
                      {slot.start}-{slot.end}
                    </div>
                  ))
                ) : null}
                {finalDayData.timeSlots.length > 2 && (
                  <div className="text-xs text-gray-500">
                    +{finalDayData.timeSlots.length - 2} khác
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (mode) {
      case "month":
        return renderMonthMode();
      case "list":
        return renderListMode();
      default:
        return renderWeekMode();
    }
  };

  const content = renderContent();

  if (!showHeader) {
    return (
      <div>
        {showNavigation && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handlePrevious}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-lg font-semibold text-center sm:text-left">
              {format(currentDate, "MMMM yyyy", { locale: vi })}
            </div>
          </div>
        )}
        {content}
      </div>
    );
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {title}
          </CardTitle>
          {showNavigation && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handlePrevious}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        {showNavigation && (
          <div className="text-lg font-semibold text-gray-700 text-center sm:text-left mt-2">
            {format(currentDate, "MMMM yyyy", { locale: vi })}
          </div>
        )}
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
};

export default EBSchedule;
