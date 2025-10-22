import React from "react";
import { EBMotionCard } from "@/components/motion";

interface EnrolledCourseCardSkeletonProps {
  count?: number;
}

const EnrolledCourseCardSkeleton: React.FC<EnrolledCourseCardSkeletonProps> = ({ count = 3 }) => {
  return (
    <div className="grid gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <EBMotionCard
          key={index}
          variant="base"
          className="relative bg-gradient-to-r from-card to-muted/30 rounded-xl sm:rounded-2xl px-4 py-4 sm:px-6 sm:py-5 border border-border shadow-sm animate-pulse"
          initial={undefined}
          animate={undefined}
          whileHover={undefined}
          whileTap={undefined}
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-3 sm:gap-4">
                {/* Avatar skeleton */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-xl sm:rounded-2xl bg-muted"></div>

                <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
                  {/* Course title skeleton */}
                  <div className="h-5 sm:h-6 bg-muted rounded w-3/4"></div>

                  {/* Tutor info skeleton */}
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 sm:h-4 sm:w-4 bg-muted rounded"></div>
                    <div className="h-3 sm:h-4 bg-muted rounded w-32"></div>
                  </div>

                  {/* Progress info skeleton */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="h-3 w-3 bg-muted rounded"></div>
                      <div className="h-3 bg-muted rounded w-24"></div>
                    </div>
                    <div className="h-3 bg-muted rounded w-8"></div>
                  </div>

                  {/* Progress bar skeleton */}
                  <div className="w-full bg-muted/50 rounded-full h-1.5 sm:h-2">
                    <div className="h-full bg-muted rounded-full w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status badge skeleton */}
            <div className="flex justify-end sm:ml-6 sm:flex-shrink-0">
              <div className="h-6 sm:h-7 bg-muted rounded-md sm:rounded-lg w-20 sm:w-24"></div>
            </div>
          </div>

          {/* Decorative dot skeleton */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-muted rounded-full opacity-60"></div>
        </EBMotionCard>
      ))}
    </div>
  );
};

export default EnrolledCourseCardSkeleton;
