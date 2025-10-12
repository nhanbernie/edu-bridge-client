"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Calendar, Clock, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTutorMySchedule } from "./hooks/useTutorMySchedule";
import { useGetTutorHistorySessionsQuery } from "@/services/classSession/classSession.service";
import { SessionTabs, UpcomingSessionList, HistorySessionList } from "./components";
import { useUserId } from "@/hooks/useUserId";
import { useRefetchSessions } from "@/hooks/useRefetchSessions";
import EBLoadingSpinner from "@/components/common/EBLoadingSpinner";
import { SessionCardSkeleton } from "@/components/common/skeletons";
import { PAGE_HEADER, PAGE_TITLE, PAGE_SUBTITLE } from "@/common/constants/className.constant";

const TutorMySchedulePage: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"upcoming" | "history">("upcoming");

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
      router.push(`/meeting/${sessionId}`);
    },
    [router]
  );

  const handleViewFeedback = useCallback(
    (courseId: string) => {
      router.push(`/tutor/feedback/${courseId}`);
    },
    [router]
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

  if (isPageLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <EBLoadingSpinner message="Đang tải lịch dạy..." size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className={PAGE_HEADER}>
        <h1 className={PAGE_TITLE}>Lịch dạy của tôi</h1>
        <p className={PAGE_SUBTITLE}>Xem lịch dạy và quản lý các buổi học sắp tới</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Buổi dạy hôm nay
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {statsData.todaySessions}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Buổi dạy tuần này
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {statsData.thisWeekSessions}
              </p>
            </div>
            <Clock className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Học sinh</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {statsData.uniqueStudents}
              </p>
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Lịch dạy</h2>
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
              <EBLoadingSpinner message="Đang tải lịch sắp tới..." size="md" />
            ) : (
              <UpcomingSessionList sessions={upcomingSessions} onJoinSession={handleJoinSession} />
            )
          ) : historyLoading ? (
            <EBLoadingSpinner message="Đang tải lịch sử..." size="md" />
          ) : (
            <HistorySessionList
              sessions={historySessions}
              userType="tutor"
              onViewFeedback={handleViewFeedback}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TutorMySchedulePage;
