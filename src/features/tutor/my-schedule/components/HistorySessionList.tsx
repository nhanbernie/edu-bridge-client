import React from "react";
import { ClassSessionDto } from "@/services/classSession/type";
import { SessionList } from "@/components/common/history-upcoming";

interface HistorySessionListProps {
  sessions: ClassSessionDto[];
}

const HistorySessionList: React.FC<HistorySessionListProps> = ({ sessions }) => {
  return <SessionList sessions={sessions} userType="tutor" sessionType="history" />;
};

export default HistorySessionList;
