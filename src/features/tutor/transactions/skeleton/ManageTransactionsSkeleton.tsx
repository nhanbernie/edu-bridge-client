"use client";

import { MotionContainer, MotionItem } from "@/components/motion";

const ManageTransactionsSkeleton = () => {
  return (
    <MotionContainer className="min-h-screen space-y-6 lg:space-y-8">
      {/* Header Skeleton */}
      <MotionItem>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3 lg:mb-4 animate-pulse">
              <div className="h-8 bg-muted rounded w-64"></div>
            </div>
            <div className="h-5 bg-muted rounded w-80 animate-pulse"></div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full lg:w-auto">
            <div className="h-10 bg-muted rounded w-24 animate-pulse"></div>
          </div>
        </div>
      </MotionItem>

      {/* Stats Cards Skeleton */}
      <MotionItem>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-card rounded-2xl sm:rounded-3xl shadow-lg border border-border p-4 sm:p-6 animate-pulse"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 sm:p-3 bg-muted rounded-lg sm:rounded-xl"></div>
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-3 bg-muted rounded w-20"></div>
                  <div className="h-6 bg-muted rounded w-24"></div>
                  <div className="h-3 bg-muted rounded w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </MotionItem>

      {/* Transactions List Skeleton */}
      <MotionItem>
        <div className="bg-card rounded-2xl sm:rounded-3xl shadow-lg border border-border p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4 sm:mb-6 animate-pulse">
            <div className="h-5 w-5 sm:h-6 sm:w-6 bg-muted rounded"></div>
            <div className="h-6 sm:h-8 bg-muted rounded w-48"></div>
          </div>

          {/* Transaction Items Skeleton */}
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between p-4 bg-muted/20 rounded-xl animate-pulse"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="h-10 w-10 bg-muted rounded-full"></div>
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-32"></div>
                    <div className="h-3 bg-muted rounded w-24"></div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right space-y-2">
                    <div className="h-4 bg-muted rounded w-20"></div>
                    <div className="h-3 bg-muted rounded w-16"></div>
                  </div>
                  <div className="h-6 bg-muted rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MotionItem>
    </MotionContainer>
  );
};

export default ManageTransactionsSkeleton;
