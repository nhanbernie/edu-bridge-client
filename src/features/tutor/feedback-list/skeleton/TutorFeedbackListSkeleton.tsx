"use client";

import { MotionContainer, MotionItem } from "@/components/motion";

const TutorFeedbackListSkeleton = () => {
  return (
    <MotionContainer className="min-h-screen space-y-6 lg:space-y-8">
      {/* Header Skeleton */}
      <MotionItem>
        <div className="mb-6 lg:mb-8 animate-pulse">
          <div className="flex items-center gap-3 mb-3 lg:mb-4">
            <div className="h-10 w-80 bg-muted rounded"></div>
          </div>
          <div className="h-6 w-full bg-muted rounded"></div>
        </div>
      </MotionItem>

      {/* Stats Cards Skeleton */}
      <MotionItem>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-card rounded-2xl sm:rounded-3xl shadow-lg border border-border p-4 sm:p-6 animate-pulse"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-muted rounded-xl"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-24 bg-muted rounded"></div>
                  <div className="h-8 w-16 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </MotionItem>

      {/* Course Cards Skeleton */}
      <MotionItem>
        <div className="mb-6 lg:mb-8 animate-pulse">
          <div className="h-8 w-64 bg-muted rounded mb-4 sm:mb-6"></div>
          <div className="grid gap-4 sm:gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-card rounded-2xl sm:rounded-3xl shadow-lg border border-border p-4 sm:p-6 flex flex-col sm:flex-row sm:items-start gap-4 animate-pulse"
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-xl sm:rounded-2xl bg-muted"></div>
                <div className="flex-1 space-y-2 sm:space-y-3 min-w-0">
                  <div className="h-6 w-3/4 bg-muted rounded"></div>
                  <div className="h-4 w-1/2 bg-muted rounded"></div>
                  <div className="h-2 w-full bg-muted rounded-full"></div>
                  <div className="h-4 w-1/3 bg-muted rounded"></div>
                </div>
                <div className="h-8 w-24 bg-muted rounded-lg flex-shrink-0"></div>
              </div>
            ))}
          </div>
        </div>
      </MotionItem>
    </MotionContainer>
  );
};

export default TutorFeedbackListSkeleton;
