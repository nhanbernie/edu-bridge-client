import { EBMotionCard } from "@/components/motion";
import { CourseCardSkeleton } from "./CourseCardSkeleton";

interface ManageCoursesSkeletonProps {
  className?: string;
}

export const ManageCoursesSkeleton = ({ className = "" }: ManageCoursesSkeletonProps) => {
  return (
    <div className={`min-h-screen ${className}`}>
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-0 animate-pulse">
        <div className="flex-1 min-w-0">
          <div className="h-8 sm:h-10 bg-muted rounded w-48 sm:w-64 mb-2"></div>
          <div className="h-5 sm:h-6 bg-muted rounded w-64 sm:w-80"></div>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="h-10 w-10 bg-muted rounded"></div>
          <div className="h-10 bg-muted rounded w-32 sm:w-40"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <CourseCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};
