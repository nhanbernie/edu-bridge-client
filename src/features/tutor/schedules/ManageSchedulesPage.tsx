"use client";

import { useState } from "react";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { ROUTES } from "@/common/constants/route.constant";
import { Calendar, Plus, PlusCircle, Clock, CheckCircle, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EBPageLoading } from "@/components/common";
import EBSchedule from "@/components/common/EBSchedule";
import { useAvailabilityBlock, useTutorId } from "@/hooks/index";
import { transformToCurrentWeekSchedule, getScheduleSummary } from "@/utils/scheduleTransform";

const ManageSchedulesPage = () => {
  const { push } = useLocaleRouter();
  const { tutorId } = useTutorId();
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get availability blocks from API
  const { availabilityBlocks, isLoadingBlocks, refetchBlocks } = useAvailabilityBlock({
    tutorId: tutorId || undefined,
  });

  // Transform API data to EBSchedule format
  const currentSchedules = transformToCurrentWeekSchedule(availabilityBlocks, currentDate);
  const scheduleSummary = getScheduleSummary(availabilityBlocks);

  const handleCreateSchedule = () => {
    push(ROUTES.TUTOR_SCHEDULES_CREATE);
  };

  if (isLoadingBlocks) {
    return <EBPageLoading message="Đang tải lịch rảnh..." />;
  }

  return (
    <div className="space-y-6">
      {/* EBHeader */}
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
            onDateChange={setCurrentDate}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageSchedulesPage;
