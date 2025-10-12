import React, { memo } from "react";
import { BookOpen, CheckCircle, Clock, Users } from "lucide-react";
import { EnrollmentDto } from "@/services/course";
import Image from "next/image";

interface EnrolledCourseCardProps {
  enrollment: EnrollmentDto;
  index: number;
  onViewDetails?: (courseId: string) => void;
}

const EnrolledCourseCard: React.FC<EnrolledCourseCardProps> = memo(
  ({ enrollment, index, onViewDetails }) => {
    const isCompleted = enrollment.progressStatus === "Completed";
    const progress =
      enrollment.totalSessionsBooked > 0
        ? (enrollment.completedSessions / enrollment.totalSessionsBooked) * 100
        : 0;

    const cardClasses = isCompleted
      ? "group relative bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl px-6 py-5 border border-gray-200/50 dark:border-gray-600/50 hover:shadow-xl hover:border-emerald-200 dark:hover:border-emerald-700/50 transition-all duration-300 cursor-pointer"
      : "group relative bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl px-6 py-5 border border-gray-200/50 dark:border-gray-600/50 hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-700/50 transition-all duration-300 cursor-pointer";

    return (
      <div className={cardClasses} onClick={() => onViewDetails?.(enrollment.courseId)}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-start gap-4">
              {/* Tutor Avatar */}
              <div className="relative w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden">
                {enrollment.tutorAvatarUrl ? (
                  <Image
                    src={enrollment.tutorAvatarUrl}
                    alt={enrollment.tutorName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-600 dark:text-gray-400 font-bold text-2xl">
                      {enrollment.tutorName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-2">
                {/* Course Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {enrollment.courseTitle}
                </h3>

                {/* Tutor Info */}
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    Gia sư: {enrollment.tutorName}
                  </span>
                </div>

                {/* Progress Info */}
                <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    <span>
                      {enrollment.completedSessions}/{enrollment.totalSessionsBooked} buổi
                    </span>
                  </div>
                  <span className="font-medium">{Math.round(progress)}%</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isCompleted ? "bg-emerald-500" : "bg-blue-500"
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Total Students (if available) */}
                {enrollment.totalStudents !== null && enrollment.totalStudents > 0 && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-400 text-xs">
                      {enrollment.totalStudents} học sinh
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right side - Status */}
          <div className="ml-6 flex-shrink-0">
            {/* Status Badge */}
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                isCompleted
                  ? "bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300"
                  : "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
              }`}
            >
              <span className="text-xs font-medium">{isCompleted ? "Hoàn thành" : "Đang học"}</span>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div
          className={`absolute top-4 right-4 w-2 h-2 ${isCompleted ? "bg-emerald-400" : "bg-blue-400"} rounded-full opacity-60`}
        ></div>
      </div>
    );
  }
);

EnrolledCourseCard.displayName = "EnrolledCourseCard";

export default EnrolledCourseCard;
