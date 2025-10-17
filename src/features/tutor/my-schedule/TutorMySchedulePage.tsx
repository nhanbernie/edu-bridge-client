"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Calendar, Clock, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import {
  buildMeetingRoute,
  buildTutorFeedbackDetailRoute,
} from "@/common/constants/route.constant";
import { useTutorMySchedule } from "./hooks/useTutorMySchedule";
import { useGetTutorHistorySessionsQuery } from "@/services/classSession/classSession.service";
import { SessionTabs, UpcomingSessionList, HistorySessionList } from "./components";
import { useUserId } from "@/hooks/useUserId";
import { useRefetchSessions } from "@/hooks/useRefetchSessions";
import { SessionCardSkeleton, EBPageLoading } from "@/components/common/skeletons";
import { MotionContainer, MotionItem } from "@/components/motion";
import { EBMotionCard } from "@/components/motion";

const TutorMySchedulePage: React.FC = () => {
  const { push } = useLocaleRouter();
  const [activeTab, setActiveTab] = useState<"upcoming" | "history">("upcoming");
  const t = useTranslations("tutor.schedules");

  const {
    sessions: upcomingSessions,
    isLoading: upcomingLoading,
    todaySessions,
    thisWeekSessions,
    uniqueStudents,
    refetchSessions,
  } = useTutorMySchedule();

  // Get user ID using the existing hook
  const { userId: tutorId, isLoading: isLoadingUserId } = useUserId();
  const { refetchAllSessions } = useRefetchSessions();

  const {
    data: historyData,
    isLoading: historyLoading,
    refetch: refetchHistory,
  } = useGetTutorHistorySessionsQuery({ tutorId: tutorId || "" }, { skip: !tutorId });

  const historySessions = historyData?.data || [];

  const isPageLoading = upcomingLoading || isLoadingUserId;

  const handleJoinSession = useCallback(
    (sessionId: string) => {
      push(buildMeetingRoute(sessionId));
    },
    [push]
  );

  const handleViewFeedback = useCallback(
    (courseId: string) => {
      push(buildTutorFeedbackDetailRoute(courseId));
    },
    [push]
  );

  // Memoize stats data to prevent unnecessary re-renders
  const statsData = useMemo(
    () => ({
      todaySessions,
      thisWeekSessions,
      uniqueStudents,
    }),
    [todaySessions, thisWeekSessions, uniqueStudents]
  );

  // Refetch data when returning from feedback page
  useEffect(() => {
    const handleFocus = () => {
      refetchAllSessions();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [refetchAllSessions]);

  // NOTE: loading will replace by skeleton
  if (isPageLoading) {
    return <EBPageLoading message={t("page.loading")} />;
  }

  return (
    <MotionContainer className="min-h-screen">
      {/* Header */}
      <MotionItem>
        <div className="space-y-4 mb-8">
          <h1 className="text-4xl font-bold text-foreground">{t("page.title")}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">{t("page.subtitle")}</p>
        </div>
      </MotionItem>

      {/* Stats Cards */}
      <MotionItem>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <EBMotionCard
            variant="base"
            className="p-6"
            initial={undefined}
            animate={undefined}
            whileHover={undefined}
            whileTap={undefined}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("stats.todaySessions")}
                </p>
                <p className="text-2xl font-bold text-foreground">{statsData.todaySessions}</p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </EBMotionCard>

          <EBMotionCard
            variant="base"
            className="p-6"
            initial={undefined}
            animate={undefined}
            whileHover={undefined}
            whileTap={undefined}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {t("stats.thisWeekSessions")}
                </p>
                <p className="text-2xl font-bold text-foreground">{statsData.thisWeekSessions}</p>
              </div>
              <Clock className="h-8 w-8 text-primary" />
            </div>
          </EBMotionCard>

          <EBMotionCard
            variant="base"
            className="p-6"
            initial={undefined}
            animate={undefined}
            whileHover={undefined}
            whileTap={undefined}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{t("stats.students")}</p>
                <p className="text-2xl font-bold text-foreground">{statsData.uniqueStudents}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </EBMotionCard>
        </div>
      </MotionItem>

      {/* Schedule Content */}
      <MotionItem>
        <div className="bg-card rounded-3xl shadow-lg border border-border overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">{t("schedule.title")}</h2>
              </div>
            </div>
            {/* Tabs */}
            <div className="flex items-center justify-between mb-8">
              <SessionTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                upcomingCount={upcomingSessions.length}
                historyCount={historySessions.length}
              />
            </div>

            {activeTab === "upcoming" ? (
              upcomingLoading ? (
                <SessionCardSkeleton count={3} />
              ) : (
                <UpcomingSessionList
                  sessions={upcomingSessions}
                  onJoinSession={handleJoinSession}
                />
              )
            ) : historyLoading ? (
              <SessionCardSkeleton count={3} />
            ) : (
              <HistorySessionList
                sessions={historySessions}
                userType="tutor"
                onViewFeedback={handleViewFeedback}
              />
            )}
          </div>
        </div>
      </MotionItem>
    </MotionContainer>
  );
};

export default TutorMySchedulePage;
