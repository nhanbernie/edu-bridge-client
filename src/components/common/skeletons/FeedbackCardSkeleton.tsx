import React from "react";
import { EBMotionCard } from "@/components/motion";
import { CardContent } from "@/components/ui/card";

interface FeedbackCardSkeletonProps {
  count?: number;
}

const FeedbackCardSkeleton: React.FC<FeedbackCardSkeletonProps> = ({ count = 3 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <EBMotionCard
          key={index}
          className="border-0 shadow-lg animate-pulse"
          initial={undefined}
          animate={undefined}
          whileHover={undefined}
          whileTap={undefined}
        >
          <CardContent className="">
            {/* Student Name Skeleton */}
            <div className="h-5 w-32 bg-muted/70 rounded mb-1"></div>

            {/* Course Title and Date Skeleton */}
            <div className="h-4 w-48 bg-muted/60 rounded mb-3"></div>

            {/* Ratings Skeleton */}
            <div className="space-y-2 mb-3">
              {/* Tutor Rating */}
              <div className="flex items-center gap-2">
                <div className="h-4 w-12 bg-muted/60 rounded"></div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-muted/50 rounded-full"></div>
                  ))}
                </div>
              </div>

              {/* Course Rating */}
              <div className="flex items-center gap-2">
                <div className="h-4 w-12 bg-muted/60 rounded"></div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-muted/50 rounded-full"></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Comment Skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-muted/60 rounded"></div>
              <div className="h-4 w-full bg-muted/60 rounded"></div>
              <div className="h-4 w-2/3 bg-muted/60 rounded"></div>
            </div>
          </CardContent>
        </EBMotionCard>
      ))}
    </>
  );
};

export default FeedbackCardSkeleton;
