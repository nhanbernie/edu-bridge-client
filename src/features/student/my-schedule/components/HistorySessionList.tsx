import React from "react";
import { ClassSessionDto } from "@/services/classSession/type";
import { SessionList } from "@/components/common/history-upcoming";

interface HistorySessionListProps {
  sessions: ClassSessionDto[];
  onViewFeedback?: (sessionId: string) => void;
}

const HistorySessionList: React.FC<HistorySessionListProps> = ({ sessions, onViewFeedback }) => {
  return (
    <SessionList
      sessions={sessions}
      userType="student"
      sessionType="history"
      onViewFeedback={onViewFeedback}
    />
  );
};

export default HistorySessionList;
