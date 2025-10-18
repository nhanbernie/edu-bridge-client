import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface EnrolledCourseCardSkeletonProps {
  count?: number;
}
// NOTE: xóa đi
const EnrolledCourseCardSkeleton: React.FC<EnrolledCourseCardSkeletonProps> = ({ count = 3 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-start gap-4">
            {/* Avatar skeleton */}
            <Skeleton className="w-20 h-20 rounded-2xl flex-shrink-0" />

            <div className="flex-1 space-y-4">
              {/* Course title skeleton */}
              <Skeleton className="h-6 w-3/4" />

              {/* Tutor name skeleton */}
              <Skeleton className="h-4 w-1/2" />

              {/* Progress bar skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-2 w-full rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>

              {/* Stats skeleton */}
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-28" />
              </div>
            </div>

            {/* Status badge skeleton */}
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
        </div>
      ))}
    </>
  );
};

export default EnrolledCourseCardSkeleton;
