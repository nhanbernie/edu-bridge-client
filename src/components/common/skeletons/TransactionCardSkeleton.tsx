import React from "react";

interface TransactionCardSkeletonProps {
  count?: number;
}

const TransactionCardSkeleton: React.FC<TransactionCardSkeletonProps> = ({ count = 5 }) => {
  return (
    <div className="divide-y divide-border">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="p-6 animate-pulse">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {/* Amount + Status Badge */}
              <div className="flex items-center gap-4 mb-3">
                {/* Amount skeleton */}
                <div className="h-6 bg-muted rounded w-28"></div>
                {/* Status badge skeleton */}
                <div className="h-6 bg-muted rounded w-20"></div>
              </div>

              {/* Description skeleton */}
              <div className="mb-4">
                <div className="h-4 bg-muted rounded w-full max-w-md"></div>
              </div>

              {/* Date + FlowType badges */}
              <div className="flex items-center gap-4">
                {/* Date badge skeleton */}
                <div className="h-6 bg-muted rounded w-32"></div>
                {/* FlowType badge skeleton */}
                <div className="h-6 bg-muted rounded w-24"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionCardSkeleton;
