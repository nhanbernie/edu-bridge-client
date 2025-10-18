import { TransactionStatsSkeleton } from "./TransactionStatsSkeleton";
import { TransactionCardSkeleton } from "@/components/common/skeletons";

interface TransactionPageSkeletonProps {
  className?: string;
}

export const TransactionPageSkeleton = ({ className = "" }: TransactionPageSkeletonProps) => {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Skeleton */}
        <div className="space-y-4 mb-8 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-8 sm:h-10 bg-muted rounded w-48 sm:w-64"></div>
              <div className="h-5 sm:h-6 bg-muted rounded w-64 sm:w-96"></div>
            </div>
            <div className="h-10 w-24 bg-muted rounded"></div>
          </div>
        </div>

        {/* Stats Cards Skeleton */}
        <TransactionStatsSkeleton />

        {/* Transaction List Skeleton */}
        <div className="bg-card rounded-2xl sm:rounded-3xl shadow-lg border border-border overflow-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            {/* Title Skeleton */}
            <div className="flex items-center justify-between mb-6 sm:mb-8 animate-pulse">
              <div className="h-6 sm:h-8 bg-muted rounded w-32 sm:w-48"></div>
            </div>

            {/* Transaction Cards Skeleton */}
            <TransactionCardSkeleton count={5} />
          </div>
        </div>
      </div>
    </div>
  );
};
