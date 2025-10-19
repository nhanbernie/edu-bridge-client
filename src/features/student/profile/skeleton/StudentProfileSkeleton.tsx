"use client";

import { Card, CardContent } from "@/components/ui/card";

const StudentProfileSkeleton = () => {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {/* Header Skeleton */}
        <div className="mb-6 lg:mb-8 animate-pulse">
          <div className="h-8 sm:h-10 lg:h-12 w-48 sm:w-64 lg:w-80 bg-muted rounded mb-3 lg:mb-4"></div>
          <div className="h-5 sm:h-6 lg:h-7 w-64 sm:w-80 lg:w-96 bg-muted rounded"></div>
        </div>

        {/* Profile Form Skeleton */}
        <Card className="border-0 shadow-lg rounded-2xl sm:rounded-3xl h-fit animate-pulse">
          <CardContent className="p-4 sm:p-6">
            {/* Avatar Section Skeleton */}
            <div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-border bg-muted p-4 sm:p-5 rounded-2xl sm:rounded-3xl">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-muted/50 rounded-full"></div>
              <div className="flex-1 min-w-0 space-y-2">
                <div className="h-5 sm:h-6 w-32 sm:w-40 bg-muted/50 rounded"></div>
                <div className="h-4 sm:h-5 w-40 sm:w-48 bg-muted/50 rounded"></div>
              </div>
            </div>

            {/* Form Fields Skeleton */}
            <div className="space-y-4 sm:space-y-6">
              {/* Section Title */}
              <div className="h-5 sm:h-6 w-32 sm:w-40 bg-muted rounded"></div>

              {/* Fields */}
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="space-y-2">
                  <div className="h-4 w-20 sm:w-24 bg-muted rounded"></div>
                  <div className="h-10 sm:h-11 w-full bg-muted rounded"></div>
                </div>
              ))}

              {/* Section Divider */}
              <div className="pt-4 border-t border-border">
                <div className="h-5 sm:h-6 w-28 sm:w-36 bg-muted rounded mb-4 sm:mb-6"></div>
              </div>

              {/* More Fields */}
              {[1, 2].map((item) => (
                <div key={item} className="space-y-2">
                  <div className="h-4 w-20 sm:w-24 bg-muted rounded"></div>
                  <div className="h-10 sm:h-11 w-full bg-muted rounded"></div>
                </div>
              ))}

              {/* Action Button Skeleton */}
              <div className="h-10 sm:h-11 w-full bg-muted rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentProfileSkeleton;
