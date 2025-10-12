import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface TransactionCardSkeletonProps {
  count?: number;
}

const TransactionCardSkeleton: React.FC<TransactionCardSkeletonProps> = ({ count = 5 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              {/* Icon skeleton */}
              <Skeleton className="w-10 h-10 rounded-lg" />

              <div className="flex-1 space-y-2">
                {/* Title skeleton */}
                <Skeleton className="h-5 w-48" />

                {/* Description skeleton */}
                <Skeleton className="h-4 w-32" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Amount skeleton */}
              <Skeleton className="h-6 w-28" />

              {/* Status badge skeleton */}
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TransactionCardSkeleton;
