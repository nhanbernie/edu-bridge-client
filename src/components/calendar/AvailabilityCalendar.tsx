"use client";

import React, { useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Save, Trash2 } from "lucide-react";
import { useAvailabilityBlock } from "@/hooks/useAvailabilityBlock";
import { useTutorId } from "@/hooks/useTutorId";
import { toast } from "sonner";
import { ScheduleDialog, ScheduleData } from "./ScheduleDialog";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import {
  selectAvailabilityBlocks,
  selectTempSlots,
  addTempSlot,
  updateTempSlot,
  removeTempSlot,
  clearTempSlots,
  type TempSlot,
} from "@/redux/slices/availability-block.slice";

interface TimeSlot {
  id: string;
  start: string;
  end: string;
  title: string;
  backgroundColor?: string;
  borderColor?: string;
  isTemp?: boolean; // Temporary slot chưa save
  extendedProps?: {
    blockId?: string;
    slotIndex?: number;
    isBooked?: boolean;
    originalSlot?: any;
  };
}

interface AvailabilityCalendarProps {
  onSave?: () => void;
}

export const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({ onSave }) => {
  const dispatch = useDispatch();
  const { tutorId } = useTutorId();

  // Redux state
  const availabilityBlocks = useSelector(selectAvailabilityBlocks);
  const tempSlots = useSelector(selectTempSlots);

  // API hooks - Initialize to sync data to Redux
  const {
    isLoadingBlocks,
    handleCreateBlock,
    handleUpdateBlock,
    handleDeleteBlock,
    isCreating,
    refetchBlocks,
  } = useAvailabilityBlock({
    tutorId: tutorId || undefined,
  });

  React.useEffect(() => {
    availabilityBlocks.forEach((block, index) => {});
  }, [availabilityBlocks]);

  // Dialog states
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [contextMenuEvent, setContextMenuEvent] = useState<any>(null);

  const existingEvents: TimeSlot[] = useMemo(() => {
    const events: TimeSlot[] = [];

    // Duyệt qua từng block
    availabilityBlocks.forEach((block) => {
      if (block.slots && block.slots.length > 0) {
        block.slots.forEach((slot, slotIndex) => {
          // Ensure proper ISO format for FullCalendar
          const startTime = slot.startTime.includes("T")
            ? slot.startTime
            : slot.startTime.replace(" ", "T");
          const endTime = slot.endTime.includes("T")
            ? slot.endTime
            : slot.endTime.replace(" ", "T");

          const event: TimeSlot = {
            id: `${block.blockId}-slot-${slotIndex}`, // Unique ID cho mỗi slot
            start: startTime,
            end: endTime,
            title: slot.isBooked ? "Đã đặt" : "Rảnh",
            backgroundColor: slot.isBooked ? "#f97316" : "#10b981",
            borderColor: slot.isBooked ? "#ea580c" : "#059669",
            isTemp: false,
            extendedProps: {
              blockId: block.blockId, // Store original blockId for API calls
              slotIndex: slotIndex,
              isBooked: slot.isBooked,
              originalSlot: slot, // Store original slot data
            },
          };

          events.push(event);
        });
      } else {
      }
    });

    return events;
  }, [availabilityBlocks]);

  // Combine existing and temporary events
  const allEvents = useMemo(() => {
    const combined = [...existingEvents, ...tempSlots];

    // Add test events for debugging
    const testEvents = [
      {
        id: "test-1",
        title: "Test Event",
        start: "2025-09-26T09:00:00",
        end: "2025-09-26T10:00:00",
        backgroundColor: "#10b981",
        borderColor: "#059669",
      },
    ];

    const withTest = [...combined, ...testEvents];

    return withTest;
  }, [existingEvents, tempSlots]);

  // Handle time slot selection - Open dialog for customization
  const handleSelect = useCallback(
    (selectInfo: any) => {
      const start = selectInfo.start;
      const end = selectInfo.end;

      // Check if selection is valid (not in the past)
      if (start < new Date()) {
        toast.error("Không thể tạo lịch trong quá khứ");
        selectInfo.view.calendar.unselect();
        return;
      }

      // Check if selection overlaps with existing events
      const overlaps = allEvents.some((event) => {
        const eventStart = new Date(event.start);
        const eventEnd = new Date(event.end);
        return start < eventEnd && end > eventStart;
      });

      if (overlaps) {
        toast.error("Khung thời gian này đã có lịch");
        selectInfo.view.calendar.unselect();
        return;
      }

      // Open dialog with selected time range
      setSelectedEvent({
        start: start.toISOString(),
        end: end.toISOString(),
      });
      setDialogMode("create");
      setShowScheduleDialog(true);

      // Clear selection
      selectInfo.view.calendar.unselect();
    },
    [allEvents]
  );

  // Handle event click (for editing) - Allow editing all events
  const handleEventClick = useCallback(
    (clickInfo: any) => {
      const event = clickInfo.event;

      // Allow editing all events (both temporary and existing)
      setSelectedEvent({
        id: event.id,
        start: event.start.toISOString(),
        end: event.end.toISOString(),
        title: event.title,
        isTemp: event.extendedProps?.isTemp || tempSlots.some((slot) => slot.id === event.id),
      });
      setDialogMode("edit");
      setShowScheduleDialog(true);
    },
    [tempSlots]
  );

  // Handle event drag (move)
  const handleEventDrop = useCallback(
    async (dropInfo: any) => {
      const event = dropInfo.event;
      const isTemporary =
        event.extendedProps?.isTemp || tempSlots.some((slot) => slot.id === event.id);

      if (isTemporary) {
        // Update temporary slot
        const updatedSlot: TimeSlot = {
          id: event.id,
          start: event.start.toISOString(),
          end: event.end.toISOString(),
          title: event.title,
          backgroundColor: "#3b82f6",
          borderColor: "#2563eb",
          isTemp: true,
        };

        dispatch(updateTempSlot(updatedSlot));
        toast.success("Đã di chuyển lịch rảnh");
      } else {
        // Update existing slot via API
        try {
          const updateData = {
            startTime: event.start.toISOString().replace("T", " ").substring(0, 16),
            endTime: event.end.toISOString().replace("T", " ").substring(0, 16),
          };

          // Use original blockId from extendedProps, not the modified event id
          const blockId = event.extendedProps?.blockId || event.id;
          const slotIndex = event.extendedProps?.slotIndex;
          const result = await handleUpdateBlock(blockId, updateData);
          if (result) {
            await refetchBlocks();
            toast.success("Đã di chuyển lịch rảnh");
          } else {
            dropInfo.revert();
          }
        } catch (error) {
          console.error("Error moving schedule:", error);
          dropInfo.revert();
          toast.error("Có lỗi xảy ra khi di chuyển lịch");
        }
      }
    },
    [tempSlots, handleUpdateBlock, refetchBlocks, dispatch]
  );

  // Handle event resize
  const handleEventResize = useCallback(
    async (resizeInfo: any) => {
      const event = resizeInfo.event;
      const isTemporary =
        event.extendedProps?.isTemp || tempSlots.some((slot) => slot.id === event.id);

      if (isTemporary) {
        // Update temporary slot
        const updatedSlot: TimeSlot = {
          id: event.id,
          start: event.start.toISOString(),
          end: event.end.toISOString(),
          title: event.title,
          backgroundColor: "#3b82f6",
          borderColor: "#2563eb",
          isTemp: true,
        };

        dispatch(updateTempSlot(updatedSlot));
        toast.success("Đã thay đổi thời gian lịch rảnh");
      } else {
        // Update existing slot via API
        try {
          const updateData = {
            startTime: event.start.toISOString().replace("T", " ").substring(0, 16),
            endTime: event.end.toISOString().replace("T", " ").substring(0, 16),
          };

          // Use original blockId from extendedProps, not the modified event id
          const blockId = event.extendedProps?.blockId || event.id;
          const slotIndex = event.extendedProps?.slotIndex;
          const result = await handleUpdateBlock(blockId, updateData);
          if (result) {
            await refetchBlocks();
            toast.success("Đã thay đổi thời gian lịch rảnh");
          } else {
            resizeInfo.revert();
          }
        } catch (error) {
          console.error("Error resizing schedule:", error);
          resizeInfo.revert();
          toast.error("Có lỗi xảy ra khi thay đổi thời gian lịch");
        }
      }
    },
    [tempSlots, handleUpdateBlock, refetchBlocks, dispatch]
  );

  // Handle schedule dialog save
  const handleScheduleDialogSave = async (data: ScheduleData) => {
    const newSlot: TimeSlot = {
      id: selectedEvent?.id || `temp-${Date.now()}`,
      start: `${data.date}T${data.startTime}:00`,
      end: `${data.date}T${data.endTime}:00`,
      title: data.title,
      backgroundColor: "#3b82f6",
      borderColor: "#2563eb",
      isTemp: true,
    };

    if (dialogMode === "edit" && selectedEvent?.id) {
      // Check if this is a temporary slot or existing slot
      const isTemporary =
        selectedEvent.isTemp || tempSlots.some((slot) => slot.id === selectedEvent.id);

      if (isTemporary) {
        // Update temporary slot (no API call)
        dispatch(updateTempSlot(newSlot));
        toast.success("Đã cập nhật lịch rảnh");
      } else {
        // Update existing slot (call API)
        try {
          const updateData = {
            startTime: `${data.date} ${data.startTime}`,
            endTime: `${data.date} ${data.endTime}`,
          };

          // Use original blockId from extendedProps, not the modified event id
          const blockId = selectedEvent.extendedProps?.blockId || selectedEvent.id;

          const result = await handleUpdateBlock(blockId, updateData);
          if (result) {
            // Refresh data after successful update
            await refetchBlocks();
          }
        } catch (error) {
          console.error("Error updating schedule:", error);
          toast.error("Có lỗi xảy ra khi cập nhật lịch");
        }
      }
    } else {
      // Add new slot (always temporary until saved)
      dispatch(addTempSlot(newSlot));
      toast.success("Đã thêm lịch rảnh mới");
    }

    setShowScheduleDialog(false);
    setSelectedEvent(null);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    if (contextMenuEvent) {
      const eventId = contextMenuEvent.id;
      const isTemporary =
        contextMenuEvent.extendedProps?.isTemp || tempSlots.some((slot) => slot.id === eventId);

      if (isTemporary) {
        // Delete temporary slot (no API call)
        dispatch(removeTempSlot(eventId));
        toast.success("Đã xóa lịch rảnh");
      } else {
        // Delete existing slot (call API)
        try {
          // Use original blockId from extendedProps, not the modified event id
          const blockId = contextMenuEvent.extendedProps?.blockId || eventId;
          const success = await handleDeleteBlock(blockId);
          if (success) {
            // Refresh data after successful delete
            await refetchBlocks();
          }
        } catch (error) {
          console.error("Error deleting schedule:", error);
          toast.error("Có lỗi xảy ra khi xóa lịch");
        }
      }
    }
    setShowDeleteDialog(false);
    setContextMenuEvent(null);
  };

  // Save all temporary slots
  const handleSaveSlots = async () => {
    if (tempSlots.length === 0) {
      toast.error("Không có lịch nào để lưu");
      return;
    }

    try {
      // Group slots by date for API call
      const slotsByDate: Record<string, TimeSlot[]> = {};

      tempSlots.forEach((slot) => {
        const date = slot.start.split("T")[0];
        if (!slotsByDate[date]) {
          slotsByDate[date] = [];
        }
        slotsByDate[date].push(slot);
      });

      // Create availability blocks for each date
      for (const [, slots] of Object.entries(slotsByDate)) {
        const timeRanges = slots.map((slot) => ({
          startTime: slot.start.replace("T", " ").substring(0, 16),
          endTime: slot.end.replace("T", " ").substring(0, 16),
          isBooked: false,
        }));

        const result = await handleCreateBlock({
          timeRanges,
          isRecurring: false,
          recurrenceWeeks: 0,
        });
      }

      dispatch(clearTempSlots());

      // Refresh data
      await refetchBlocks();

      toast.success(`Đã tạo ${tempSlots.length} khung thời gian mới`);

      if (onSave) {
        onSave();
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi lưu lịch");
    }
  };

  // Clear all temporary slots
  const handleClearSlots = () => {
    if (tempSlots.length > 0) {
      dispatch(clearTempSlots());
      toast.info("Đã xóa tất cả lịch tạm thời");
    }
  };

  if (isLoadingBlocks) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center">
            <Clock className="w-8 h-8 animate-spin mx-auto mb-2" />
            <p>Đang tải lịch...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Tạo lịch rảnh mới
            </div>
            <div className="flex gap-2">
              {tempSlots.length > 0 && (
                <>
                  <Button onClick={handleClearSlots} variant="outline" size="sm">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Xóa tất cả
                  </Button>
                  <Button
                    onClick={handleSaveSlots}
                    disabled={isCreating}
                    className="bg-emerald-600 hover:bg-emerald-700"
                    size="sm"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isCreating ? "Đang lưu..." : `Lưu (${tempSlots.length})`}
                  </Button>
                </>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">Rảnh</Badge>
              <span className="text-sm">Lịch hiện tại</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-orange-100 text-orange-800">Đã đặt</Badge>
              <span className="text-sm">Đã có học sinh</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800">Lịch mới</Badge>
              <span className="text-sm">Chưa lưu</span>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            💡 <strong>Hướng dẫn:</strong> Kéo chọn trên lịch để tạo khung thời gian mới. Click để
            chỉnh sửa, click chuột phải để xóa lịch.
          </p>
        </CardContent>
      </Card>

      {/* Calendar */}
      <Card>
        <CardContent className="p-4">
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
            slotMinTime="06:00:00"
            slotMaxTime="23:00:00"
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
              // Add right-click to show delete dialog directly for all events
              info.el.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                setContextMenuEvent(info.event);
                setShowDeleteDialog(true);
              });
            }}
            locale="vi"
            buttonText={{
              today: "Hôm nay",
              month: "Tháng",
              week: "Tuần",
              day: "Ngày",
            }}
          />
        </CardContent>
      </Card>

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
