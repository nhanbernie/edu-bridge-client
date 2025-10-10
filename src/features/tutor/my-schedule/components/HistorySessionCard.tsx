import React from "react";
import { ClassSessionDto } from "@/services/classSession/type";
import { SessionCard } from "@/components/common/history-upcoming";

interface HistorySessionCardProps {
  session: ClassSessionDto;
  index: number;
}

const HistorySessionCard: React.FC<HistorySessionCardProps> = ({ session, index }) => {
  return <SessionCard session={session} index={index} userType="tutor" />;
};

export default HistorySessionCard;
