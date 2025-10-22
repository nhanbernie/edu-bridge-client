"use client";

import React, { useState } from "react";
import { Calendar, Clock, Users } from "lucide-react";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import {
  buildMeetingRoute,
  buildStudentFeedbackDetailRoute,
} from "@/common/constants/route.constant";
import { useStudentMySchedule } from "./hooks/useStudentMySchedule";
import { useGetStudentHistorySessionsQuery } from "@/services/classSession/classSession.service";
import { SessionTabs, UpcomingSessionList, HistorySessionList } from "./components";
import { useUserId } from "@/hooks/useUserId";
import { SessionCardSkeleton, EBPageLoading } from "@/components/common/skeletons";
import {
  PAGE_CONTAINER,
  CONTENT_WRAPPER,
  PAGE_HEADER,
  PAGE_TITLE,
  PAGE_SUBTITLE,
} from "@/common/constants/className.constant";
import { useTranslations } from "next-intl";
import { EBMotionCard } from "@/components/motion";
import { SchedulePageSkeleton } from "./components/skeletons";

const StudentMySchedulePage: React.FC = () => {
  const { push } = useLocaleRouter();
  const t = useTranslations("student.mySchedule");
  const [activeTab, setActiveTab] = useState<"upcoming" | "history">("upcoming");

  const {
    sessions: upcomingSessions,
    isLoading: isLoadingUpcoming,
    todaySessions,
    thisWeekSessions,
    uniqueTutors,
    refetchSessions,
  } = useStudentMySchedule();

  const { userId: studentId, isLoading: isLoadingUserId } = useUserId();

  const { data: historyData, isLoading: isLoadingHistory } = useGetStudentHistorySessionsQuery(
    { studentId: studentId || "" },
    { skip: !studentId }
  );

  const historySessions = historyData?.data || [];

  const handleJoinSession = (sessionId: string) => {
    push(buildMeetingRoute(sessionId));
  };

  const handleViewFeedback = (courseId: string) => {
    push(buildStudentFeedbackDetailRoute(courseId));
  };

  // Only show page loading for initial data
  const isPageLoading = isLoadingUpcoming || isLoadingUserId || isLoadingHistory;

  if (isPageLoading) {
    return <SchedulePageSkeleton />;
  }

  return (
    <div className={PAGE_CONTAINER}>
      <div className={CONTENT_WRAPPER}>
        {/* Header */}
        <div className={PAGE_HEADER}>
          <h1 className={PAGE_TITLE}>{t("title")}</h1>
          <p className={PAGE_SUBTITLE}>{t("subtitle")}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <EBMotionCard
              variant="base"
            className="p-4 sm:p-6"
            initial={undefined}
            animate={undefined}
            whileHover={undefined}
            whileTap={undefined}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                  {t("stats.todaySessions")}
                </p>
                <p className="text-xl sm:text-2xl font-bold text-foreground">{todaySessions}</p>
              </div>
              <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </div>
          </EBMotionCard>

          <EBMotionCard
            variant="base"
            className="p-4 sm:p-6"
            initial={undefined}
            animate={undefined}
            whileHover={undefined}
            whileTap={undefined}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                  {t("stats.weekSessions")}
                </p>
                <p className="text-xl sm:text-2xl font-bold text-foreground">{thisWeekSessions}</p>
              </div>
              <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </div>
          </EBMotionCard>

          <EBMotionCard
            variant="base"
            className="p-4 sm:p-6"
            initial={undefined}
            animate={undefined}
            whileHover={undefined}
            whileTap={undefined}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                  {t("stats.tutors")}
                </p>
                <p className="text-xl sm:text-2xl font-bold text-foreground">{uniqueTutors}</p>
              </div>
              <Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </div>
          </EBMotionCard>
        </div>

        {/* Schedule Content */}
        <div className="bg-card rounded-2xl sm:rounded-3xl shadow-lg border border-border overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                  {t("scheduleTitle")}
                </h2>
              </div>
            </div>

            {/* Session Tabs */}
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <SessionTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                upcomingCount={upcomingSessions.length}
                historyCount={historySessions.length}
              />
            </div>

            {/* Session Content */}
            {activeTab === "upcoming" ? (
              <UpcomingSessionList sessions={upcomingSessions} onJoinSession={handleJoinSession} />
            ) : (
              <HistorySessionList sessions={historySessions} onViewFeedback={handleViewFeedback} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentMySchedulePage;
