import { EBMotionCard } from "@/components/motion";

interface ReviewSkeletonProps {
  title?: string;
  className?: string;
}

export const ReviewSkeleton = ({ title, className = "" }: ReviewSkeletonProps) => {
  return (
    <div className={`bg-card rounded-3xl shadow-lg p-4 sm:p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        {title && <div className="h-6 sm:h-7 bg-muted animate-pulse rounded-lg w-32 sm:w-40"></div>}
        <div className="flex items-center">
          <div className="flex gap-1 mr-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-3 h-3 bg-muted animate-pulse rounded"></div>
            ))}
          </div>
          <div className="h-4 w-8 bg-muted animate-pulse rounded"></div>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {Array.from({ length: 2 }).map((_, index) => (
          <EBMotionCard
            key={index}
            variant="base"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 p-3 sm:p-4 border border-border/50 animate-pulse"
            initial={undefined}
            animate={undefined}
            whileHover={undefined}
            whileTap={undefined}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-muted mr-3"></div>
                <div>
                  <div className="h-4 bg-muted rounded w-20 mb-1"></div>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-muted rounded"></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="h-3 w-12 bg-muted rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-muted rounded w-full"></div>
              <div className="h-3 bg-muted rounded w-3/4"></div>
            </div>
          </EBMotionCard>
        ))}
      </div>
    </div>
  );
};
