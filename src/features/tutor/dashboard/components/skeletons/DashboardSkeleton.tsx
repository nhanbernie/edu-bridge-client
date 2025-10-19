import { EBMotionCard } from "@/components/motion";

interface DashboardSkeletonProps {
  title?: string;
  className?: string;
}

export const DashboardSkeleton = ({ title, className = "" }: DashboardSkeletonProps) => {
  return (
    <div className={`bg-card rounded-3xl shadow-lg p-4 sm:p-6 ${className}`}>
      {title && (
        <div className="mb-4 sm:mb-6">
          <div className="h-6 sm:h-7 bg-muted animate-pulse rounded-lg w-32 sm:w-40"></div>
        </div>
      )}
      <div className="space-y-3 sm:space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <EBMotionCard
            key={index}
            variant="base"
            className="p-3 sm:p-4 bg-gradient-to-r from-muted/50 to-muted/30 rounded-xl border-l-4 border-muted animate-pulse"
            initial={undefined}
            animate={undefined}
            whileHover={undefined}
            whileTap={undefined}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="h-4 sm:h-5 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 sm:h-4 bg-muted rounded w-1/2"></div>
              </div>
              <div className="flex flex-col sm:flex-row sm:text-right gap-2 sm:gap-0 sm:ml-4">
                <div className="h-4 sm:h-5 bg-muted rounded w-16 sm:w-20"></div>
                <div className="h-3 sm:h-4 bg-muted rounded w-12 sm:w-16"></div>
              </div>
            </div>
          </EBMotionCard>
        ))}
      </div>
    </div>
  );
};
