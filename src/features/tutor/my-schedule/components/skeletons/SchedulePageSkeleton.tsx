import { StatsSkeleton } from "./StatsSkeleton";
import { SessionCardSkeleton } from "@/components/common/skeletons";

interface SchedulePageSkeletonProps {
  className?: string;
}

export const SchedulePageSkeleton = ({ className = "" }: SchedulePageSkeletonProps) => {
  return (
    <div className={`min-h-screen ${className}`}>
      {/* Header Skeleton */}
      <div className="space-y-4 mb-8 animate-pulse">
        <div className="h-10 bg-muted rounded w-64"></div>
        <div className="h-6 bg-muted rounded w-96"></div>
      </div>

      {/* Stats Cards Skeleton */}
      <StatsSkeleton />

      {/* Schedule Content Skeleton */}
      <div className="bg-card rounded-3xl shadow-lg border border-border overflow-hidden mb-8">
        <div className="p-8">
          {/* Title Skeleton */}
          <div className="flex items-center justify-between mb-8 animate-pulse">
            <div className="h-8 bg-muted rounded w-48"></div>
          </div>

          {/* Tabs Skeleton */}
          <div className="flex items-center justify-between mb-8 animate-pulse">
            <div className="flex gap-4">
              <div className="h-10 bg-muted rounded w-24"></div>
              <div className="h-10 bg-muted rounded w-24"></div>
            </div>
          </div>

          {/* Session Cards Skeleton */}
          <div className="mb-8">
            <SessionCardSkeleton count={3} />
          </div>
        </div>
      </div>
    </div>
  );
};
