import React from "react";
import { CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { EBMotionCard } from "@/components/motion";

interface EBFeedbackCardProps {
  studentName: string;
  courseTitle: string;
  tutorRating: number;
  courseRating: number;
  comment: string;
  createdAt: string;
}

const EBFeedbackCard: React.FC<EBFeedbackCardProps> = ({
  studentName,
  courseTitle,
  tutorRating,
  courseRating,
  comment,
  createdAt,
}) => {
  return (
    <EBMotionCard className="border-0 shadow-lg">
      <CardContent className="">
        {/* Header: Student Name */}
        <h3 className="font-semibold text-foreground mb-1">{studentName}</h3>

        {/* Course Title and Date */}
        <p className="text-sm text-muted-foreground mb-3">
          {courseTitle} • {new Date(createdAt).toLocaleDateString("vi-VN")}
        </p>

        {/* Ratings */}
        <div className="space-y-2 mb-3">
          {/* Tutor Rating */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground min-w-[50px]">Tutor:</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < tutorRating ? "text-accent fill-accent" : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Course Rating */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground min-w-[50px]">Course:</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < courseRating ? "text-accent fill-accent" : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Comment */}
        {comment && <p className="text-sm text-muted-foreground leading-relaxed">{comment}</p>}
      </CardContent>
    </EBMotionCard>
  );
};

export default EBFeedbackCard;
