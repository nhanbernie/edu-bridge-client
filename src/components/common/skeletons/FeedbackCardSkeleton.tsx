import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface FeedbackCardSkeletonProps {
  count?: number;
}

const FeedbackCardSkeleton: React.FC<FeedbackCardSkeletonProps> = ({ count = 3 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="space-y-4">
            {/* Header - Student name and date */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-4 w-20" />
            </div>

            {/* Course title skeleton */}
            <Skeleton className="h-4 w-3/4" />

            {/* Ratings skeleton */}
            <div className="flex items-center gap-6">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-5 w-28" />
            </div>

            {/* Comment skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default FeedbackCardSkeleton;
