"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus, RefreshCw } from "lucide-react";
import EBSchedule from "@/components/common/EBSchedule";
import { useAvailabilityBlock } from "@/hooks/useAvailabilityBlock";
import { useTutorId } from "@/hooks/useTutorId";
import { transformToCurrentWeekSchedule, getScheduleSummary } from "@/utils/scheduleTransform";
import { useRouter } from "next/navigation";

const ManageSchedulesPage = () => {
  const router = useRouter();
  const { tutorId } = useTutorId();

  // Get availability blocks from API
  const { availabilityBlocks, isLoadingBlocks, refetchBlocks } = useAvailabilityBlock({
    tutorId: tutorId || undefined,
  });

  // Transform API data to EBSchedule format
  const currentSchedules = transformToCurrentWeekSchedule(availabilityBlocks);
  const scheduleSummary = getScheduleSummary(availabilityBlocks);

  const handleCreateSchedule = () => {
    router.push("/tutor/schedules/create");
  };

  if (isLoadingBlocks) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2" />
          <p>Đang tải lịch rảnh...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý lịch rảnh</h1>
          <p className="text-gray-600 mt-1">
            Tạo và quản lý lịch rảnh để học sinh có thể đặt lịch • {scheduleSummary.totalSlots}{" "}
            khung giờ ({scheduleSummary.availableSlots} rảnh, {scheduleSummary.bookedSlots} đã đặt)
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={refetchBlocks} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Làm mới
          </Button>
          <Button
            onClick={handleCreateSchedule}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Thêm lịch rảnh mới
          </Button>
        </div>
      </div>

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
