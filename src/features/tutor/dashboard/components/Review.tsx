import { CARD_BASE, ROUNDED } from "@/common/constants/css/card.constant";
import { useReviewData } from "@/features/tutor/dashboard/hooks/useReviewData";

const Review = () => {
  const { reviewItems, averageRating, isLoading, feedbacksError, hasReviews } = useReviewData();

  if (isLoading) {
    return (
      <div className={`${CARD_BASE} ${ROUNDED.XL} p-6`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Đánh giá gần đây</h2>
          <div className="flex items-center">
            <div className="flex text-yellow-400 text-sm mr-1">★★★★★</div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">-</span>
          </div>
        </div>
        <div className="flex items-center justify-center h-32">
          <div className="text-gray-500">Đang tải đánh giá...</div>
        </div>
      </div>
    );
  }

  if (feedbacksError) {
    return (
      <div className={`${CARD_BASE} ${ROUNDED.XL} p-6`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Đánh giá gần đây</h2>
          <div className="flex items-center">
            <div className="flex text-yellow-400 text-sm mr-1">★★★★★</div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">-</span>
          </div>
        </div>
        <div className="flex items-center justify-center h-32">
          <div className="text-red-500">Không thể tải đánh giá</div>
        </div>
      </div>
    );
  }

  if (!hasReviews) {
    return (
      <div className={`${CARD_BASE} ${ROUNDED.XL} p-6`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Đánh giá gần đây</h2>
          <div className="flex items-center">
            <div className="flex text-yellow-400 text-sm mr-1">★★★★★</div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">-</span>
          </div>
        </div>
        <div className="flex items-center justify-center h-32">
          <div className="text-gray-500">Chưa có đánh giá nào</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${CARD_BASE} ${ROUNDED.XL} p-6`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Đánh giá gần đây</h2>
        <div className="flex items-center">
          <div className="flex text-yellow-400 text-sm mr-1">★★★★★</div>
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {averageRating.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {reviewItems.map((review) => (
          <div
            key={review.id}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-800/20 dark:to-gray-700/20 p-4 border border-gray-200/50 dark:border-gray-600/20 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center text-white text-xs font-bold mr-3">
                  {review.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">
                    {review.studentName}
                  </p>
                  <div className="flex text-yellow-400 text-xs">{review.stars}</div>
                </div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">{review.timeAgo}</span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              &ldquo;{review.comment}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
