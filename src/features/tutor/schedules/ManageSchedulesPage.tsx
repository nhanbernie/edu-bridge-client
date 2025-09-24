"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, Save, X, CalendarDays } from "lucide-react";
import EBCalendar from "@/components/common/EBCalendar";
import EBSchedule from "@/components/common/EBSchedule";

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

interface ScheduleForm {
  startDate: Date | null;
  endDate: Date | null;
  selectedDays: string[];
  timeSlots: { start: string; end: string }[];
  isRecurring: boolean;
}

const ManageSchedulesPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [scheduleForm, setScheduleForm] = useState<ScheduleForm>({
    startDate: null,
    endDate: null,
    selectedDays: [],
    timeSlots: [],
    isRecurring: true,
  });

  // Mock data cho lịch rảnh hiện tại
  const currentSchedules: DaySchedule[] = [
    {
      day: "Thứ 2",
      date: "23/09",
      timeSlots: [
        { start: "09:00", end: "11:00", isBooked: false },
        { start: "14:00", end: "16:00", isBooked: true },
        { start: "19:00", end: "21:00", isBooked: false },
      ],
    },
    {
      day: "Thứ 4",
      date: "25/09",
      timeSlots: [
        { start: "14:00", end: "16:00", isBooked: false },
        { start: "19:00", end: "21:00", isBooked: false },
      ],
    },
    {
      day: "Thứ 5",
      date: "26/09",
      timeSlots: [{ start: "19:00", end: "21:00", isBooked: false }],
    },
  ];

  const weekDays = [
    { id: "monday", label: "Thứ 2" },
    { id: "tuesday", label: "Thứ 3" },
    { id: "wednesday", label: "Thứ 4" },
    { id: "thursday", label: "Thứ 5" },
    { id: "friday", label: "Thứ 6" },
    { id: "saturday", label: "Thứ 7" },
    { id: "sunday", label: "Chủ nhật" },
  ];

  const timeSlotOptions = [
    { start: "08:00", end: "10:00" },
    { start: "09:00", end: "11:00" },
    { start: "10:00", end: "12:00" },
    { start: "14:00", end: "16:00" },
    { start: "15:00", end: "17:00" },
    { start: "16:00", end: "18:00" },
    { start: "17:00", end: "19:00" },
    { start: "18:00", end: "20:00" },
    { start: "19:00", end: "21:00" },
    { start: "20:00", end: "22:00" },
  ];

  const handleDayToggle = (dayId: string) => {
    setScheduleForm((prev) => ({
      ...prev,
      selectedDays: prev.selectedDays.includes(dayId)
        ? prev.selectedDays.filter((d) => d !== dayId)
        : [...prev.selectedDays, dayId],
    }));
  };

  const handleTimeSlotToggle = (slot: { start: string; end: string }) => {
    setScheduleForm((prev) => ({
      ...prev,
      timeSlots: prev.timeSlots.some((s) => s.start === slot.start && s.end === slot.end)
        ? prev.timeSlots.filter((s) => !(s.start === slot.start && s.end === slot.end))
        : [...prev.timeSlots, slot],
    }));
  };

  const handleCreateSchedule = () => {
    // Logic tạo lịch rảnh
    console.log("Creating schedule:", scheduleForm);
    setShowCreateForm(false);
    setScheduleForm({
      startDate: null,
      endDate: null,
      selectedDays: [],
      timeSlots: [],
      isRecurring: true,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý lịch rảnh</h1>
          <p className="text-gray-600 mt-1">Tạo và quản lý lịch rảnh để học sinh có thể đặt lịch</p>
        </div>
        <Button
          onClick={() => setShowCreateForm(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Thêm lịch rảnh mới
        </Button>
      </div>

      {/* Create Schedule Form */}
      {showCreateForm && (
        <Card className="border-emerald-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-emerald-600" />
                Tạo lịch rảnh mới
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowCreateForm(false)}>
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Date Range Selection */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Ngày bắt đầu</h4>
                <EBCalendar
                  selectedDate={scheduleForm.startDate}
                  onDateChange={(date) => setScheduleForm((prev) => ({ ...prev, startDate: date }))}
                  minDate={new Date()}
                />
              </div>
              <div>
                <h4 className="font-medium mb-3">Ngày kết thúc</h4>
                <EBCalendar
                  selectedDate={scheduleForm.endDate}
                  onDateChange={(date) => setScheduleForm((prev) => ({ ...prev, endDate: date }))}
                  minDate={scheduleForm.startDate || new Date()}
                />
              </div>
            </div>

            {/* Day Selection */}
            <div>
              <h4 className="font-medium mb-3">Chọn ngày trong tuần *</h4>
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day) => (
                  <Button
                    key={day.id}
                    variant={scheduleForm.selectedDays.includes(day.id) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleDayToggle(day.id)}
                    className={
                      scheduleForm.selectedDays.includes(day.id)
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : ""
                    }
                  >
                    {day.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Time Slot Selection */}
            <div>
              <h4 className="font-medium mb-3">Chọn khung giờ *</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {timeSlotOptions.map((slot) => (
                  <Button
                    key={`${slot.start}-${slot.end}`}
                    variant={
                      scheduleForm.timeSlots.some(
                        (s) => s.start === slot.start && s.end === slot.end
                      )
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => handleTimeSlotToggle(slot)}
                    className={
                      scheduleForm.timeSlots.some(
                        (s) => s.start === slot.start && s.end === slot.end
                      )
                        ? "bg-emerald-600 hover:bg-emerald-700"
                        : ""
                    }
                  >
                    {slot.start}-{slot.end}
                  </Button>
                ))}
              </div>
            </div>

            {/* Recurring Option */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="recurring"
                checked={scheduleForm.isRecurring}
                onChange={(e) =>
                  setScheduleForm((prev) => ({ ...prev, isRecurring: e.target.checked }))
                }
                className="rounded"
              />
              <label htmlFor="recurring" className="text-sm font-medium">
                Lặp lại hàng tuần
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleCreateSchedule}
                disabled={
                  !scheduleForm.startDate ||
                  !scheduleForm.endDate ||
                  scheduleForm.selectedDays.length === 0 ||
                  scheduleForm.timeSlots.length === 0
                }
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                Tạo lịch rảnh
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Hủy
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Current Schedules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Lịch rảnh hiện tại
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EBSchedule
            scheduleData={currentSchedules}
            mode="week"
            showDate={true}
            showHeader={false}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageSchedulesPage;
