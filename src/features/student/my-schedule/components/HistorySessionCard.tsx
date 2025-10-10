import React from "react";
import { ClassSessionDto } from "@/services/classSession/type";
import { SessionCard } from "@/components/common/history-upcoming";

interface HistorySessionCardProps {
  session: ClassSessionDto;
  index: number;
  onViewFeedback?: (sessionId: string) => void;
}

const HistorySessionCard: React.FC<HistorySessionCardProps> = ({
  session,
  index,
  onViewFeedback,
}) => {
  return (
    <SessionCard
      session={session}
      index={index}
      userType="student"
      onViewFeedback={onViewFeedback}
    />
  );
};

export default HistorySessionCard;
