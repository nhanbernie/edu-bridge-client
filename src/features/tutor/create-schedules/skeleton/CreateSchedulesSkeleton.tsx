"use client";

import { MotionContainer, MotionItem } from "@/components/motion";

const CreateSchedulesSkeleton = () => {
  return (
    <MotionContainer className="space-y-8">
      {/* Header Skeleton */}
      <MotionItem>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4 animate-pulse">
            <div className="h-10 bg-muted rounded w-80"></div>
          </div>
          <div className="h-6 bg-muted rounded w-96 mb-6 animate-pulse"></div>
          <div className="h-10 bg-muted rounded w-48 animate-pulse"></div>
        </div>
      </MotionItem>

      {/* Current Schedules Card Skeleton */}
      <MotionItem>
        <div className="bg-card rounded-3xl shadow-lg border border-border p-6 mb-8">
          <div className="flex items-center gap-3 mb-6 animate-pulse">
            <div className="h-6 w-6 bg-muted rounded"></div>
            <div className="h-8 bg-muted rounded w-48"></div>
            <div className="h-6 bg-muted rounded w-32"></div>
          </div>

          {/* Schedule Grid Skeleton */}
          <div className="space-y-4">
            {/* Week Header */}
            <div className="grid grid-cols-8 gap-2">
              <div></div>
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <div key={day} className="text-center animate-pulse">
                  <div className="h-4 bg-muted rounded w-8 mx-auto mb-2"></div>
                  <div className="h-8 w-8 bg-muted rounded-full mx-auto"></div>
                </div>
              ))}
            </div>

            {/* Time Slots */}
            <div className="space-y-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((slot) => (
                <div key={slot} className="grid grid-cols-8 gap-2 animate-pulse">
                  <div className="h-6 bg-muted rounded w-12"></div>
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <div key={day} className="h-6 bg-muted rounded w-full"></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </MotionItem>

      {/* Calendar Component Skeleton */}
      <MotionItem>
        <div className="space-y-4">
          {/* Calendar Header Skeleton */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
            <div className="animate-pulse">
              <div className="h-6 bg-muted rounded w-32 mb-2"></div>
              <div className="h-4 bg-muted rounded w-80"></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto animate-pulse">
              <div className="h-8 bg-muted rounded w-24"></div>
              <div className="h-8 bg-muted rounded w-20"></div>
            </div>
          </div>

          {/* Legend Skeleton */}
          <div className="flex flex-wrap gap-3 sm:gap-6 mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-muted/20 to-muted/10 rounded-xl sm:rounded-2xl border border-border/30">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-2 sm:gap-3 animate-pulse">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-muted rounded-lg"></div>
                <div className="h-4 bg-muted rounded w-16"></div>
              </div>
            ))}
          </div>

          {/* Calendar Container Skeleton */}
          <div className="bg-card rounded-4xl border border-border shadow-sm p-2 sm:p-4">
            <div className="space-y-4 animate-pulse">
              {/* Calendar Header */}
              <div className="flex items-center justify-between">
                <div className="h-8 bg-muted rounded w-20"></div>
                <div className="h-8 bg-muted rounded w-32"></div>
                <div className="h-8 bg-muted rounded w-20"></div>
              </div>

              {/* Calendar Grid */}
              <div className="space-y-2">
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <div key={day} className="text-center">
                      <div className="h-4 bg-muted rounded w-8 mx-auto mb-2"></div>
                      <div className="h-8 w-8 bg-muted rounded-full mx-auto"></div>
                    </div>
                  ))}
                </div>

                {/* Time Slots */}
                <div className="space-y-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((slot) => (
                    <div key={slot} className="grid grid-cols-7 gap-2">
                      <div className="h-6 bg-muted rounded w-12"></div>
                      {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                        <div key={day} className="h-6 bg-muted rounded w-full"></div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </MotionItem>
    </MotionContainer>
  );
};

export default CreateSchedulesSkeleton;
