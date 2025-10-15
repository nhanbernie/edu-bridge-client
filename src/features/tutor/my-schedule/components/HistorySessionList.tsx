import React from "react";
import { ClassSessionDto } from "@/services/classSession/type";
import { SessionList } from "@/components/common/history-upcoming";

interface HistorySessionListProps {
  sessions: ClassSessionDto[];
  userType: "student" | "tutor";
  onViewFeedback?: (courseId: string) => void;
}

const HistorySessionList: React.FC<HistorySessionListProps> = ({
  sessions,
  userType,
  onViewFeedback,
}) => {
  return (
    <SessionList
      sessions={sessions}
      userType={userType}
      sessionType="history"
      onViewFeedback={onViewFeedback}
    />
  );
};

export default HistorySessionList;
