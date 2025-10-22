import { EBMotionCard } from "@/components/motion";

interface StatsSkeletonProps {
  className?: string;
}

export const StatsSkeleton = ({ className = "" }: StatsSkeletonProps) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 ${className}`}>
      {Array.from({ length: 3 }).map((_, index) => (
        <EBMotionCard
          key={index}
          variant="base"
          className="p-6 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl border-l-4 border-muted animate-pulse"
          initial={undefined}
          animate={undefined}
          whileHover={undefined}
          whileTap={undefined}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="h-4 bg-muted rounded w-24 mb-2"></div>
              <div className="h-8 bg-muted rounded w-12"></div>
            </div>
            <div className="w-8 h-8 bg-muted rounded"></div>
          </div>
        </EBMotionCard>
      ))}
    </div>
  );
};
