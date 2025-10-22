"use client";

import { MotionContainer, MotionItem } from "@/components/motion";
import { FeedbackCardSkeleton } from "@/components/common/skeletons";

const TutorFeedbackSkeleton = () => {
  return (
    <MotionContainer className="min-h-screen space-y-6 lg:space-y-8">
      {/* Header Skeleton */}
      <MotionItem>
        <div className="mb-6 lg:mb-8 animate-pulse">
          {/* Back Button Skeleton */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-4 w-4 bg-muted rounded"></div>
            <div className="h-4 w-20 bg-muted rounded"></div>
          </div>

          {/* Title and Subtitle Skeleton */}
          <div className="flex items-center gap-3 mb-3 lg:mb-4">
            <div className="h-8 sm:h-10 lg:h-12 w-64 sm:w-80 lg:w-96 bg-muted rounded"></div>
          </div>
          <div className="h-5 sm:h-6 lg:h-7 w-80 sm:w-96 lg:w-full bg-muted rounded"></div>
        </div>
      </MotionItem>

      {/* Content Skeleton */}
      <MotionItem>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column - Rating Summary Skeleton */}
          <div className="order-2 lg:order-1 animate-pulse">
            <div className="bg-card rounded-2xl sm:rounded-3xl shadow-lg border border-border p-4 sm:p-6">
              <div className="text-center space-y-4 sm:space-y-6">
                {/* Average Rating Skeleton */}
                <div className="space-y-2 sm:space-y-3">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 bg-muted rounded-full mx-auto"></div>
                  <div className="h-8 w-20 sm:h-10 sm:w-24 bg-muted rounded mx-auto"></div>
                  <div className="h-4 w-32 sm:w-40 bg-muted rounded mx-auto"></div>
                </div>

                {/* Rating Breakdown Skeleton */}
                <div className="space-y-3 sm:space-y-4">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="flex items-center gap-2 sm:gap-3">
                      <div className="h-4 w-8 sm:w-10 bg-muted rounded"></div>
                      <div className="flex-1 h-2 bg-muted rounded-full"></div>
                      <div className="h-4 w-8 sm:w-10 bg-muted rounded"></div>
                    </div>
                  ))}
                </div>

                {/* Total Reviews Skeleton */}
                <div className="h-4 w-32 sm:w-40 bg-muted rounded mx-auto"></div>
              </div>
            </div>
          </div>

          {/* Right Column - Feedbacks List Skeleton */}
          <div className="space-y-4 sm:space-y-6 order-1 lg:order-2 animate-pulse">
            {/* Section Title Skeleton */}
            <div className="h-6 sm:h-7 w-48 sm:w-56 bg-muted rounded"></div>

            {/* Feedback Cards Skeleton */}
            <div className="space-y-4 sm:space-y-6">
              <FeedbackCardSkeleton count={3} />
            </div>
          </div>
        </div>
      </MotionItem>
    </MotionContainer>
  );
};

export default TutorFeedbackSkeleton;
