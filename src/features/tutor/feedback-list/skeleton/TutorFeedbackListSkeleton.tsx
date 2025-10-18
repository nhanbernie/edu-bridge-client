"use client";

import { MotionContainer, MotionItem } from "@/components/motion";

const TutorFeedbackListSkeleton = () => {
  return (
    <MotionContainer className="min-h-screen space-y-6 lg:space-y-8">
      {/* Header Skeleton */}
      <MotionItem>
        <div className="mb-6 lg:mb-8">
          <div className="flex items-center gap-3 mb-3 lg:mb-4 animate-pulse">
            <div className="h-8 bg-muted rounded w-64"></div>
          </div>
          <div className="h-5 bg-muted rounded w-80 animate-pulse"></div>
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
                <div className="p-2 sm:p-3 bg-muted rounded-lg sm:rounded-xl"></div>
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="h-3 bg-muted rounded w-20"></div>
                  <div className="h-6 bg-muted rounded w-12"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </MotionItem>

      {/* Course Cards Skeleton */}
      <MotionItem>
        <div className="space-y-6">
          {/* Section Title Skeleton */}
          <div className="animate-pulse">
            <div className="h-6 bg-muted rounded w-48 mb-4"></div>
          </div>

          {/* Course Cards Grid */}
          <div className="grid gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-card rounded-2xl sm:rounded-3xl shadow-lg border border-border p-4 sm:p-6 animate-pulse"
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Course Image Skeleton */}
                  <div className="w-full sm:w-32 h-32 sm:h-24 bg-muted rounded-xl flex-shrink-0"></div>

                  {/* Course Info Skeleton */}
                  <div className="flex-1 min-w-0 space-y-3">
                    <div className="space-y-2">
                      <div className="h-5 bg-muted rounded w-3/4"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <div className="h-6 bg-muted rounded-full w-16"></div>
                      <div className="h-6 bg-muted rounded-full w-20"></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="h-3 bg-muted rounded w-24"></div>
                        <div className="h-4 bg-muted rounded w-16"></div>
                      </div>
                      <div className="h-8 bg-muted rounded w-20"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MotionItem>
    </MotionContainer>
  );
};

export default TutorFeedbackListSkeleton;
