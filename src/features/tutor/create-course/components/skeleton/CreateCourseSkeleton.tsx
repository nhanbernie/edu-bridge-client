import { EBMotionCard } from "@/components/motion";

interface CreateCourseSkeletonProps {
  className?: string;
}

export const CreateCourseSkeleton = ({ className = "" }: CreateCourseSkeletonProps) => {
  return (
    <div className={`min-h-screen ${className}`}>
      {/* Header Skeleton */}
      <div className="mb-8 animate-pulse">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-10 bg-muted rounded w-64"></div>
        </div>
        <div className="h-6 bg-muted rounded w-96 mb-6"></div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 bg-muted rounded"></div>
          <div className="h-5 bg-muted rounded w-32"></div>
        </div>
      </div>

      {/* Form Content Skeleton */}
      <div className="bg-card rounded-3xl shadow-lg border border-border p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section Skeleton */}
          <EBMotionCard
            variant="base"
            className="h-fit rounded-3xl bg-gradient-to-r from-muted/50 to-muted/30 border-l-4 border-muted animate-pulse"
            initial={undefined}
            animate={undefined}
            whileHover={undefined}
            whileTap={undefined}
          >
            <div className="p-6">
              {/* Card Header */}
              <div className="flex items-center gap-2 mb-6">
                <div className="h-5 w-5 bg-muted rounded"></div>
                <div className="h-6 bg-muted rounded w-40"></div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* Title Field */}
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-24"></div>
                  <div className="h-10 bg-muted rounded w-full"></div>
                </div>

                {/* Subjects Field */}
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-32"></div>
                  <div className="h-10 bg-muted rounded w-full"></div>
                </div>

                {/* Description Field */}
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-28"></div>
                  <div className="h-24 bg-muted rounded w-full"></div>
                </div>

                {/* Hours Field */}
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-36"></div>
                  <div className="h-10 bg-muted rounded w-full"></div>
                </div>

                {/* Price Field */}
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-32"></div>
                  <div className="h-10 bg-muted rounded w-full"></div>
                </div>

                {/* Switch Field */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="h-4 bg-muted rounded w-32"></div>
                    <div className="h-3 bg-muted rounded w-48"></div>
                  </div>
                  <div className="h-6 w-11 bg-muted rounded-full"></div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <div className="h-12 bg-muted rounded-xl w-full"></div>
                </div>
              </div>
            </div>
          </EBMotionCard>

          {/* Preview Section Skeleton */}
          <div className="lg:sticky lg:top-6">
            <EBMotionCard
              variant="base"
              className="shadow-sm border-border rounded-3xl bg-gradient-to-r from-muted/50 to-muted/30 border-l-4 border-muted animate-pulse"
              initial={undefined}
              animate={undefined}
              whileHover={undefined}
              whileTap={undefined}
            >
              <div className="p-6">
                {/* Preview Header */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-5 w-5 bg-muted rounded"></div>
                  <div className="h-6 bg-muted rounded w-20"></div>
                </div>

                {/* Course Preview Card */}
                <EBMotionCard
                  variant="base"
                  className="border border-border rounded-lg bg-gradient-to-r from-muted/30 to-muted/20 animate-pulse"
                  initial={undefined}
                  animate={undefined}
                  whileHover={undefined}
                  whileTap={undefined}
                >
                  <div className="p-4">
                    {/* Course Title */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="h-6 bg-muted rounded w-3/4"></div>
                      <div className="h-5 bg-muted rounded w-16"></div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2 mb-4">
                      <div className="h-3 bg-muted rounded w-full"></div>
                      <div className="h-3 bg-muted rounded w-2/3"></div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <div className="h-4 w-4 bg-muted rounded"></div>
                        <div className="h-4 bg-muted rounded w-16"></div>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="h-4 w-4 bg-muted rounded"></div>
                        <div className="h-4 bg-muted rounded w-12"></div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="pt-2 border-t border-border">
                      <div className="h-6 bg-muted rounded w-32 mb-1"></div>
                      <div className="h-3 bg-muted rounded w-24"></div>
                    </div>
                  </div>
                </EBMotionCard>

                {/* Packages Preview */}
                <div className="mt-6">
                  <div className="h-5 bg-muted rounded w-32 mb-3"></div>
                  <div className="space-y-3">
                    {[1, 2, 3].map((index) => (
                      <EBMotionCard
                        key={index}
                        variant="base"
                        className="border border-border rounded-lg flex justify-between items-center p-4 bg-muted/30 animate-pulse"
                        initial={undefined}
                        animate={undefined}
                        whileHover={undefined}
                        whileTap={undefined}
                      >
                        <div className="space-y-1">
                          <div className="h-4 bg-muted rounded w-20"></div>
                          <div className="h-3 bg-muted rounded w-8"></div>
                        </div>
                        <div className="h-4 bg-muted rounded w-16"></div>
                      </EBMotionCard>
                    ))}
                  </div>
                </div>

                {/* Note */}
                <div className="mt-4 p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-1">
                    <div className="h-4 w-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-48"></div>
                  </div>
                </div>
              </div>
            </EBMotionCard>
          </div>
        </div>
      </div>
    </div>
  );
};
