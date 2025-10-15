import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSessionUtils } from "@/hooks/useSessionUtils";

interface RatingSummaryProps {
  type: "create" | "view";
  // Props for overall summary view
  averageRating?: number;
  totalReviews?: number;
  ratingBreakdown?: Array<{
    stars: number;
    count: number;
    percentage: number;
  }>;
  // Props for API data (new)
  totalFeedbacks?: number;
  averageTutorRating?: number;
  ratingCounts?: {
    "1": number;
    "2": number;
    "3": number;
    "4": number;
    "5": number;
  };
  // Props for single feedback view
  reviewerName?: string;
  tutorRatingValue?: number; // Specific tutor rating for a single feedback
  courseRatingValue?: number; // Specific course rating for a single feedback
  existingComment?: string;
  courseTitle?: string; // Course title for feedback card
  createdAt?: string; // Feedback creation date

  // Props for create mode
  onSubmit?: (tutorRating: number, courseRating: number, comment: string) => void;
  isLoading?: boolean;
}

const RatingSummary: React.FC<RatingSummaryProps> = ({
  type,
  averageRating = 4.9,
  totalReviews = 127,
  ratingBreakdown = [
    { stars: 5, count: 89, percentage: 70 },
    { stars: 4, count: 25, percentage: 20 },
    { stars: 3, count: 8, percentage: 6 },
    { stars: 2, count: 3, percentage: 2 },
    { stars: 1, count: 2, percentage: 2 },
  ],
  // New API props
  totalFeedbacks,
  averageTutorRating,
  ratingCounts,
  reviewerName,
  tutorRatingValue,
  courseRatingValue,
  existingComment,
  courseTitle,
  createdAt,
  onSubmit,
  isLoading = false,
}) => {
  const { formatFeedbackDate } = useSessionUtils();
  const [tutorRating, setTutorRating] = useState(0);
  const [courseRating, setCourseRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (onSubmit && tutorRating > 0 && courseRating > 0) {
      onSubmit(tutorRating, courseRating, comment);
    }
  };
  if (type === "create") {
    return (
      <Card className="border-0 shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Đánh giá gia sư</h3>

          {/* Tutor Rating */}
          <div className="mb-6">
            <p className="text-sm font-medium mb-3">Đánh giá gia sư:</p>
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTutorRating(i + 1)}
                  className={`transition-colors ${
                    i < tutorRating ? "text-yellow-400" : "text-gray-300 hover:text-yellow-300"
                  }`}
                >
                  <Star className="h-8 w-8 fill-current" />
                </button>
              ))}
            </div>
            {tutorRating > 0 && (
              <p className="text-sm text-gray-600 mt-2">Bạn đã chọn {tutorRating} sao cho gia sư</p>
            )}
          </div>

          {/* Course Rating */}
          <div className="mb-6">
            <p className="text-sm font-medium mb-3">Đánh giá khóa học:</p>
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCourseRating(i + 1)}
                  className={`transition-colors ${
                    i < courseRating ? "text-yellow-400" : "text-gray-300 hover:text-yellow-300"
                  }`}
                >
                  <Star className="h-8 w-8 fill-current" />
                </button>
              ))}
            </div>
            {courseRating > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                Bạn đã chọn {courseRating} sao cho khóa học
              </p>
            )}
          </div>

          {/* Comment */}
          <div className="mb-6">
            <label className="text-sm font-medium mb-2 block">Nhận xét (tùy chọn):</label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Chia sẻ trải nghiệm học tập của bạn..."
              className="min-h-[100px]"
            />
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={tutorRating === 0 || courseRating === 0 || isLoading}
            className="w-full"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 animate-spin border-2 border-white border-t-transparent rounded-full" />
                <span>Đang gửi...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                <span>Gửi đánh giá</span>
              </div>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  // View mode - check if it's single feedback or overall summary
  if (reviewerName && tutorRatingValue !== undefined && courseRatingValue !== undefined) {
    // Single feedback view - Layout like the old UI
    return (
      <Card className="border-0 shadow-sm w-full">
        <CardContent className="p-4">
          {/* Header with name */}
          <div className="mb-4">
            <h3 className="text-2xl  font-medium text-gray-900 dark:text-white mb-1">
              {reviewerName}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{courseTitle}</span>
              {createdAt && (
                <>
                  <span>•</span>
                  <span>{formatFeedbackDate(createdAt)}</span>
                </>
              )}
            </div>
          </div>

          {/* Ratings */}
          <div className="flex flex-col gap-2 mb-4">
            {/* Tutor Rating */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">Tutor:</span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < tutorRatingValue ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Course Rating */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">Course:</span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < courseRatingValue ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Comment */}
          {existingComment && (
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed break-words">
              {existingComment}
            </p>
          )}
        </CardContent>
      </Card>
    );
  }

  // Overall summary view - use API data if available, otherwise fallback to props
  const displayRating = averageTutorRating ?? averageRating;
  const displayTotal = totalFeedbacks ?? totalReviews;

  // Convert ratingCounts to ratingBreakdown format if available
  const getRatingBreakdown = () => {
    if (ratingCounts) {
      const total = Object.values(ratingCounts).reduce((sum, count) => sum + count, 0);
      return [
        {
          stars: 5,
          count: ratingCounts["5"],
          percentage: total > 0 ? (ratingCounts["5"] / total) * 100 : 0,
        },
        {
          stars: 4,
          count: ratingCounts["4"],
          percentage: total > 0 ? (ratingCounts["4"] / total) * 100 : 0,
        },
        {
          stars: 3,
          count: ratingCounts["3"],
          percentage: total > 0 ? (ratingCounts["3"] / total) * 100 : 0,
        },
        {
          stars: 2,
          count: ratingCounts["2"],
          percentage: total > 0 ? (ratingCounts["2"] / total) * 100 : 0,
        },
        {
          stars: 1,
          count: ratingCounts["1"],
          percentage: total > 0 ? (ratingCounts["1"] / total) * 100 : 0,
        },
      ];
    }
    return ratingBreakdown;
  };

  // Get the actual count for display
  const getDisplayCount = (stars: number) => {
    if (ratingCounts) {
      return ratingCounts[stars.toString() as keyof typeof ratingCounts];
    }
    return 0;
  };

  const finalRatingBreakdown = getRatingBreakdown();

  return (
    <Card className="border-0 shadow-sm w-full ">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-4">Tổng quan đánh giá</h3>
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-primary mb-2">{displayRating}</div>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => {
              const starRating = i + 1;
              const isFilled = starRating <= Math.round(displayRating);
              return (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    isFilled ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                  }`}
                />
              );
            })}
          </div>
          <div className="text-sm text-muted-foreground">{displayTotal} đánh giá</div>
        </div>

        {/* Rating breakdown */}
        <div className="space-y-2">
          {finalRatingBreakdown.map((item) => (
            <div key={item.stars} className="flex items-center gap-2 text-sm">
              <span className="w-2">{item.stars}</span>
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="w-6 text-right text-xs">{getDisplayCount(item.stars)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RatingSummary;
