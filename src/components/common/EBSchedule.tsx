"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

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
  mode?: "week" | "list"; // week = hiển thị theo tuần, list = hiển thị theo danh sách
}

const EBSchedule: React.FC<EBScheduleProps> = ({
  scheduleData,
  title = "Lịch rảnh trong tuần",
  showHeader = true,
  showDate = false,
  mode = "week",
}) => {
  // Default schedule data if none provided
  const defaultSchedule: DaySchedule[] = [
    {
      day: "T2",
      timeSlots: [
        { start: "8:00", end: "10:00", isBooked: false },
        { start: "14:00", end: "16:00", isBooked: true },
        { start: "19:00", end: "21:00", isBooked: false },
      ],
    },
    {
      day: "T3",
      timeSlots: [
        { start: "8:00", end: "10:00", isBooked: true },
        { start: "14:00", end: "16:00", isBooked: false },
        { start: "19:00", end: "21:00", isBooked: false },
      ],
    },
    {
      day: "T4",
      timeSlots: [
        { start: "8:00", end: "10:00", isBooked: false },
        { start: "14:00", end: "16:00", isBooked: false },
        { start: "19:00", end: "21:00", isBooked: true },
      ],
    },
    {
      day: "T5",
      timeSlots: [
        { start: "8:00", end: "10:00", isBooked: false },
        { start: "14:00", end: "16:00", isBooked: false },
        { start: "19:00", end: "21:00", isBooked: false },
      ],
    },
    {
      day: "T6",
      timeSlots: [
        { start: "8:00", end: "10:00", isBooked: false },
        { start: "14:00", end: "16:00", isBooked: true },
        { start: "19:00", end: "21:00", isBooked: false },
      ],
    },
    {
      day: "T7",
      timeSlots: [],
      isFullDay: true,
    },
    {
      day: "CN",
      timeSlots: [],
      isFullDay: true,
    },
  ];

  const schedule = scheduleData || defaultSchedule;

  const getTimeSlotStyle = (slot: TimeSlot) => {
    if (slot.isBooked) {
      return "bg-orange-100 text-orange-800 border border-orange-200";
    }
    return "bg-green-100 text-green-800 border border-green-200";
  };

  const renderWeekMode = () => (
    <div className="grid grid-cols-7 gap-4">
      {schedule.map((dayData) => (
        <div key={dayData.day} className="text-center">
          <div className="font-medium mb-1 text-sm">{dayData.day}</div>
          {showDate && dayData.date && (
            <div className="text-xs text-muted-foreground mb-2">{dayData.date}</div>
          )}
          <div className="space-y-1">
            {dayData.isFullDay ? (
              <div className="bg-blue-100 text-blue-800 text-xs p-1 rounded border border-blue-200">
                Cả ngày
              </div>
            ) : dayData.timeSlots.length === 0 ? (
              <div className="text-gray-400 text-xs p-1">Không có lịch</div>
            ) : (
              dayData.timeSlots.map((slot, index) => (
                <div
                  key={index}
                  className={`text-xs p-1 rounded transition-colors ${getTimeSlotStyle(slot)}`}
                  title={slot.isBooked ? "Đã có lịch dạy" : "Lịch rảnh"}
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
                    className={`text-xs px-2 py-1 rounded transition-colors ${getTimeSlotStyle(slot)}`}
                    title={slot.isBooked ? "Đã có lịch dạy" : "Lịch rảnh"}
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

  const content = mode === "list" ? renderListMode() : renderWeekMode();

  if (!showHeader) {
    return content;
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
};

export default EBSchedule;
