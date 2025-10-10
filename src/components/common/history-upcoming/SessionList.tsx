import React from "react";
import { Calendar, History, BookOpen, Clock } from "lucide-react";
import { ClassSessionDto } from "@/services/classSession/type";
import SessionCard from "./SessionCard";

interface SessionListProps {
  sessions: ClassSessionDto[];
  userType: "student" | "tutor";
  sessionType: "upcoming" | "history";
  onJoinSession?: (sessionId: string) => void;
  onViewFeedback?: (sessionId: string) => void;
}

const SessionList: React.FC<SessionListProps> = ({
  sessions,
  userType,
  sessionType,
  onJoinSession,
  onViewFeedback,
}) => {
  const isHistory = sessionType === "history";

  if (sessions.length === 0) {
    return (
      <div className="text-center py-12">
        {isHistory ? (
          <History className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        ) : (
          <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        )}
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {isHistory ? "Chưa có lịch sử" : "Chưa có lịch sắp tới"}
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          {isHistory
            ? "Bạn chưa có buổi học nào đã hoàn thành."
            : "Bạn chưa có buổi học nào sắp tới."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {sessions.map((session, index) => (
        <SessionCard
          key={session.sessionId}
          session={session}
          index={index}
          userType={userType}
          onJoinSession={onJoinSession}
          onViewFeedback={onViewFeedback}
        />
      ))}
    </div>
  );
};

export default SessionList;
