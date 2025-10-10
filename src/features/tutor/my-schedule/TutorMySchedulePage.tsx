"use client";

import React, { useState } from "react";
import { Calendar, Clock, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTutorMySchedule } from "./hooks/useTutorMySchedule";
import { useGetTutorHistorySessionsQuery } from "@/services/classSession/classSession.service";
import { SessionTabs, UpcomingSessionList, HistorySessionList } from "./components";
import { useUserId } from "@/hooks/useUserId";
import EBLoadingSpinner from "@/components/common/EBLoadingSpinner";

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

  // Get history sessions
  const { data: historyData, isLoading: historyLoading } = useGetTutorHistorySessionsQuery(
    { tutorId: tutorId || "" },
    { skip: !tutorId }
  );

  const historySessions = historyData?.data || [];

  // Only show page loading for initial data
  const isPageLoading = upcomingLoading || isLoadingUserId;

  const handleJoinSession = (sessionId: string) => {
    router.push(`/meeting/${sessionId}`);
  };

  if (isPageLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <EBLoadingSpinner message="Đang tải lịch dạy..." size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Lịch dạy của tôi
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Xem lịch dạy và quản lý các buổi học sắp tới
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Buổi dạy hôm nay
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
                  Buổi dạy tuần này
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Học sinh</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{uniqueStudents}</p>
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
                <UpcomingSessionList
                  sessions={upcomingSessions}
                  onJoinSession={handleJoinSession}
                />
              )
            ) : historyLoading ? (
              <EBLoadingSpinner message="Đang tải lịch sử..." size="md" />
            ) : (
              <HistorySessionList sessions={historySessions} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorMySchedulePage;
