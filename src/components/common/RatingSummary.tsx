import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface RatingSummaryProps {
  averageRating?: number;
  totalReviews?: number;
  ratingBreakdown?: Array<{
    stars: number;
    count: number;
    percentage: number;
  }>;
}

const RatingSummary: React.FC<RatingSummaryProps> = ({
  averageRating = 4.9,
  totalReviews = 127,
  ratingBreakdown = [
    { stars: 5, count: 89, percentage: 70 },
    { stars: 4, count: 25, percentage: 20 },
    { stars: 3, count: 8, percentage: 6 },
    { stars: 2, count: 3, percentage: 2 },
    { stars: 1, count: 2, percentage: 2 },
  ],
}) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Tổng quan đánh giá</h3>
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-primary mb-2">{averageRating}</div>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <div className="text-sm text-muted-foreground">{totalReviews} đánh giá</div>
        </div>

        {/* Rating breakdown */}
        <div className="space-y-2">
          {ratingBreakdown.map((item) => (
            <div key={item.stars} className="flex items-center gap-2 text-sm">
              <span className="w-2">{item.stars}</span>
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="w-6 text-right">{item.count}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RatingSummary;
