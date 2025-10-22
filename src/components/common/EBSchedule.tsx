"use client";

import React, { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
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
  status?: string; // AVAILABLE/BOOKED/RESERVED
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
  title,
  showHeader = true,
  showDate = false,
  mode = "week",
  showNavigation = true,
  onDateChange,
  onSlotClick,
}) => {
  const t = useTranslations("components.ebSchedule");
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
      // Map to day names using i18n
      const dayNames = [
        t("dayNames.sunday"),
        t("dayNames.monday"),
        t("dayNames.tuesday"),
        t("dayNames.wednesday"),
        t("dayNames.thursday"),
        t("dayNames.friday"),
        t("dayNames.saturday"),
      ];
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
  }, [dateRange, currentDate, t]);

  const schedule = scheduleData || [];

  const getTimeSlotStyle = (slot: TimeSlot) => {
    if (slot.status === "BOOKED") {
      return "bg-gradient-to-r from-red-100 to-red-50 dark:from-red-900/20 dark:to-red-800/10 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800 shadow-sm";
    } else if (slot.status === "RESERVED") {
      return "bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-900/20 dark:to-yellow-800/10 text-yellow-800 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800 shadow-sm";
    }
    return "bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/20 dark:to-green-800/10 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800 shadow-sm";
  };

  const handleSlotClick = (slot: TimeSlot, day: DaySchedule) => {
    onSlotClick?.(slot, day);
  };

  const renderWeekMode = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2 sm:gap-3 md:gap-4">
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
              className={`text-center p-3 sm:p-4 rounded-xl transition-all duration-200 ${
                dayInfo.isToday
                  ? "bg-primary/5 border-2 border-primary/20 shadow-sm"
                  : "bg-card/50 border border-border/50 hover:bg-card/80 hover:border-border shadow-sm"
              }`}
            >
              <div
                className={`font-semibold mb-2 text-base sm:text-lg ${
                  dayInfo.isToday ? "text-primary" : "text-foreground"
                }`}
              >
                {dayInfo.dayName}
              </div>
              {showDate && (
                <div
                  className={`text-sm mb-3 font-medium ${
                    dayInfo.isCurrentMonth ? "text-muted-foreground" : "text-muted-foreground/50"
                  }`}
                >
                  {dayInfo.dayNumber}
                </div>
              )}
              <div className="space-y-2">
                {finalDayData.isFullDay ? (
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 text-primary text-sm font-medium px-3 py-2 rounded-lg border border-primary/20 shadow-sm">
                    {t("fullDay")}
                  </div>
                ) : finalDayData.timeSlots.length === 0 ? (
                  <div className="text-muted-foreground/60 text-sm px-3 py-2 bg-muted/30 rounded-lg">
                    {t("noSchedule")}
                  </div>
                ) : (
                  finalDayData.timeSlots.map((slot, index) => (
                    <div
                      key={index}
                      className={`text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-sm ${getTimeSlotStyle(slot)}`}
                      title={
                        slot.status === "BOOKED"
                          ? t("slotStatus.booked")
                          : slot.status === "RESERVED"
                            ? t("slotStatus.reserved")
                            : t("slotStatus.available")
                      }
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
          <div
            key={dayData.day}
            className="bg-card/50 border border-border/50 rounded-xl p-4 hover:bg-card/80 hover:border-border transition-all duration-200 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="font-semibold text-base text-foreground">{dayData.day}</div>
              {showDate && dayData.date && (
                <div className="text-sm text-muted-foreground bg-muted/30 px-2 py-1 rounded-lg">
                  {dayData.date}
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {dayData.isFullDay ? (
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 text-primary text-sm font-medium px-3 py-2 rounded-lg border border-primary/20 shadow-sm">
                  {t("fullDay")}
                </div>
              ) : (
                dayData.timeSlots.map((slot, index) => (
                  <div
                    key={index}
                    className={`text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-sm ${getTimeSlotStyle(slot)}`}
                    title={
                      slot.status === "BOOKED"
                        ? "Đã có lịch dạy"
                        : slot.status === "RESERVED"
                          ? "Đang được giữ"
                          : "Lịch rảnh"
                    }
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
    <div className="space-y-3">
      <div className="grid grid-cols-7 gap-2 mb-3">
        {[
          t("dayNames.monday"),
          t("dayNames.tuesday"),
          t("dayNames.wednesday"),
          t("dayNames.thursday"),
          t("dayNames.friday"),
          t("dayNames.saturday"),
          t("dayNames.sunday"),
        ].map((day) => (
          <div
            key={day}
            className="text-center font-semibold text-sm text-muted-foreground py-2 bg-muted/30 rounded-lg"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
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
              className={`min-h-[80px] sm:min-h-[100px] p-2 sm:p-3 border rounded-xl transition-all duration-200 ${
                dayInfo.isToday
                  ? "bg-primary/5 border-2 border-primary/20 shadow-sm"
                  : dayInfo.isCurrentMonth
                    ? "bg-card/50 border-border/50 hover:bg-card/80 hover:border-border"
                    : "bg-muted/30 border-border/30"
              }`}
            >
              <div
                className={`text-sm sm:text-base font-semibold mb-2 ${
                  dayInfo.isToday
                    ? "text-primary"
                    : dayInfo.isCurrentMonth
                      ? "text-foreground"
                      : "text-muted-foreground"
                }`}
              >
                {dayInfo.dayNumber}
              </div>
              <div className="space-y-1">
                {finalDayData.isFullDay ? (
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 text-primary text-xs font-medium px-2 py-1 rounded-lg border border-primary/20 shadow-sm">
                    {t("fullDay")}
                  </div>
                ) : finalDayData.timeSlots.length > 0 ? (
                  finalDayData.timeSlots.slice(0, 2).map((slot, index) => (
                    <div
                      key={index}
                      className={`text-xs font-medium px-2 py-1 rounded-lg transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-sm ${getTimeSlotStyle(slot)}`}
                      title={
                        slot.status === "BOOKED"
                          ? t("slotStatus.booked")
                          : slot.status === "RESERVED"
                            ? t("slotStatus.reserved")
                            : t("slotStatus.available")
                      }
                      onClick={() => handleSlotClick(slot, finalDayData)}
                    >
                      {slot.start}-{slot.end}
                    </div>
                  ))
                ) : null}
                {finalDayData.timeSlots.length > 2 && (
                  <div className="text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded-lg font-medium">
                    {t("moreSlots", { count: finalDayData.timeSlots.length - 2 })}
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
            <div className="text-lg font-semibold text-center sm:text-left text-foreground">
              {format(currentDate, "MMMM yyyy", { locale: vi })}
            </div>
          </div>
        )}
        {content}
      </div>
    );
  }

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            {title || t("title")}
          </CardTitle>
          {showNavigation && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                className="hover:bg-primary/10 hover:border-primary/20 transition-all duration-200"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                className="hover:bg-primary/10 hover:border-primary/20 transition-all duration-200"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        {showNavigation && (
          <div className="text-lg font-semibold text-foreground text-center sm:text-left mt-3 bg-muted/30 px-4 py-2 rounded-lg">
            {format(currentDate, "MMMM yyyy", { locale: vi })}
          </div>
        )}
      </CardHeader>
      <CardContent className="pt-0">{content}</CardContent>
    </Card>
  );
};

export default EBSchedule;
