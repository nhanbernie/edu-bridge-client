import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface EBFeedbackCardProps {
  studentName: string;
  courseTitle: string;
  tutorRating: number;
  courseRating: number;
  comment: string;
  createdAt: string;
}

const EBFeedbackCard: React.FC<EBFeedbackCardProps> = ({
  studentName,
  courseTitle,
  tutorRating,
  courseRating,
  comment,
  createdAt,
}) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-4">
        {/* Header: Student Name */}
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{studentName}</h3>

        {/* Course Title and Date */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          {courseTitle} • {new Date(createdAt).toLocaleDateString("vi-VN")}
        </p>

        {/* Ratings */}
        <div className="space-y-2 mb-3">
          {/* Tutor Rating */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 min-w-[50px]">
              Tutor:
            </span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < tutorRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Course Rating */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 min-w-[50px]">
              Course:
            </span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < courseRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Comment */}
        {comment && (
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{comment}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default EBFeedbackCard;
