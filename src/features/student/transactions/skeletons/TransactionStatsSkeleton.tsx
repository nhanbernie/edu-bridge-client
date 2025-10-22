interface TransactionStatsSkeletonProps {
  className?: string;
}

export const TransactionStatsSkeleton = ({ className = "" }: TransactionStatsSkeletonProps) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 ${className}`}
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="bg-card rounded-2xl sm:rounded-3xl shadow-lg border border-border p-4 sm:p-6 animate-pulse"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-3 bg-muted rounded-lg sm:rounded-xl w-10 h-10 sm:w-12 sm:h-12"></div>
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-3 sm:h-4 bg-muted rounded w-20 sm:w-24"></div>
              <div className="h-6 sm:h-8 bg-muted rounded w-16 sm:w-20"></div>
              <div className="h-3 bg-muted rounded w-24 sm:w-32"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
