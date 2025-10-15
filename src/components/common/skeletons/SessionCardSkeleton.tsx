import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface SessionCardSkeletonProps {
  count?: number;
}

const SessionCardSkeleton: React.FC<SessionCardSkeletonProps> = ({ count = 3 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-start gap-4">
                {/* Avatar skeleton */}
                <Skeleton className="w-20 h-20 rounded-2xl flex-shrink-0" />

                <div className="flex-1 space-y-3">
                  {/* Name skeleton */}
                  <Skeleton className="h-5 w-32" />

                  {/* Course title skeleton */}
                  <Skeleton className="h-4 w-48" />

                  {/* Rating skeleton */}
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>

            {/* Right side - Time and button skeleton */}
            <div className="flex flex-col items-end gap-3 ml-4">
              {/* Time badges */}
              <div className="flex flex-col items-end gap-2">
                <Skeleton className="h-6 w-28" />
                <Skeleton className="h-6 w-20" />
              </div>

              {/* Button skeleton */}
              <Skeleton className="h-9 w-24 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SessionCardSkeleton;
