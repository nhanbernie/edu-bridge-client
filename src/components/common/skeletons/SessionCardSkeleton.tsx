import React from "react";
import { EBMotionCard } from "@/components/motion";

interface SessionCardSkeletonProps {
  count?: number;
}

const SessionCardSkeleton: React.FC<SessionCardSkeletonProps> = ({ count = 3 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <EBMotionCard
          key={index}
          variant="base"
          className="p-4 sm:p-6 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl border-l-4 border-muted animate-pulse"
          initial={undefined}
          animate={undefined}
          whileHover={undefined}
          whileTap={undefined}
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex items-start gap-3 sm:gap-4">
              {/* Avatar skeleton */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-muted rounded-2xl flex-shrink-0"></div>

              <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
                {/* Name skeleton */}
                <div className="h-4 sm:h-5 bg-muted rounded w-24 sm:w-32"></div>

                {/* Course title skeleton */}
                <div className="h-3 sm:h-4 bg-muted rounded w-32 sm:w-48"></div>

                {/* Rating skeleton */}
                <div className="h-3 sm:h-4 bg-muted rounded w-16 sm:w-24"></div>
              </div>
            </div>

            {/* Right side - Time and button skeleton */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-end lg:items-end gap-2 sm:gap-3 lg:gap-3 w-full lg:w-auto">
              {/* Time badges */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="h-5 sm:h-6 bg-muted rounded w-20 sm:w-28"></div>
                <div className="h-5 sm:h-6 bg-muted rounded w-16 sm:w-20"></div>
              </div>

              {/* Button skeleton */}
              <div className="h-8 sm:h-9 bg-muted rounded w-full sm:w-24 lg:w-24"></div>
            </div>
          </div>
        </EBMotionCard>
      ))}
    </div>
  );
};

export default SessionCardSkeleton;
