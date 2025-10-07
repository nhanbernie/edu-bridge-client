"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Save, X } from "lucide-react";
import { format, parse } from "date-fns";
import { vi } from "date-fns/locale";

interface ScheduleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ScheduleData) => void;
  initialData?: {
    start: string;
    end: string;
    title?: string;
  };
  mode: "create" | "edit";
}

export interface ScheduleData {
  date: string;
  startTime: string;
  endTime: string;
  title: string;
}

const timeOptions = [
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
];

export const ScheduleDialog: React.FC<ScheduleDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  mode,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [title, setTitle] = useState<string>("Lịch rảnh");
  const [showStartTimeOptions, setShowStartTimeOptions] = useState(false);
  const [showEndTimeOptions, setShowEndTimeOptions] = useState(false);

  // Initialize form data when dialog opens
  useEffect(() => {
    if (isOpen && initialData) {
      const startDate = new Date(initialData.start);
      const endDate = new Date(initialData.end);

      setSelectedDate(format(startDate, "yyyy-MM-dd"));
      setStartTime(format(startDate, "HH:mm"));
      setEndTime(format(endDate, "HH:mm"));
      setTitle(initialData.title || "Lịch rảnh");
    }
  }, [isOpen, initialData]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedDate("");
      setStartTime("");
      setEndTime("");
      setTitle("Lịch rảnh");
      setShowStartTimeOptions(false);
      setShowEndTimeOptions(false);
    }
  }, [isOpen]);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".time-dropdown-container")) {
        setShowStartTimeOptions(false);
        setShowEndTimeOptions(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowStartTimeOptions(false);
        setShowEndTimeOptions(false);
      }
    };

    if (showStartTimeOptions || showEndTimeOptions) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showStartTimeOptions, showEndTimeOptions]);

  const handleSave = () => {
    if (!selectedDate || !startTime || !endTime) {
      return;
    }

    // Validate time range
    const start = parse(startTime, "HH:mm", new Date());
    const end = parse(endTime, "HH:mm", new Date());

    if (end <= start) {
      alert("Thời gian kết thúc phải sau thời gian bắt đầu");
      return;
    }

    const scheduleData: ScheduleData = {
      date: selectedDate,
      startTime,
      endTime,
      title: "Rảnh", // Default title
    };

    onSave(scheduleData);
    onClose();
  };

  const handleTimeSelect = (time: string, type: "start" | "end") => {
    if (type === "start") {
      setStartTime(time);
      setShowStartTimeOptions(false);
    } else {
      setEndTime(time);
      setShowEndTimeOptions(false);
    }
  };

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      return format(date, "EEEE, dd MMMM yyyy", { locale: vi });
    } catch {
      return dateStr;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            {mode === "create" ? "Tạo lịch rảnh mới" : "Chỉnh sửa lịch rảnh"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Date and Time Display */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>
              {formatDisplayDate(selectedDate)}{" "}
              {startTime && endTime && `${startTime} - ${endTime}`}
            </span>
          </div>

          {/* Date Input */}
          <div className="space-y-2">
            <Label htmlFor="date">Ngày</Label>
            <Input
              id="date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={format(new Date(), "yyyy-MM-dd")}
            />
          </div>

          {/* Start Time */}
          <div className="space-y-2">
            <Label htmlFor="startTime">Thời gian bắt đầu</Label>
            <div className="relative time-dropdown-container">
              <Input
                id="startTime"
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                onFocus={() => setShowStartTimeOptions(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setShowStartTimeOptions(false);
                  }
                }}
                placeholder="Chọn hoặc nhập thời gian (HH:MM)"
              />
              {showStartTimeOptions && (
                <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-md shadow-lg max-h-40 overflow-y-auto">
                  {timeOptions.map((time) => (
                    <button
                      key={time}
                      type="button"
                      className="w-full px-3 py-2 text-left hover:bg-gray-50 text-sm"
                      onClick={() => handleTimeSelect(time, "start")}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* End Time */}
          <div className="space-y-2">
            <Label htmlFor="endTime">Thời gian kết thúc</Label>
            <div className="relative time-dropdown-container">
              <Input
                id="endTime"
                type="text"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                onFocus={() => setShowEndTimeOptions(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setShowEndTimeOptions(false);
                  }
                }}
                placeholder="Chọn hoặc nhập thời gian (HH:MM)"
              />
              {showEndTimeOptions && (
                <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-md shadow-lg max-h-40 overflow-y-auto">
                  {timeOptions.map((time) => (
                    <button
                      key={time}
                      type="button"
                      className="w-full px-3 py-2 text-left hover:bg-gray-50 text-sm"
                      onClick={() => handleTimeSelect(time, "end")}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            <X className="w-4 h-4 mr-2" />
            Hủy
          </Button>
          <Button
            onClick={handleSave}
            disabled={!selectedDate || !startTime || !endTime}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <Save className="w-4 h-4 mr-2" />
            {mode === "create" ? "Tạo lịch" : "Cập nhật"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
