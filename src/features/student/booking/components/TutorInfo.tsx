"use client";

import React from "react";
import { MotionCard } from "@/components/motion/MotionCard";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, MessageCircle } from "lucide-react";
import { slideUpVariants } from "@/components/motion";

interface TutorInfoProps {
  tutorId: string;
  courseId?: string;
}

const TutorInfo: React.FC<TutorInfoProps> = ({ tutorId, courseId }) => {
  // Mock data - trong thực tế sẽ fetch từ API
  const tutorData = {
    id: tutorId,
    name: "Michael Chen",
    avatar: "/api/placeholder/120/120",
    rating: 4.8,
    reviewCount: 89,
    subjects: ["Computer Science", "Programming"],
    experience: "5 năm kinh nghiệm",
    responseTime: "Phản hồi nhanh",
    isOnline: true,
  };

  return (
    <MotionCard className="bg-card text-card-foreground"  variants={slideUpVariants}>
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Avatar */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            <img
              src={tutorData.avatar}
              alt={tutorData.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E";
              }}
            />
          </div>
          {tutorData.isOnline && (
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-card" />
          )}
        </div>

        {/* Name and Status */}
        <div>
          <h2 className="text-xl font-bold text-foreground">{tutorData.name}</h2>
          <div className="flex items-center justify-center gap-2 mt-1">
            <Badge variant="secondary" className="bg-primary text-primary-foreground text-xs">
              Đã xác minh
            </Badge>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-foreground">{tutorData.rating}</span>
          </div>
          <span className="text-muted-foreground text-sm">({tutorData.reviewCount} đánh giá)</span>
        </div>

        {/* Subjects */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm">{tutorData.subjects.join(" • ")}</p>
        </div>

        {/* Stats */}
        <div className="space-y-2 w-full">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{tutorData.experience}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>Hà Nội</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MessageCircle className="w-4 h-4" />
            <span>{tutorData.responseTime}</span>
          </div>
        </div>
      </div>
    </MotionCard>
  );
};

export default TutorInfo;
