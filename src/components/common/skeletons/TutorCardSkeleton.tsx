import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface TutorCardSkeletonProps {
  count?: number;
}

const TutorCardSkeleton: React.FC<TutorCardSkeletonProps> = ({ count = 6 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
        >
          <div className="p-6">
            {/* Avatar and basic info */}
            <div className="flex items-start gap-4 mb-4">
              <Skeleton className="w-16 h-16 rounded-full flex-shrink-0" />

              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>

              <Skeleton className="w-6 h-6 rounded-full" />
            </div>

            {/* Rating and stats */}
            <div className="flex items-center gap-4 mb-4">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-28" />
            </div>

            {/* Subjects */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>

            {/* Bio */}
            <div className="space-y-2 mb-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Bottom info */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-9 w-28 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TutorCardSkeleton;
