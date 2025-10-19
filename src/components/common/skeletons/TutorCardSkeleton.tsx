import React from "react";
import { EBMotionCard } from "@/components/motion";

interface TutorCardSkeletonProps {
  count?: number;
}

const TutorCardSkeleton: React.FC<TutorCardSkeletonProps> = ({ count = 6 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <EBMotionCard
          key={index}
          variant="base"
          padding="sm"
          className="rounded-3xl overflow-hidden !bg-card border border-border p-3 shadow-xl animate-pulse"
          initial={undefined}
          animate={undefined}
          whileHover={undefined}
          whileTap={undefined}
        >
          {/* Avatar Section with Name Overlay */}
          <div className="relative mb-3">
            {/* Avatar Image Skeleton */}
            <div className="w-full h-48 sm:h-52 md:h-56 bg-muted rounded-2xl sm:rounded-3xl" />

            {/* Dark Overlay at Bottom with Name Skeleton */}
            <div
              className="absolute bottom-0 left-0 right-0 rounded-b-2xl sm:rounded-b-3xl
                            bg-gradient-to-t from-black/70 via-black/50 to-transparent
                            pt-8 pb-2 px-3"
            >
              <div className="h-5 sm:h-6 bg-white/20 rounded w-2/3 mx-auto" />
            </div>

            {/* Favorite Button Skeleton - Top Right */}
            <div
              className="absolute top-2 right-2 z-10 p-1.5 sm:p-2 rounded-full
                           bg-black/40 backdrop-blur-sm border border-white/20"
            >
              <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white/30 rounded" />
            </div>

            {/* Verified Badge Skeleton - Top Left */}
            <div className="absolute top-2 left-2">
              <div className="h-6 sm:h-7 w-20 sm:w-24 bg-white/30 rounded-full" />
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-3 sm:space-y-4">
            {/* Rating */}
            <div className="flex items-center justify-center gap-1.5">
              <div className="w-4 h-4 bg-muted rounded" />
              <div className="h-4 w-12 bg-muted rounded" />
              <div className="h-3 w-10 bg-muted rounded" />
            </div>

            {/* Subjects */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
              <div className="h-7 w-16 sm:w-20 bg-muted rounded-lg" />
              <div className="h-7 w-20 sm:w-24 bg-muted rounded-lg" />
              <div className="h-7 w-14 sm:w-16 bg-muted rounded-lg" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 py-3 border-t border-border">
              {/* Students */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-muted" />
                <div className="h-4 w-8 bg-muted rounded" />
                <div className="h-3 w-12 bg-muted rounded" />
              </div>

              {/* Courses */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-muted" />
                <div className="h-4 w-8 bg-muted rounded" />
                <div className="h-3 w-14 bg-muted rounded" />
              </div>

              {/* Experience */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-muted" />
                <div className="h-4 w-6 bg-muted rounded" />
                <div className="h-3 w-8 bg-muted rounded" />
              </div>
            </div>

            {/* Action Button */}
            <div className="h-10 sm:h-11 w-full bg-muted rounded-xl sm:rounded-2xl" />
          </div>
        </EBMotionCard>
      ))}
    </>
  );
};

export default TutorCardSkeleton;
