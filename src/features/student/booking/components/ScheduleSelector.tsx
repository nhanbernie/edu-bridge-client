"use client";

import React, { useState } from "react";
import { MotionCard } from "@/components/motion/MotionCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { slideUpVariants } from "@/components/motion";

interface ScheduleSelectorProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  onDateChange: (date: Date | null) => void;
  onTimeChange: (time: string | null) => void;
}

const ScheduleSelector: React.FC<ScheduleSelectorProps> = ({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

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

  // Available time slots with ranges
  const timeSlots = [
    { id: "08:00-10:00", label: "08:00 - 10:00", start: "08:00", end: "10:00" },
    { id: "09:00-11:00", label: "09:00 - 11:00", start: "09:00", end: "11:00" },
    { id: "10:00-12:00", label: "10:00 - 12:00", start: "10:00", end: "12:00" },
    { id: "14:00-16:00", label: "14:00 - 16:00", start: "14:00", end: "16:00" },
    { id: "15:00-17:00", label: "15:00 - 17:00", start: "15:00", end: "17:00" },
    { id: "16:00-18:00", label: "16:00 - 18:00", start: "16:00", end: "18:00" },
    { id: "17:00-19:00", label: "17:00 - 19:00", start: "17:00", end: "19:00" },
    { id: "18:00-20:00", label: "18:00 - 20:00", start: "18:00", end: "20:00" },
    { id: "19:00-21:00", label: "19:00 - 21:00", start: "19:00", end: "21:00" },
    { id: "20:00-22:00", label: "20:00 - 22:00", start: "20:00", end: "22:00" },
  ];

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
    return date < today || date.getDay() === 0; // Disable past dates and Sundays
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
    <MotionCard className="bg-card text-card-foreground" variants={slideUpVariants}>
      <div className="pb-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <Calendar className="w-5 h-5" />
          Chọn lịch học (3/4 buổi)
        </h3>
        <div className="flex justify-between items-center text-sm mt-2">
          <span className="text-muted-foreground">Chọn ngày học</span>
          <span className="text-muted-foreground">Chọn giờ học</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Calendar */}
        <div>
          {/* Month Navigation */}
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

              return (
                <button
                  key={index}
                  onClick={() => !isDisabled && onDateChange(date)}
                  disabled={isDisabled}
                  className={cn(
                    "aspect-square text-sm rounded-lg transition-colors",
                    isCurrentMonth ? "text-foreground" : "text-muted-foreground",
                    isDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-muted",
                    isSelected ? "bg-primary text-primary-foreground" : "",
                    date.getDate() === today.getDate() &&
                      date.getMonth() === today.getMonth() &&
                      date.getFullYear() === today.getFullYear()
                      ? "ring-1 ring-primary"
                      : ""
                  )}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          {/* Available Days */}
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">Ngày có thể học:</p>
            <div className="flex flex-wrap gap-2">
              {["Monday", "Wednesday", "Friday", "Saturday", "Sunday"].map((day) => (
                <span
                  key={day}
                  className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded"
                >
                  {day}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Time Selection */}
        <div>
          <div className="mb-4">
            <h4 className="font-medium text-foreground mb-2">Chọn giờ học</h4>
            {selectedDate && (
              <div className="text-sm text-muted-foreground mb-3">
                Thứ {selectedDate.getDay() === 0 ? "CN" : selectedDate.getDay() + 1},{" "}
                {selectedDate.getDate()} tháng {selectedDate.getMonth() + 1},{" "}
                {selectedDate.getFullYear()}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => onTimeChange(slot.id)}
                disabled={!selectedDate}
                className={cn(
                  "py-3 px-3 text-sm rounded-lg border transition-colors text-center",
                  !selectedDate
                    ? "cursor-not-allowed opacity-50 border-border text-muted-foreground"
                    : selectedTime === slot.id
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-border text-foreground hover:border-primary hover:bg-muted"
                )}
              >
                {slot.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </MotionCard>
  );
};

export default ScheduleSelector;
