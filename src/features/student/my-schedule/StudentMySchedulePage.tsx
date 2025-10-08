"use client";

import React from "react";
import { Calendar, Clock, Users, Video, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { useStudentMySchedule } from "./hooks/useStudentMySchedule";

const StudentMySchedulePage: React.FC = () => {
  const router = useRouter();
  const {
    sessions: upcomingSessions,
    isLoading,
    todaySessions,
    thisWeekSessions,
    uniqueTutors,
    refetchSessions,
  } = useStudentMySchedule();

  const handleJoinSession = (sessionId: string) => {
    router.push(`/meeting/${sessionId}`);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 animate-spin mx-auto mb-4 border-2 border-gray-300 border-t-gray-600 rounded-full"></div>
          <p className="text-gray-600">Đang tải lịch học...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Lịch học của tôi
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Xem lịch học và quản lý các buổi học sắp tới
          </p>
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
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Lịch học sắp tới
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Xem và tham gia các buổi học của bạn
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {upcomingSessions.length} buổi học
                </span>
              </div>
            </div>

            {upcomingSessions.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Chưa có lịch học
                </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                  Bạn chưa có buổi học nào được lên lịch. Hãy tìm gia sư để bắt đầu học!
                </p>
              </div>
            ) : (
              <div className="grid gap-6">
                {upcomingSessions.map((session, index) => (
                  <div
                    key={session.sessionId}
                    className="group relative bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-600/50 hover:shadow-xl hover:border-emerald-200 dark:hover:border-emerald-700/50 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                            <span className="text-gray-600 dark:text-gray-400 font-bold text-sm">
                              {index + 1}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                              {session.courseTitle}
                            </h3>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-600 dark:text-gray-400 text-sm">
                                Gia sư: {session.tutorName}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                            <Clock className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                            <span className="text-gray-700 dark:text-gray-300 font-medium">
                              {formatTime(session.startTime)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                            <Video className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                            <span className="text-gray-700 dark:text-gray-300 font-medium">
                              1 giờ
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="ml-6 flex-shrink-0">
                        <button
                          onClick={() => handleJoinSession(session.sessionId)}
                          className="group/btn flex items-center gap-3 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                          <Play className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
                          <span>Tham gia</span>
                        </button>
                      </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-2 h-2 bg-gray-400 rounded-full opacity-60"></div>
                    <div className="absolute bottom-4 left-4 w-1 h-1 bg-gray-300 rounded-full opacity-40"></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentMySchedulePage;
