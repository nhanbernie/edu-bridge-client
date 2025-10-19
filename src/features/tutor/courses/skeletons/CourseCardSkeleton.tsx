import { EBMotionCard } from "@/components/motion";

interface CourseCardSkeletonProps {
  className?: string;
}

export const CourseCardSkeleton = ({ className = "" }: CourseCardSkeletonProps) => {
  return (
    <EBMotionCard
      variant="base"
      className={`p-4 sm:p-6 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl border-l-4 border-muted animate-pulse ${className}`}
      initial={undefined}
      animate={undefined}
      whileHover={undefined}
      whileTap={undefined}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="h-5 sm:h-6 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
          <div className="w-8 h-8 bg-muted rounded ml-4"></div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-3 sm:h-4 bg-muted rounded w-full"></div>
          <div className="h-3 sm:h-4 bg-muted rounded w-2/3"></div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-16"></div>
          </div>
          <div className="h-4 bg-muted rounded w-12"></div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 pt-2">
          <div className="h-8 w-8 bg-muted rounded"></div>
          <div className="h-8 w-8 bg-muted rounded"></div>
        </div>
      </div>
    </EBMotionCard>
  );
};
