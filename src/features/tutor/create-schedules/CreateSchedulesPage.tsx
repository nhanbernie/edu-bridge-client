"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { ROUTES } from "@/common/constants/route.constant";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EBSchedule from "@/components/common/EBSchedule";
import { AvailabilityCalendar } from "@/components/calendar/AvailabilityCalendar";
import { useAvailabilityBlock, useTutorId } from "@/hooks";
import { transformToCurrentWeekSchedule, getScheduleSummary } from "@/utils/scheduleTransform";
import { CreateSchedulesSkeleton } from "./skeleton";

const CreateSchedulesPage = () => {
  const t = useTranslations("tutor.schedules.create");
  const { push } = useLocaleRouter();
  const { tutorId } = useTutorId();
  const [currentDate, setCurrentDate] = useState(new Date());

  const { availabilityBlocks, isLoadingBlocks } = useAvailabilityBlock({
    tutorId: tutorId || undefined,
  });

  const currentSchedules = transformToCurrentWeekSchedule(availabilityBlocks, currentDate);
  const scheduleSummary = getScheduleSummary(availabilityBlocks);

  const handleBack = () => {
    push(ROUTES.TUTOR_SCHEDULES);
  };

  const handleSaveSuccess = () => {};

  if (isLoadingBlocks) {
    return <CreateSchedulesSkeleton />;
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-6 px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl font-bold text-foreground">{t("title")}</h1>
          </div>
          <p className="text-muted-foreground text-lg mb-6">{t("subtitle")}</p>
          <Button
            onClick={handleBack}
            variant="ghost"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            {t("backButton")}
          </Button>
        </div>

        {/* Current Schedules */}
        <Card className="mb-8 shadow-elevated rounded-3xl border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              {t("currentSchedules")}
              <span className="text-sm font-normal text-muted-foreground bg-muted/30 px-3 py-1 rounded-lg">
                {t("scheduleSummary", {
                  availableSlots: scheduleSummary.availableSlots,
                  bookedSlots: scheduleSummary.bookedSlots,
                })}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {isLoadingBlocks ? (
              <div className="flex items-center justify-center h-32">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span>{t("loading")}</span>
                </div>
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
