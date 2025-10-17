// Removed constants import - using theme system instead
import { useScheduleData } from "@/features/tutor/dashboard/hooks/useScheduleData";
import { EBMotionCard } from "@/components/motion";
import { useTranslations } from "next-intl";
import React from "react";

const Schedules = () => {
  const { scheduleItems, isLoading, sessionsError, hasSessions } = useScheduleData();
  const t = useTranslations("tutor.dashboard.schedules");

  if (isLoading) {
    return (
      <EBMotionCard variant="base" className="rounded-3xl">
        <h2 className="text-xl font-bold text-foreground mb-6">{t("title")}</h2>
        <div className="flex items-center justify-center h-32">
          <div className="text-muted-foreground">{t("loading")}</div>
        </div>
      </EBMotionCard>
    );
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
    <div className="bg-card rounded-3xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-foreground mb-6">{t("title")}</h2>
      <div className="space-y-4">
        {scheduleItems.map((item) => (
          <EBMotionCard
            key={item.id}
            variant="base"
            className="flex items-center justify-between p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl border-l-4 border-primary"
            initial={undefined}
            animate={undefined}
            whileHover={undefined}
            whileTap={undefined}
          >
            <div>
              <p className="font-semibold text-foreground">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.student}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-foreground">{item.time}</p>
              <p className="text-sm font-medium text-primary">{item.status}</p>
            </div>
          </EBMotionCard>
        ))}
      </div>
    </div>
  );
};

export default Schedules;
