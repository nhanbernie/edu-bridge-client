"use client";

import { useState } from "react";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EBSchedule from "@/components/common/EBSchedule";
import { AvailabilityCalendar } from "@/components/calendar/AvailabilityCalendar";
import { useAvailabilityBlock, useTutorId } from "@/hooks";
import { transformToCurrentWeekSchedule, getScheduleSummary } from "@/utils/scheduleTransform";

const CreateSchedulesPage = () => {
  const router = useRouter();
  const { tutorId } = useTutorId();
  const [currentDate, setCurrentDate] = useState(new Date());

  const { availabilityBlocks, isLoadingBlocks } = useAvailabilityBlock({
    tutorId: tutorId || undefined,
  });

  const currentSchedules = transformToCurrentWeekSchedule(availabilityBlocks, currentDate);
  const scheduleSummary = getScheduleSummary(availabilityBlocks);

  const handleBack = () => {
    router.push("/tutor/schedules");
  };

  const handleSaveSuccess = () => {};

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-6 px-4">
        {/* EBHeader */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-6 w-6 text-emerald-600" />
            <h1 className="text-2xl font-bold text-gray-900">Tạo lịch rảnh mới</h1>
          </div>
          <p className="text-gray-600 mb-4">
            Sử dụng lịch bên dưới để tạo khung thời gian rảnh cho học sinh đặt lịch
          </p>
          <Button
            onClick={handleBack}
            variant="ghost"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Quay lại quản lý lịch
          </Button>
        </div>

        {/* Current Schedules */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Lịch rảnh hiện tại
              <span className="text-sm font-normal text-gray-500">
                ({scheduleSummary.availableSlots} rảnh, {scheduleSummary.bookedSlots} đã đặt)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingBlocks ? (
              <div className="flex items-center justify-center h-32">
                <Clock className="w-6 h-6 animate-spin mr-2" />
                <span>Đang tải lịch...</span>
              </div>
            ) : (
              <EBSchedule
                scheduleData={currentSchedules}
                mode="week"
                showDate={true}
                showHeader={false}
                onDateChange={setCurrentDate}
              />
            )}
          </CardContent>
        </Card>

        {/* Calendar Component */}
        <AvailabilityCalendar onSave={handleSaveSuccess} />
      </div>
    </div>
  );
};

export default CreateSchedulesPage;
