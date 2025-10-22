interface ChartSkeletonProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export const ChartSkeleton = ({ title, subtitle, className = "" }: ChartSkeletonProps) => {
  return (
    <div className={`bg-card rounded-3xl shadow-2xl p-4 sm:p-6 ${className}`}>
      <div className="mb-4 sm:mb-6">
        {title && (
          <div className="h-8 sm:h-9 bg-muted animate-pulse rounded-lg w-48 sm:w-64 mb-3"></div>
        )}
        {subtitle && <div className="h-5 sm:h-6 bg-muted animate-pulse rounded w-64 sm:w-80"></div>}
      </div>

      {/* Chart Area */}
      <div className="mb-4 sm:mb-6">
        <div className="h-48 sm:h-64 bg-muted/30 animate-pulse rounded-lg relative overflow-hidden">
          {/* Simulate chart lines */}
          <div className="absolute inset-0 flex items-end justify-between px-4 pb-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-muted animate-pulse rounded-t"
                style={{
                  height: `${Math.random() * 60 + 20}%`,
                  width: "8px",
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-relaxed font-medium">
          <div className="h-4 bg-muted animate-pulse rounded w-32"></div>
          <div className="w-4 h-4 bg-muted animate-pulse rounded"></div>
        </div>
        <div className="h-4 bg-muted animate-pulse rounded w-48"></div>
      </div>
    </div>
  );
};
