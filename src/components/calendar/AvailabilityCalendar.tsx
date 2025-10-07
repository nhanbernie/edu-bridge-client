"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { useAvailabilityCalendar } from "@/components/calendar/hook/useAvailabilityCalendar";
import { ScheduleDialog } from "./ScheduleDialog";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import "./calendar-custom.css";

interface AvailabilityCalendarProps {
  onSave?: () => void;
}

export const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({ onSave }) => {
  const {
    // State
    isLoadingBlocks,
    isCreating,
    tempSlots,
    allEvents,
    showScheduleDialog,
    showDeleteDialog,
    selectedEvent,
    dialogMode,
    contextMenuEvent,

    // Handlers
    handleSelect,
    handleEventClick,
    handleEventDrop,
    handleEventResize,
    handleScheduleDialogSave,
    handleDeleteConfirm,
    handleSaveSlots,
    handleClearSlots,
    handleContextMenu,

    // Dialog controls
    setShowScheduleDialog,
    setShowDeleteDialog,
    setSelectedEvent,
    setContextMenuEvent,
  } = useAvailabilityCalendar(onSave);

  if (isLoadingBlocks) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-lg border">
        <div className="text-center">
          <Clock className="w-8 h-8 animate-spin mx-auto mb-2" />
          <p>Đang tải lịch...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Lịch rảnh</h2>
          <p className="text-sm text-gray-500">Kéo chọn để tạo lịch mới, nhấn chuột trái để xóa và nhấn chuột phải để sửa </p>
        </div>

        {tempSlots.length > 0 && (
          <div className="flex gap-2">
            <Button onClick={handleClearSlots} variant="outline" size="sm">
              Xóa tất cả
            </Button>
            <Button
              onClick={handleSaveSlots}
              disabled={isCreating}
              className="bg-emerald-600 hover:bg-emerald-700"
              size="sm"
            >
              {isCreating ? "Đang lưu..." : `Lưu (${tempSlots.length})`}
            </Button>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span>Rảnh</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded"></div>
          <span>Đã đặt</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span>Lịch mới</span>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-lg border p-4">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          height="auto"
          selectable={true}
          selectMirror={true}
          editable={true}
          dayMaxEvents={true}
          weekends={true}
          slotMinTime="00:00:00"
          slotMaxTime="24:00:00"
          slotDuration="01:00:00"
          snapDuration="00:30:00"
          allDaySlot={false}
          nowIndicator={true}
          timeZone="local"
          selectConstraint={{
            start: new Date().toISOString().split("T")[0],
          }}
          eventDisplay="block"
          displayEventTime={true}
          events={allEvents}
          select={handleSelect}
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
          eventResize={handleEventResize}
          eventMouseEnter={(info) => {
            info.el.style.cursor = "pointer";
          }}
          eventDidMount={(info) => {
            info.el.addEventListener("contextmenu", (e) => {
              e.preventDefault();
              handleContextMenu(info);
            });
          }}
          locale="vi"
          buttonText={{
            today: "Hôm nay",
            month: "Tháng",
            week: "Tuần",
            day: "Ngày",
          }}
          dayHeaderContent={(arg) => {
            const date = new Date(arg.date);
            const dayOfWeek = date.toLocaleDateString("vi-VN", { weekday: "short" });
            const dayNumber = date.getDate();
            const isToday = date.toDateString() === new Date().toDateString();

            return (
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`text-xs font-medium ${isToday ? "text-emerald-600" : "text-gray-500"}`}
                >
                  {dayOfWeek}
                </div>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold ${
                    isToday ? "bg-emerald-500 text-white" : "text-gray-900"
                  }`}
                >
                  {dayNumber}
                </div>
              </div>
            );
          }}
        />
      </div>

      {/* Schedule Dialog */}
      <ScheduleDialog
        isOpen={showScheduleDialog}
        onClose={() => {
          setShowScheduleDialog(false);
          setSelectedEvent(null);
        }}
        onSave={handleScheduleDialogSave}
        initialData={selectedEvent}
        mode={dialogMode}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setContextMenuEvent(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Xóa lịch rảnh"
        description={`Bạn có chắc chắn muốn xóa lịch "${contextMenuEvent?.title}" không? Hành động này không thể hoàn tác.`}
      />
    </div>
  );
};
