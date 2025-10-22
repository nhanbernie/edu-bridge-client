import React, { memo } from "react";
import { useTranslations } from "next-intl";
import { BookOpen, CheckCircle, Clock, Users } from "lucide-react";
import { EnrollmentDto } from "@/services/course";
import Image from "next/image";
import { EBMotionCard, EBButtonAction } from "@/components/motion";
import { pressedCardVariants, smoothCardVariants } from "@/common/constants/motion/cardMotion.constant";
interface EnrolledCourseCardProps {
  enrollment: EnrollmentDto;
  index: number;
  onViewDetails?: (courseId: string) => void;
  role?: "student" | "tutor";
}

const EnrolledCourseCard: React.FC<EnrolledCourseCardProps> = memo(
  ({ enrollment, index, onViewDetails, role = "student" }) => {
    const t = useTranslations("components.enrolledCourseCard");
    const isCompleted = enrollment.progressStatus === "Completed";
    const progress =
      enrollment.totalSessionsBooked > 0
        ? (enrollment.completedSessions / enrollment.totalSessionsBooked) * 100
        : 0;

    const cardClasses = isCompleted
      ? "group relative bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl sm:rounded-2xl px-4 py-4 sm:px-6 sm:py-5 border border-gray-200/50 dark:border-gray-600/50 hover:shadow-xl hover:border-emerald-200 dark:hover:border-emerald-700/50 transition-all duration-300"
      : "group relative bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-xl sm:rounded-2xl px-4 py-4 sm:px-6 sm:py-5 border border-gray-200/50 dark:border-gray-600/50 hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-700/50 transition-all duration-300";

    return (
      <EBMotionCard
        variants={smoothCardVariants}
        className={cardClasses}
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-3 sm:gap-4">
              {/* Tutor Avatar */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-xl sm:rounded-2xl overflow-hidden">
                {enrollment.tutorAvatarUrl ? (
                  <Image
                    src={enrollment.tutorAvatarUrl}
                    alt={enrollment.tutorName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-600 dark:text-gray-400 font-bold text-lg sm:text-2xl">
                      {enrollment.tutorName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
                {/* Course Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight">
                  {enrollment.courseTitle}
                </h3>

                {/* Tutor Info */}
                <div className="flex items-center gap-2">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm truncate">
                    {t("tutor")} {enrollment.tutorName}
                  </span>
                </div>

                {/* Progress Info */}
                <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1 min-w-0">
                    <BookOpen className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">
                      {t("sessions", {
                        completed: enrollment.completedSessions,
                        total: enrollment.totalSessionsBooked,
                      })}
                    </span>
                  </div>
                  <span className="font-medium flex-shrink-0 ml-2">{Math.round(progress)}%</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 sm:h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      isCompleted ? "bg-emerald-500" : "bg-blue-500"
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Total Students (only for tutors) */}
                {role === "tutor" &&
                  enrollment.totalStudents !== null &&
                  enrollment.totalStudents > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 dark:text-gray-400 text-xs">
                        {t("students", { count: enrollment.totalStudents })}
                      </span>
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* Right side - Status */}
          <div className="flex justify-end sm:ml-6 sm:flex-shrink-0">
            {/* Status Badge */}
            <div
              className={`flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md sm:rounded-lg ${
                isCompleted
                  ? "bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300"
                  : "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
              }`}
            >
              <span className="text-xs font-medium whitespace-nowrap">
                {isCompleted
                  ? t("status.completed")
                  : role === "tutor"
                    ? t("status.teaching")
                    : t("status.inProgress")}
              </span>
            </div>
          </div>
        </div>

        {/* View Details Button */}
        <div className="flex flex-row-reverse mt-4">
          <EBButtonAction
            onClick={() => onViewDetails?.(enrollment.courseId)}
            className="group/btn flex items-center gap-3 px-4 py-2 sm:px-6 sm:py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto self-start lg:self-end hover:cursor-pointer"
          >
            {t("viewDetails")}
          </EBButtonAction>
        </div>

        {/* Decorative elements */}
        <div
          className={`absolute top-3 right-3 sm:top-4 sm:right-4 w-1.5 h-1.5 sm:w-2 sm:h-2 ${isCompleted ? "bg-emerald-400" : "bg-blue-400"} rounded-full opacity-60`}
        ></div>
      </EBMotionCard>
    );
  }
);

EnrolledCourseCard.displayName = "EnrolledCourseCard";

export default EnrolledCourseCard;
