"use client";

import React from "react";
import { EBMotionCard } from "@/components/motion/EBMotionCard";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, X } from "lucide-react";
import { slideUpVariants } from "@/components/motion";
import { useTranslations } from "next-intl";

interface SelectedSession {
  date: Date;
  timeSlot: string;
  sessionNumber: number;
}

interface SelectedScheduleProps {
  sessions: SelectedSession[];
  onRemoveSession: (sessionNumber: number) => void;
  onEditSession: (sessionNumber: number) => void;
}

const SelectedSchedule: React.FC<SelectedScheduleProps> = ({
  sessions,
  onRemoveSession,
  onEditSession,
}) => {
  const t = useTranslations("student.booking.selectedSchedule");

  if (sessions.length === 0) {
    return null;
  }

  const formatDate = (date: Date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const getDayName = (date: Date) => {
    const days = t.raw("dayNames") as string[];
    return days[date.getDay()];
  };

  return (
    <EBMotionCard className="bg-card text-card-foreground" variants={slideUpVariants}>
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">{t("title")}</h3>
      </div>

      <div className="space-y-3">
        {sessions.map((session) => (
          <div
            key={session.sessionNumber}
            className="flex items-center justify-between p-3 bg-muted rounded-lg"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <span>
                  {t("session")} {session.sessionNumber}:
                </span>
                <span>{formatDate(session.date)}</span>
                <span>-</span>
                <span>{getDayName(session.date)}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <Clock className="w-3 h-3" />
                <span>{session.timeSlot}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEditSession(session.sessionNumber)}
                className="text-primary hover:text-primary hover:bg-primary/10"
              >
                {t("edit")}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveSession(session.sessionNumber)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {sessions.length < 4 && (
        <div className="mt-4 p-3 bg-muted/50 rounded-lg border-2 border-dashed border-border">
          <p className="text-sm text-muted-foreground text-center">
            {t("remaining", { count: 4 - sessions.length })}
          </p>
        </div>
      )}
    </EBMotionCard>
  );
};

export default SelectedSchedule;
