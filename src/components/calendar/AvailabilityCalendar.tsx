"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAvailabilityCalendar } from "@/components/calendar/hook/useAvailabilityCalendar";
import { ScheduleDialog } from "./ScheduleDialog";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import "./calendar-custom.css";

interface AvailabilityCalendarProps {
  onSave?: () => void;
}

export const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({ onSave }) => {
  const { theme } = useTheme();
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
      <div className="flex items-center justify-center h-64 bg-card rounded-xl border border-border shadow-sm">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-muted-foreground">Đang tải lịch...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Lịch rảnh</h2>
          <p className="text-sm text-muted-foreground">
            Kéo chọn để tạo lịch mới, nhấn chuột trái để xóa và nhấn chuột phải để sửa
          </p>
        </div>

        {tempSlots.length > 0 && (
          <div className="flex gap-3">
            <Button
              onClick={handleClearSlots}
              variant="outline"
              size="sm"
              className="hover:bg-destructive/10 hover:border-destructive/20 hover:text-destructive"
            >
              Xóa tất cả
            </Button>
            <Button
              onClick={handleSaveSlots}
              disabled={isCreating}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              size="sm"
            >
              {isCreating ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                  Đang lưu...
                </div>
              ) : (
                `Lưu (${tempSlots.length})`
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-6 mb-6 p-4 bg-gradient-to-r from-muted/20 to-muted/10 rounded-2xl border border-border/30 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg shadow-sm ring-2 ring-emerald-200/50 dark:ring-emerald-700/50"></div>
          <span className="text-sm font-semibold text-foreground">Rảnh</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 bg-gradient-to-br from-rose-400 to-rose-600 rounded-lg shadow-sm ring-2 ring-rose-200/50 dark:ring-rose-700/50"></div>
          <span className="text-sm font-semibold text-foreground">Đã đặt</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-sm ring-2 ring-blue-200/50 dark:ring-blue-700/50"></div>
          <span className="text-sm font-semibold text-foreground">Lịch mới</span>
        </div>
      </div>

      {/* Calendar */}
      <div className="bg-card rounded-4xl border border-border shadow-sm p-4">
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
                  className={`text-xs font-medium ${isToday ? "text-primary" : "text-muted-foreground"}`}
                >
                  {dayOfWeek}
                </div>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold transition-all duration-200 ${
                    isToday
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-foreground hover:bg-muted/50"
                  }`}
                >
                  {dayNumber}
                </div>
              </div>
            );
          }}
          // Theme support
          themeSystem="standard"
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
