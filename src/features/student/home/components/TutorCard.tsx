"use client";

import React from "react";
import { MotionCard } from "@/components/motion";
import { tutorCardVariants } from "@/common/constants/motion/cardMotion.constant";
import { Star, MapPin, Clock, Users, Eye, Heart, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TutorCardData } from "@/services/tutor/type";

interface TutorCardProps {
  tutor: TutorCardData;
  onViewDetails?: (tutorId: string) => void;
  onContact?: (tutorId: string) => void;
  onFavorite?: (tutorId: string) => void;
  isFavorited?: boolean;
}

const TutorCard: React.FC<TutorCardProps> = ({
  tutor,
  onViewDetails,
  onContact,
  onFavorite,
  isFavorited = false,
}) => {
  const handleViewDetails = () => {
    onViewDetails?.(tutor.id);
  };

  const handleContact = () => {
    onContact?.(tutor.id);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavorite?.(tutor.id);
  };

  // Format price display
  const formatPrice = (price: number, currency: string) => {
    if (currency === "VND") {
      return `${price.toLocaleString("vi-VN")}đ`;
    }
    return `${price.toLocaleString()}${currency}`;
  };

  return (
    <MotionCard
      variants={tutorCardVariants}
      onClick={handleViewDetails}
      className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50
                 hover:border-primary/30 hover:bg-card hover:shadow-xl hover:shadow-primary/10
                 transition-all duration-500 ease-out cursor-pointer"
    >
      {/* Favorite Button */}
      <button
        onClick={handleFavorite}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-800/80
                   backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 transition-all duration-200
                   hover:scale-110"
      >
        <Heart
          className={cn(
            "w-4 h-4 transition-colors duration-200",
            isFavorited ? "text-red-500 fill-red-500" : "text-gray-400 hover:text-red-500"
          )}
        />
      </button>

      {/* Avatar Section */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="relative">
          <div
            className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/40
                          flex items-center justify-center text-primary font-bold text-xl
                          group-hover:scale-105 transition-transform duration-300"
          >
            {tutor.avatar}
          </div>
          {/* Online Status Indicator */}
          {tutor.status === "Online" && (
            <div
              className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full
                            border-2 border-white dark:border-gray-800 animate-pulse"
            />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3
              className="font-semibold text-foreground group-hover:text-primary
                           transition-colors duration-300 truncate"
            >
              {tutor.name}
            </h3>
            {tutor.verified && (
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span
                  className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium
                                rounded-full border border-primary/20"
                >
                  Verified
                </span>
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-2">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="font-medium text-foreground">
              {tutor.rating > 0 ? tutor.rating.toFixed(1) : "Chưa có"}
            </span>
            <span className="text-muted-foreground text-sm">({tutor.reviewCount} đánh giá)</span>
          </div>

          {/* Location */}
          <div className="flex items-center space-x-1 text-muted-foreground text-sm">
            <MapPin className="w-3 h-3" />
            <span>{tutor.location}</span>
          </div>
        </div>
      </div>

      {/* Subjects */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {tutor.subjects.slice(0, 2).map((subject, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-secondary text-secondary-foreground text-xs
                         rounded-md font-medium"
            >
              {subject}
            </span>
          ))}
          {tutor.subjects.length > 2 && (
            <span className="text-muted-foreground text-xs py-1">
              +{tutor.subjects.length - 2} khác
            </span>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4 text-center">
        <div className="space-y-1">
          <div className="flex items-center justify-center space-x-1">
            <Users className="w-3 h-3 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">{tutor.studentCount}</span>
          </div>
          <p className="text-xs text-muted-foreground">Học sinh</p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-center space-x-1">
            <Clock className="w-3 h-3 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">{tutor.courseCount}</span>
          </div>
          <p className="text-xs text-muted-foreground">Khóa học</p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-center space-x-1">
            <Clock className="w-3 h-3 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">{tutor.experience}</span>
          </div>
          <p className="text-xs text-muted-foreground">Kinh nghiệm</p>
        </div>
      </div>

      {/* Price and Status */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-lg font-bold text-primary">
            {formatPrice(tutor.price, tutor.currency)}
          </span>
          <span className="text-muted-foreground text-sm">/buổi</span>
        </div>
        <div
          className={cn(
            "px-3 py-1 rounded-full text-xs font-medium",
            tutor.status === "Online"
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
          )}
        >
          {tutor.status}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleViewDetails();
          }}
          className="flex items-center justify-center space-x-2 px-4 py-2 border border-border
                     rounded-lg text-foreground hover:bg-secondary transition-colors duration-200"
        >
          <Eye className="w-4 h-4" />
          <span className="text-sm font-medium">Xem chi tiết</span>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleContact();
          }}
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-primary
                     text-primary-foreground rounded-lg hover:bg-primary/90
                     transition-colors duration-200 font-medium"
        >
          <span className="text-sm">Liên hệ ngay</span>
        </button>
      </div>
    </MotionCard>
  );
};

export default TutorCard;
