import React from "react";
import { ClassSessionDto } from "@/services/classSession/type";
import { SessionCard } from "@/components/common/history-upcoming";

interface UpcomingSessionCardProps {
  session: ClassSessionDto;
  index: number;
  onJoinSession: (sessionId: string) => void;
}

const UpcomingSessionCard: React.FC<UpcomingSessionCardProps> = ({
  session,
  index,
  onJoinSession,
}) => {
  return (
    <SessionCard session={session} index={index} userType="tutor" onJoinSession={onJoinSession} />
  );
};

export default UpcomingSessionCard;
