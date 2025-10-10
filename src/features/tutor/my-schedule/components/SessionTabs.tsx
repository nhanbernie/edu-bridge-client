import React from "react";
import { Calendar, History } from "lucide-react";

interface SessionTabsProps {
  activeTab: "upcoming" | "history";
  onTabChange: (tab: "upcoming" | "history") => void;
  upcomingCount: number;
  historyCount: number;
}

const SessionTabs: React.FC<SessionTabsProps> = ({
  activeTab,
  onTabChange,
  upcomingCount,
  historyCount,
}) => {
  return (
    <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
      <button
        onClick={() => onTabChange("upcoming")}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          activeTab === "upcoming"
            ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        }`}
      >
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Sắp tới ({upcomingCount})
        </div>
      </button>
      <button
        onClick={() => onTabChange("history")}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
          activeTab === "history"
            ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        }`}
      >
        <div className="flex items-center gap-2">
          <History className="h-4 w-4" />
          Lịch sử ({historyCount})
        </div>
      </button>
    </div>
  );
};

export default SessionTabs;
