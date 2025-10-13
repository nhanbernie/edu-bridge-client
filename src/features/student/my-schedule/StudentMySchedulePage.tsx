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

const StudentMySchedulePage: React.FC = () => {
  const { push } = useLocaleRouter();
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
    return <EBPageLoading message="Đang tải lịch học..." />;
  }

  return (
    <div className={PAGE_CONTAINER}>
      <div className={CONTENT_WRAPPER}>
        {/* Header */}
        <div className={PAGE_HEADER}>
          <h1 className={PAGE_TITLE}>Lịch học của tôi</h1>
          <p className={PAGE_SUBTITLE}>Xem lịch học và quản lý các buổi học sắp tới</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Buổi học hôm nay
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{todaySessions}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Buổi học tuần này
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {thisWeekSessions}
                </p>
              </div>
              <Clock className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Gia sư</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{uniqueTutors}</p>
              </div>
              <Users className="h-8 w-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Schedule Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Lịch học</h2>
              </div>
            </div>

            {/* Session Tabs */}
            <div className="flex items-center justify-between mb-8">
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
