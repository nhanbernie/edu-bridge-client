import React from "react";
import { Clock, Users, Video, Star, MessageSquare, Eye } from "lucide-react";
import { ClassSessionDto } from "@/services/classSession/type";
import { useSessionUtils } from "@/hooks/useSessionUtils";
import FeedbackButton from "./FeedbackButton";

interface SessionCardProps {
  session: ClassSessionDto;
  index: number;
  userType: "student" | "tutor";
  onJoinSession?: (sessionId: string) => void;
  onViewFeedback?: (sessionId: string) => void;
}

const SessionCard: React.FC<SessionCardProps> = ({
  session,
  index,
  userType,
  onJoinSession,
  onViewFeedback,
}) => {
  const { formatSessionDateTime, calculateSessionDuration, getSessionDurationText } =
    useSessionUtils();

  const sessionDuration = calculateSessionDuration(session.startTime, session.endTime);
  const durationText = getSessionDurationText(sessionDuration);

  const isHistory = session.isCompleted;
  const hasFeedbacks = Boolean(session.feedbacks && session.feedbacks.length > 0);

  // Determine display name based on user type
  const displayName = userType === "student" ? session.tutorName : session.studentName;
  const displayLabel = userType === "student" ? "Gia sư" : "Học sinh";

  // Card styling based on type
  const cardClasses = isHistory
    ? "group relative bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-600/50 hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-700/50 transition-all duration-300"
    : "group relative bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-600/50 hover:shadow-xl hover:border-emerald-200 dark:hover:border-emerald-700/50 transition-all duration-300";

  const iconClasses = isHistory
    ? "w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center"
    : "w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center";

  const textClasses = isHistory
    ? "text-blue-600 dark:text-blue-400 font-bold text-sm"
    : "text-gray-600 dark:text-gray-400 font-bold text-sm";

  return (
    <div className={cardClasses}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className={iconClasses}>
              <span className={textClasses}>{index + 1}</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {session.courseTitle}
              </h3>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400 text-sm">
                  {displayLabel}: {displayName}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm mb-4">
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
              <Clock className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {formatSessionDateTime(session.startTime)}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
              <Video className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">{durationText}</span>
            </div>
          </div>

          {/* Rating and Feedback for history sessions */}
          {isHistory && session.averageCourseRating !== undefined && (
            <div className="flex items-center gap-2 mb-3">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Đánh giá trung bình: {session.averageCourseRating}/5
              </span>
            </div>
          )}

          {/* Feedbacks for history sessions */}
          {isHistory && session.feedbacks && session.feedbacks.length > 0 && (
            <div className="space-y-2 mb-4">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Phản hồi:</h4>
              {session.feedbacks.map((feedback) => (
                <div
                  key={feedback.feedbackId}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < feedback.tutorRating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {feedback.tutorRating}/5
                    </span>
                  </div>
                  {feedback.comment && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                      &ldquo;{feedback.comment}&rdquo;
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="ml-6 flex-shrink-0">
          {isHistory ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Hoàn thành</span>
              </div>

              {/* Feedback button for students */}
              {userType === "student" && (
                <FeedbackButton
                  sessionId={session.sessionId}
                  hasFeedbacks={hasFeedbacks}
                  onViewFeedback={onViewFeedback}
                />
              )}
            </div>
          ) : (
            onJoinSession && (
              <button
                onClick={() => onJoinSession(session.sessionId)}
                className="group/btn flex items-center gap-3 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <Video className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
                <span>Tham gia</span>
              </button>
            )
          )}
        </div>
      </div>

      {/* Decorative elements */}
      <div
        className={`absolute top-4 right-4 w-2 h-2 ${isHistory ? "bg-blue-400" : "bg-gray-400"} rounded-full opacity-60`}
      ></div>
      <div
        className={`absolute bottom-4 left-4 w-1 h-1 ${isHistory ? "bg-blue-300" : "bg-gray-300"} rounded-full opacity-40`}
      ></div>
    </div>
  );
};

export default SessionCard;
