// Removed constants import - using theme system instead
import { useReviewData } from "@/features/tutor/dashboard/hooks/useReviewData";
import { EBMotionCard } from "@/components/motion";
import { useTranslations } from "next-intl";

const Review = () => {
  const { reviewItems, averageRating, isLoading, feedbacksError, hasReviews } = useReviewData();
  const t = useTranslations("tutor.dashboard.reviews");

  if (isLoading) {
    return (
      <div className="bg-card rounded-3xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">{t("title")}</h2>
          <div className="flex items-center">
            <div className="flex text-gray-300 text-sm mr-1">★★★★★</div>
            <span className="text-sm font-medium text-muted-foreground">-</span>
          </div>
        </div>
        <div className="flex items-center justify-center h-32">
          <div className="text-muted-foreground">{t("loading")}</div>
        </div>
      </div>
    );
  }

  if (feedbacksError) {
    return (
      <div className="bg-card rounded-3xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">{t("title")}</h2>
          <div className="flex items-center">
            <div className="flex text-gray-300 text-sm mr-1">★★★★★</div>
            <span className="text-sm font-medium text-muted-foreground">-</span>
          </div>
        </div>
        <div className="flex items-center justify-center h-32">
          <div className="text-destructive">{t("error")}</div>
        </div>
      </div>
    );
  }

  if (!hasReviews) {
    return (
      <div className="bg-card rounded-3xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">{t("title")}</h2>
          <div className="flex items-center">
            <div className="flex text-gray-300 text-sm mr-1">★★★★★</div>
            <span className="text-sm font-medium text-muted-foreground">-</span>
          </div>
        </div>
        <div className="flex items-center justify-center h-32">
          <div className="text-muted-foreground">{t("empty")}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-3xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">{t("title")}</h2>
        <div className="flex items-center">
          <div className="flex text-yellow-400 text-sm mr-1">
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={i < Math.floor(averageRating) ? "text-yellow-400" : "text-gray-300"}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            {averageRating.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {reviewItems.map((review) => (
          <EBMotionCard
            key={review.id}
            variant="base"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 p-4 border border-border/50 hover:shadow-md transition-all duration-200"
            initial={undefined}
            animate={undefined}
            whileHover={undefined}
            whileTap={undefined}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-muted-foreground/60 to-muted-foreground/80 flex items-center justify-center text-background text-xs font-bold mr-3">
                  {review.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{review.studentName}</p>
                  <div className="flex text-yellow-400 text-xs">{review.stars}</div>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{review.timeAgo}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              &ldquo;{review.comment}&rdquo;
            </p>
          </EBMotionCard>
        ))}
      </div>
    </div>
  );
};

export default Review;
