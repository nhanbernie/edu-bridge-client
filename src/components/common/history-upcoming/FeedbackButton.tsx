import React from "react";
import { MessageSquare, Eye } from "lucide-react";

interface FeedbackButtonProps {
  courseId: string;
  hasFeedbacks: boolean;
  onViewFeedback?: (courseId: string) => void;
}

const FeedbackButton: React.FC<FeedbackButtonProps> = ({
  courseId,
  hasFeedbacks,
  onViewFeedback,
}) => {
  const handleClick = () => {
    if (onViewFeedback) {
      onViewFeedback(courseId);
    } else {
      window.location.href = `/student/feedback/${courseId}`;
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
        hasFeedbacks
          ? "bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900 dark:hover:bg-blue-800 dark:text-blue-300"
          : "bg-orange-100 hover:bg-orange-200 text-orange-700 dark:bg-orange-900 dark:hover:bg-orange-800 dark:text-orange-300"
      }`}
    >
      {hasFeedbacks ? (
        <>
          <Eye className="h-4 w-4" />
          <span>Xem phản hồi</span>
        </>
      ) : (
        <>
          <MessageSquare className="h-4 w-4" />
          <span>Đánh giá gia sư</span>
        </>
      )}
    </button>
  );
};

export default FeedbackButton;
