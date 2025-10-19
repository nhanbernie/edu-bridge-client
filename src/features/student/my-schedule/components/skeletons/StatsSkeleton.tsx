import { EBMotionCard } from "@/components/motion";

interface StatsSkeletonProps {
  className?: string;
}

export const StatsSkeleton = ({ className = "" }: StatsSkeletonProps) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 ${className}`}
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <EBMotionCard
          key={index}
          variant="base"
          className="p-4 sm:p-6 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl border-l-4 border-muted animate-pulse"
          initial={undefined}
          animate={undefined}
          whileHover={undefined}
          whileTap={undefined}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="h-3 sm:h-4 bg-muted rounded w-20 sm:w-24 mb-2"></div>
              <div className="h-6 sm:h-8 bg-muted rounded w-10 sm:w-12"></div>
            </div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-muted rounded"></div>
          </div>
        </EBMotionCard>
      ))}
    </div>
  );
};
