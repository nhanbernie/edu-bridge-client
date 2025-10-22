"use client";

import { MotionContainer, MotionItem } from "@/components/motion";

const ManageSchedulesSkeleton = () => {
  return (
    <MotionContainer className="space-y-8">
      {/* Header Skeleton */}
      <MotionItem>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4 animate-pulse">
              <div className="h-10 bg-muted rounded w-80"></div>
            </div>
            <div className="h-6 bg-muted rounded w-96 animate-pulse"></div>
          </div>
          <div className="flex gap-3">
            <div className="h-10 bg-muted rounded w-24 animate-pulse"></div>
            <div className="h-10 bg-muted rounded w-36 animate-pulse"></div>
          </div>
        </div>
      </MotionItem>

      {/* Stats Cards Skeleton */}
      <MotionItem>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-card rounded-3xl shadow-lg border border-border p-6 animate-pulse"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-muted rounded-xl"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-20"></div>
                  <div className="h-8 bg-muted rounded w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </MotionItem>

      {/* Current Schedules Skeleton */}
      <MotionItem>
        <div className="bg-card rounded-3xl shadow-lg border border-border p-6">
          <div className="flex items-center gap-3 mb-6 animate-pulse">
            <div className="h-6 w-6 bg-muted rounded"></div>
            <div className="h-8 bg-muted rounded w-48"></div>
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
    </MotionContainer>
  );
};

export default ManageSchedulesSkeleton;
