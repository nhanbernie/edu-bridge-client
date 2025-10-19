// Removed constants import - using theme system instead
import { useScheduleData } from "@/features/tutor/dashboard/hooks/useScheduleData";
import { EBMotionCard } from "@/components/motion";
import { useTranslations } from "next-intl";
import React from "react";
import { DashboardSkeleton } from "@/features/tutor/dashboard/components/skeletons";

const Schedules = () => {
  const { scheduleItems, isLoading, sessionsError, hasSessions } = useScheduleData();
  const t = useTranslations("tutor.dashboard.schedules");
  const tCommon = useTranslations("tutor.dashboard");

  if (isLoading) {
    return <DashboardSkeleton title={t("title")} />;
  }

  if (sessionsError) {
    return (
      <EBMotionCard variant="base" className="rounded-3xl">
        <h2 className="text-xl font-bold text-foreground mb-6">{t("title")}</h2>
        <div className="flex items-center justify-center h-32">
          <div className="text-destructive">{t("error")}</div>
        </div>
      </EBMotionCard>
    );
  }

  if (!hasSessions) {
    return (
      <EBMotionCard variant="base" className="rounded-3xl">
        <h2 className="text-xl font-bold text-foreground mb-6">{t("title")}</h2>
        <div className="flex items-center justify-center h-32">
          <div className="text-muted-foreground">{t("empty")}</div>
        </div>
      </EBMotionCard>
    );
  }

  return (
    <div className="bg-card rounded-3xl shadow-lg p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6">{t("title")}</h2>
      <div className="space-y-3 sm:space-y-4">
        {scheduleItems.map((item) => (
          <EBMotionCard
            key={item.id}
            variant="base"
            className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl border-l-4 border-primary gap-2 sm:gap-0"
            initial={undefined}
            animate={undefined}
            whileHover={undefined}
            whileTap={undefined}
          >
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground text-sm sm:text-base truncate">
                {item.title}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground truncate">{item.student}</p>
            </div>
            <div className="flex sm:flex-col sm:text-right gap-2 sm:gap-0 sm:ml-4">
              <p className="font-semibold text-foreground text-sm sm:text-base whitespace-nowrap">
                {item.time}
              </p>
              <p className="text-xs sm:text-sm font-medium text-primary whitespace-nowrap">
                {item.status}
              </p>
            </div>
          </EBMotionCard>
        ))}
      </div>
    </div>
  );
};

export default Schedules;
