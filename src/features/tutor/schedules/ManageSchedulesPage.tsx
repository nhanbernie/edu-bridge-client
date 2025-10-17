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
import { MotionContainer, MotionItem } from "@/components/motion";

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
    <MotionContainer className="space-y-8">
      {/* Header */}
      <MotionItem>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-4xl font-bold text-foreground">Quản lý lịch rảnh</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Tạo và quản lý lịch rảnh để học sinh có thể đặt lịch • {scheduleSummary.totalSlots}{" "}
              khung giờ ({scheduleSummary.availableSlots} rảnh, {scheduleSummary.bookedSlots} đã
              đặt)
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={refetchBlocks}
              variant="outline"
              size="sm"
              className="border-border text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Làm mới
            </Button>
            <Button
              onClick={handleCreateSchedule}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Thêm lịch rảnh mới
            </Button>
          </div>
        </div>
      </MotionItem>

      {/* Stats Cards */}
      <MotionItem>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card rounded-3xl shadow-lg border border-border p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tổng khung giờ</p>
                <p className="text-2xl font-bold text-foreground">{scheduleSummary.totalSlots}</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-3xl shadow-lg border border-border p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Đang rảnh</p>
                <p className="text-2xl font-bold text-foreground">
                  {scheduleSummary.availableSlots}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-3xl shadow-lg border border-border p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-xl">
                <PlusCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Đã đặt lịch</p>
                <p className="text-2xl font-bold text-foreground">{scheduleSummary.bookedSlots}</p>
              </div>
            </div>
          </div>
        </div>
      </MotionItem>

      {/* Current Schedules */}
      <MotionItem>
        <div className="bg-card rounded-3xl shadow-lg border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Lịch rảnh hiện tại</h2>
          </div>
          <EBSchedule
            scheduleData={currentSchedules}
            mode="week"
            showDate={true}
            showHeader={false}
            onDateChange={setCurrentDate}
          />
        </div>
      </MotionItem>
    </MotionContainer>
  );
};

export default ManageSchedulesPage;
