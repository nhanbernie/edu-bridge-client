import { StatsSkeleton } from "./StatsSkeleton";
import { SessionCardSkeleton } from "@/components/common/skeletons";
import {
  PAGE_CONTAINER,
  CONTENT_WRAPPER,
  PAGE_HEADER,
} from "@/common/constants/className.constant";

interface SchedulePageSkeletonProps {
  className?: string;
}

export const SchedulePageSkeleton = ({ className = "" }: SchedulePageSkeletonProps) => {
  return (
    <div className={PAGE_CONTAINER}>
      <div className={CONTENT_WRAPPER}>
        {/* Header Skeleton */}
        <div className={`${PAGE_HEADER} animate-pulse`}>
          <div className="h-8 sm:h-10 bg-muted rounded w-48 sm:w-64 mb-2"></div>
          <div className="h-5 sm:h-6 bg-muted rounded w-64 sm:w-96"></div>
        </div>

        {/* Stats Cards Skeleton */}
        <StatsSkeleton />

        {/* Schedule Content Skeleton */}
        <div className="bg-card rounded-2xl sm:rounded-3xl shadow-lg border border-border overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Title Skeleton */}
            <div className="flex items-center justify-between mb-6 sm:mb-8 animate-pulse">
              <div className="h-6 sm:h-8 bg-muted rounded w-32 sm:w-48"></div>
            </div>

            {/* Tabs Skeleton */}
            <div className="flex items-center justify-between mb-6 sm:mb-8 animate-pulse">
              <div className="flex gap-2 sm:gap-4">
                <div className="h-8 sm:h-10 bg-muted rounded w-20 sm:w-24"></div>
                <div className="h-8 sm:h-10 bg-muted rounded w-20 sm:w-24"></div>
              </div>
            </div>

            {/* Session Cards Skeleton */}
            <SessionCardSkeleton count={3} />
          </div>
        </div>
      </div>
    </div>
  );
};
