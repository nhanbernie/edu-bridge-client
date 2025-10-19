"use client";

import { Card, CardContent } from "@/components/ui/card";

const TutorProfileSkeleton = () => {
  return (
    <div className="min-h-screen space-y-6 lg:space-y-8">
      {/* Header Skeleton */}
      <div className="mb-6 lg:mb-8 animate-pulse">
        <div className="flex items-center gap-3 mb-3 lg:mb-4">
          <div className="h-8 sm:h-10 lg:h-12 w-64 sm:w-80 lg:w-96 bg-muted rounded"></div>
          <div className="h-6 w-20 bg-muted rounded-full"></div>
        </div>
        <div className="h-5 sm:h-6 lg:h-7 w-80 sm:w-96 lg:w-full bg-muted rounded"></div>
      </div>

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* LEFT COLUMN - Profile Form Skeleton */}
        <div className="order-1">
          <Card className="rounded-3xl border-0 shadow-lg bg-card animate-pulse">
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Avatar Section Skeleton */}
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-muted rounded-full"></div>
                  <div className="flex-1 space-y-2 text-center sm:text-left">
                    <div className="h-6 w-48 bg-muted rounded mx-auto sm:mx-0"></div>
                    <div className="h-4 w-32 bg-muted rounded mx-auto sm:mx-0"></div>
                    <div className="h-8 w-24 bg-muted rounded mx-auto sm:mx-0"></div>
                  </div>
                </div>

                {/* Form Fields Skeleton */}
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="space-y-2">
                      <div className="h-4 w-24 bg-muted rounded"></div>
                      <div className="h-10 w-full bg-muted rounded"></div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons Skeleton */}
                <div className="flex gap-3">
                  <div className="h-10 w-20 bg-muted rounded"></div>
                  <div className="h-10 w-20 bg-muted rounded"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT COLUMN - Video & Certificates Skeleton */}
        <div className="space-y-6 order-2">
          {/* Video Intro Section Skeleton */}
          <Card className="rounded-3xl border-0 shadow-lg bg-card animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="h-6 w-32 bg-muted rounded"></div>
                <div className="h-8 w-16 bg-muted rounded"></div>
              </div>
              <div className="w-full aspect-video bg-muted rounded-xl sm:rounded-2xl"></div>
            </CardContent>
          </Card>

          {/* Certificates Section Skeleton */}
          <Card className="rounded-3xl border-0 shadow-lg bg-card animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <div className="h-6 w-32 bg-muted rounded"></div>
                <div className="h-8 w-20 bg-muted rounded"></div>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-12 h-12 bg-muted rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-3/4 bg-muted rounded"></div>
                      <div className="h-3 w-1/2 bg-muted rounded"></div>
                    </div>
                    <div className="w-6 h-6 bg-muted rounded"></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TutorProfileSkeleton;
