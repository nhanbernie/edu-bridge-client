import { CARD_BASE, ROUNDED } from "@/common/constants/css/card.constant";
import { useScheduleData } from "@/features/tutor/dashboard/hooks/useScheduleData";
import React from "react";

const Schedules = () => {
  const { scheduleItems, isLoading, sessionsError, hasSessions } = useScheduleData();

  if (isLoading) {
    return (
      <div className={`${CARD_BASE} ${ROUNDED.XL} p-6`}>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Lịch trình hôm nay</h2>
        <div className="flex items-center justify-center h-32">
          <div className="text-gray-500">Đang tải lịch trình...</div>
        </div>
      </div>
    );
  }

  if (sessionsError) {
    return (
      <div className={`${CARD_BASE} ${ROUNDED.XL} p-6`}>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Lịch trình hôm nay</h2>
        <div className="flex items-center justify-center h-32">
          <div className="text-red-500">Không thể tải lịch trình</div>
        </div>
      </div>
    );
  }

  if (!hasSessions) {
    return (
      <div className={`${CARD_BASE} ${ROUNDED.XL} p-6`}>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Lịch trình hôm nay</h2>
        <div className="flex items-center justify-center h-32">
          <div className="text-gray-500">Không có lịch trình hôm nay</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${CARD_BASE} ${ROUNDED.XL} p-6`}>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Lịch dạy hôm nay</h2>
      <div className="space-y-4">
        {scheduleItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center justify-between p-4 bg-gradient-to-r ${item.colorConfig.bg} ${ROUNDED.LG}`}
          >
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">{item.title}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.student}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900 dark:text-white">{item.time}</p>
              <p className={`text-sm font-medium ${item.colorConfig.text}`}>{item.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedules;
