import React from "react";
import { ClassSessionDto } from "@/services/classSession/type";
import { SessionList } from "@/components/common/history-upcoming";

interface UpcomingSessionListProps {
  sessions: ClassSessionDto[];
  onJoinSession: (sessionId: string) => void;
}

const UpcomingSessionList: React.FC<UpcomingSessionListProps> = ({ sessions, onJoinSession }) => {
  return (
    <SessionList
      sessions={sessions}
      userType="student"
      sessionType="upcoming"
      onJoinSession={onJoinSession}
    />
  );
};

export default UpcomingSessionList;
