import { useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { useAvailabilityBlock } from "@/hooks/useAvailabilityBlock";
import { useTutorId } from "@/hooks/useTutorId";
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
  isTemp?: boolean;
  extendedProps?: {
    blockId?: string;
    slotIndex?: number;
    status?: string; // AVAILABLE/BOOKED/RESERVED
    originalSlot?: any;
  };
}

interface ScheduleData {
  date: string;
  startTime: string;
  endTime: string;
  title: string;
}

export const useAvailabilityCalendar = (onSave?: () => void) => {
  const dispatch = useDispatch();
  const { tutorId } = useTutorId();

  // Redux state
  const availabilityBlocks = useSelector(selectAvailabilityBlocks);
  const tempSlots = useSelector(selectTempSlots);

  // API hooks
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

  // Dialog states
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [contextMenuEvent, setContextMenuEvent] = useState<any>(null);

  // Transform availability blocks to events
  const existingEvents: TimeSlot[] = useMemo(() => {
    const events: TimeSlot[] = [];

    availabilityBlocks.forEach((block) => {
      if (block.slots && block.slots.length > 0) {
        block.slots.forEach((slot, slotIndex) => {
          const startTime = slot.startTime.includes("T")
            ? slot.startTime
            : slot.startTime.replace(" ", "T");
          const endTime = slot.endTime.includes("T")
            ? slot.endTime
            : slot.endTime.replace(" ", "T");

          const event: TimeSlot = {
            id: `${block.blockId}-slot-${slotIndex}`,
            start: startTime,
            end: endTime,
            title:
              slot.status === "BOOKED"
                ? "Đã đặt"
                : slot.status === "RESERVED"
                  ? "Đang giữ"
                  : "Rảnh",
            backgroundColor:
              slot.status === "BOOKED"
                ? "#ef4444"
                : slot.status === "RESERVED"
                  ? "#eab308"
                  : "#10b981",
            borderColor:
              slot.status === "BOOKED"
                ? "#dc2626"
                : slot.status === "RESERVED"
                  ? "#ca8a04"
                  : "#059669",
            isTemp: false,
            extendedProps: {
              blockId: block.blockId,
              slotIndex: slotIndex,
              status: slot.status,
              originalSlot: slot,
            },
          };

          events.push(event);
        });
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

    return [...combined, ...testEvents];
  }, [existingEvents, tempSlots]);

  // Handle time slot selection
  const handleSelect = useCallback(
    (selectInfo: any) => {
      const start = selectInfo.start;
      const end = selectInfo.end;

      if (start < new Date()) {
        toast.error("Không thể tạo lịch trong quá khứ");
        selectInfo.view.calendar.unselect();
        return;
      }

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

      setSelectedEvent({
        start: start.toISOString(),
        end: end.toISOString(),
      });
      setDialogMode("create");
      setShowScheduleDialog(true);
      selectInfo.view.calendar.unselect();
    },
    [allEvents]
  );

  // Handle event click
  const handleEventClick = useCallback(
    (clickInfo: any) => {
      const event = clickInfo.event;

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

  // Handle event drag
  const handleEventDrop = useCallback(
    async (dropInfo: any) => {
      const event = dropInfo.event;
      const isTemporary =
        event.extendedProps?.isTemp || tempSlots.some((slot) => slot.id === event.id);

      if (isTemporary) {
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
        try {
          const updateData = {
            startTime: event.start.toISOString().replace("T", " ").substring(0, 16),
            endTime: event.end.toISOString().replace("T", " ").substring(0, 16),
          };

          const blockId = event.extendedProps?.blockId || event.id;
          const result = await handleUpdateBlock(blockId, updateData);
          if (result) {
            await refetchBlocks();
            toast.success("Đã di chuyển lịch rảnh");
          } else {
            dropInfo.revert();
          }
        } catch (error) {
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
        try {
          const updateData = {
            startTime: event.start.toISOString().replace("T", " ").substring(0, 16),
            endTime: event.end.toISOString().replace("T", " ").substring(0, 16),
          };

          const blockId = event.extendedProps?.blockId || event.id;
          const result = await handleUpdateBlock(blockId, updateData);
          if (result) {
            await refetchBlocks();
            toast.success("Đã thay đổi thời gian lịch rảnh");
          } else {
            resizeInfo.revert();
          }
        } catch (error) {
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
      const isTemporary =
        selectedEvent.isTemp || tempSlots.some((slot) => slot.id === selectedEvent.id);

      if (isTemporary) {
        dispatch(updateTempSlot(newSlot));
        toast.success("Đã cập nhật lịch rảnh");
      } else {
        try {
          const updateData = {
            startTime: `${data.date} ${data.startTime}`,
            endTime: `${data.date} ${data.endTime}`,
          };

          const blockId = selectedEvent.extendedProps?.blockId || selectedEvent.id;
          const result = await handleUpdateBlock(blockId, updateData);
          if (result) {
            await refetchBlocks();
          }
        } catch (error) {
          toast.error("Có lỗi xảy ra khi cập nhật lịch");
        }
      }
    } else {
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
        dispatch(removeTempSlot(eventId));
        toast.success("Đã xóa lịch rảnh");
      } else {
        try {
          const blockId = contextMenuEvent.extendedProps?.blockId || eventId;
          const success = await handleDeleteBlock(blockId);
          if (success) {
            await refetchBlocks();
          }
        } catch (error) {
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
      const slotsByDate: Record<string, TimeSlot[]> = {};

      tempSlots.forEach((slot) => {
        const date = slot.start.split("T")[0];
        if (!slotsByDate[date]) {
          slotsByDate[date] = [];
        }
        slotsByDate[date].push(slot);
      });

      for (const [, slots] of Object.entries(slotsByDate)) {
        const timeRanges = slots.map((slot) => ({
          startTime: slot.start.replace("T", " ").substring(0, 16),
          endTime: slot.end.replace("T", " ").substring(0, 16),
          status: "AVAILABLE",
        }));

        await handleCreateBlock({
          timeRanges,
          isRecurring: false,
          recurrenceWeeks: 0,
        });
      }

      dispatch(clearTempSlots());
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

  // Handle context menu
  const handleContextMenu = (info: any) => {
    setContextMenuEvent(info.event);
    setShowDeleteDialog(true);
  };

  return {
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
  };
};
