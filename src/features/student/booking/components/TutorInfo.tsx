"use client";

import React from "react";
import { EBMotionCard } from "@/components/motion/EBMotionCard";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, MessageCircle, Loader2 } from "lucide-react";
import { slideUpVariants } from "@/components/motion";
import { useGetUser } from "@/hooks/useGetUser";

interface TutorInfoProps {
  tutorId: string;
  courseId?: string;
}

const TutorInfo: React.FC<TutorInfoProps> = ({ tutorId, courseId }) => {
  const { userData, isLoading, error } = useGetUser({
    userId: tutorId,
    enabled: !!tutorId,
  });

  // Loading state
  if (isLoading) {
    return (
      <EBMotionCard className="bg-card text-card-foreground" variants={slideUpVariants}>
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
          <p className="text-sm text-muted-foreground">Đang tải thông tin gia sư...</p>
        </div>
      </EBMotionCard>
    );
  }

  // Error state
  if (error || !userData) {
    return (
      <EBMotionCard className="bg-card text-card-foreground" variants={slideUpVariants}>
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-sm text-red-500 mb-2">Không thể tải thông tin gia sư</p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-primary hover:underline"
          >
            Thử lại
          </button>
        </div>
      </EBMotionCard>
    );
  }

  const tutor = userData.tutor;
  const user = userData;

  return (
    <EBMotionCard className="bg-card text-card-foreground" variants={slideUpVariants}>
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Avatar */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.fullName || "Tutor"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-primary font-bold text-4xl">
                {user.fullName?.charAt(0).toUpperCase() || "T"}
              </div>
            )}
          </div>
          {user.status === "APPROVED" && (
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-card" />
          )}
        </div>

        {/* Name and Status */}
        <div>
          <h2 className="text-xl font-bold text-foreground">{user.fullName || "Gia sư"}</h2>
          {tutor?.verifiedStatus === "VERIFIED" && (
            <div className="flex items-center justify-center gap-2 mt-1">
              <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs">
                Đã xác minh
              </Badge>
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-foreground">
              {tutor?.averageTutorRating?.toFixed(1) || "0.0"}
            </span>
          </div>
          <span className="text-muted-foreground text-sm">
            ({tutor?.totalFeedbacks || 0} đánh giá)
          </span>
        </div>

        {/* Subjects */}
        {tutor?.subjects && tutor.subjects.length > 0 && (
          <div className="text-center">
            <p className="text-muted-foreground text-sm">{tutor.subjects.join(" • ")}</p>
          </div>
        )}

        {/* Stats */}
        <div className="space-y-2 w-full">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{tutor?.yearsOfExperience || 0} năm kinh nghiệm</span>
          </div>
          {user.location && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{user.location}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MessageCircle className="w-4 h-4" />
            <span>Phản hồi nhanh</span>
          </div>
        </div>
      </div>
    </EBMotionCard>
  );
};

export default TutorInfo;
