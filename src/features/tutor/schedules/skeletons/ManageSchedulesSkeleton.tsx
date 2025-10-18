"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { MotionContainer, MotionItem } from "@/components/motion";

const ManageSchedulesSkeleton = () => {
  return (
    <MotionContainer className="space-y-8">
      {/* Header Skeleton */}
      <MotionItem>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Skeleton className="h-10 w-80" />
            </div>
            <Skeleton className="h-6 w-96" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-36" />
          </div>
        </div>
      </MotionItem>

      {/* Stats Cards Skeleton */}
      <MotionItem>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-card rounded-3xl shadow-lg border border-border p-6">
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </MotionItem>

      {/* Current Schedules Skeleton */}
      <MotionItem>
        <div className="bg-card rounded-3xl shadow-lg border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="h-8 w-48" />
          </div>

          {/* Schedule Grid Skeleton */}
          <div className="space-y-4">
            {/* Week Header */}
            <div className="grid grid-cols-8 gap-2">
              <div></div>
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <div key={day} className="text-center">
                  <Skeleton className="h-4 w-8 mx-auto mb-2" />
                  <Skeleton className="h-8 w-8 mx-auto rounded-full" />
                </div>
              ))}
            </div>

            {/* Time Slots */}
            <div className="space-y-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((slot) => (
                <div key={slot} className="grid grid-cols-8 gap-2">
                  <Skeleton className="h-6 w-12" />
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <Skeleton key={day} className="h-6 w-full rounded" />
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
