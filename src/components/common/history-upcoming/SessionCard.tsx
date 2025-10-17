import React, { memo, useMemo } from "react";
import { Clock, Users, Video, Star } from "lucide-react";
import { ClassSessionDto } from "@/services/classSession/type";
import { useSessionUtils } from "@/hooks/useSessionUtils";
import Image from "next/image";

interface SessionCardProps {
  session: ClassSessionDto;
  index: number;
  userType: "student" | "tutor";
  onJoinSession?: (sessionId: string) => void;
  onViewFeedback?: (sessionId: string) => void;
}

const SessionCard: React.FC<SessionCardProps> = memo(
  ({ session, index, userType, onJoinSession, onViewFeedback }) => {
    const { formatSessionDateTime, calculateSessionDuration, getSessionDurationText } =
      useSessionUtils();

    // Memoize expensive calculations
    const sessionData = useMemo(() => {
      const sessionDuration = calculateSessionDuration(session.startTime, session.endTime);
      const durationText = getSessionDurationText(sessionDuration);
      const isHistory = session.isCompleted;
      const displayName = userType === "student" ? session.tutorName : session.studentName;
      const displayLabel = userType === "student" ? "Gia sư" : "Học sinh";

      return {
        sessionDuration,
        durationText,
        isHistory,
        displayName,
        displayLabel,
      };
    }, [
      session.startTime,
      session.endTime,
      session.isCompleted,
      session.tutorName,
      session.studentName,
      userType,
      calculateSessionDuration,
      getSessionDurationText,
    ]);

    const { sessionDuration, durationText, isHistory, displayName, displayLabel } = sessionData;

    // Memoize styling classes
    const stylingClasses = useMemo(() => {
      const cardClasses = isHistory
        ? "group relative bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl px-6 py-5 border border-gray-200/50 dark:border-gray-600/50 hover:shadow-xl hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300"
        : "group relative bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl px-6 py-5 border border-gray-200/50 dark:border-gray-600/50 hover:shadow-xl hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300";

      const iconClasses = isHistory
        ? "w-10 h-10 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center"
        : "w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center";

      const textClasses = isHistory
        ? "text-primary dark:text-primary font-bold text-sm"
        : "text-gray-600 dark:text-gray-400 font-bold text-sm";

      return { cardClasses, iconClasses, textClasses };
    }, [isHistory]);

    const { cardClasses, iconClasses, textClasses } = stylingClasses;

    return (
      <div className={cardClasses}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-start gap-4">
              {/* Avatar - Square with rounded corners */}
              <div className="relative w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden">
                {session.avatarUrl ? (
                  <Image
                    src={session.avatarUrl}
                    alt={displayName || "Avatar"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-600 dark:text-gray-400 font-bold text-2xl">
                      {(displayName || "?").charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {session.courseTitle}
                </h3>

                {/* User info - Fixed position */}
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    {displayLabel}: {displayName}
                  </span>
                </div>

                {/* Rating - show for all sessions if available */}
                {/* {session.averageCourseRating != null && session.averageCourseRating > 0 && (
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Đánh giá trung bình: {session.averageCourseRating.toFixed(1)}/5
                    </span>
                  </div>
                )} */}
              </div>
            </div>
          </div>

          <div className="ml-6 flex-shrink-0">
            {isHistory ? (
              <div className="flex flex-col gap-3 items-end">
                {/* Time info - Above status badge */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-lg">
                    <Clock className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium text-xs">
                      {formatSessionDateTime(session.startTime)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-lg">
                    <Video className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium text-xs">
                      {durationText}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary rounded-lg">
                  <span className="text-xs font-medium">Hoàn thành</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3 items-end">
                {/* Time info for upcoming sessions */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-lg">
                    <Clock className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium text-xs">
                      {formatSessionDateTime(session.startTime)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-lg">
                    <Video className="h-3.5 w-3.5 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium text-xs">
                      {durationText}
                    </span>
                  </div>
                </div>
                {onJoinSession && (
                  <button
                    onClick={() => onJoinSession(session.sessionId)}
                    className="group/btn flex items-center gap-3 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <Video className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
                    <span>Tham gia</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Decorative elements */}
        <div
          className={`absolute top-4 right-4 w-2 h-2 ${isHistory ? "bg-primary" : "bg-gray-400"} rounded-full opacity-60`}
        ></div>
      </div>
    );
  }
);

SessionCard.displayName = "SessionCard";

export default SessionCard;
