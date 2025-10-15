"use client";

import React from "react";
import { EBMotionCard } from "@/components/motion";
import { tutorCardVariants } from "@/common/constants/motion/cardMotion.constant";
import { Star, Clock, Heart, UserRound, BookOpen, CheckCircle } from "lucide-react";
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

  return (
    <EBMotionCard
      variants={tutorCardVariants}
      onClick={handleViewDetails}
      className="group relative rounded-4xl p-4 overflow-hidden bg-card/50 backdrop-blur-xs
                 hover:bg-card hover:shadow-2xl hover:shadow-primary/10
                 transition-all duration-500 ease-out cursor-pointer border-0 shadow-xl"
    >
      {/* Avatar Section - Full Width */}
      <div className="relative mb-2">
        {tutor.avatarUrl ? (
          <img
            src={tutor.avatarUrl}
            alt={tutor.name}
            className="w-full h-64 object-cover rounded-3xl"
          />
        ) : (
          <div
            className="w-full h-64 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/40
                        flex items-center justify-center text-primary font-bold text-6xl"
          >
            {tutor.avatar}
          </div>
        )}

        {/* Favorite Button - Top Right */}
        <button
          onClick={handleFavorite}
          className="absolute top-2 right-2 z-10 p-2 rounded-2xl cursor-pointer"
        >
          <Heart
            className={cn(
              "w-5 h-5",
              isFavorited ? "text-red-500 fill-red-500" : "text-gray-400 hover:text-red-400"
            )}
          />
        </button>

        {/* Verified Badge - Top Left */}
        {tutor.verified && (
          <div className="absolute top-2 left-2">
            <span
              className="inline-flex items-center gap-1 px-3 py-1
    bg-emerald-500/50 text-emerald-50 text-xs font-medium
    rounded-full backdrop-blur-sm border border-emerald-400/30
    shadow-[0_0_8px_rgba(16,185,129,0.25)]"
            >
              <CheckCircle size={14} strokeWidth={2} className="text-emerald-100" />
              Verified
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="px-2 pb-7">
        {/* Name */}
        <h3
          className="text-xl font-bold text-foreground
                       transition-colors duration-300 text-center mb-2"
        >
          {tutor.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center justify-center space-x-1 mb-3">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="font-medium text-foreground">
            {tutor.rating > 0 ? tutor.rating.toFixed(1) : "Chưa có"}
          </span>
          <span className="text-muted-foreground text-sm">({tutor.reviewCount})</span>
        </div>

        {/* Subjects - 3 columns */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {tutor.subjects.slice(0, 3).map((subject, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-secondary text-secondary-foreground text-xs
                         rounded-md font-medium text-center"
            >
              {subject}
            </span>
          ))}
          {tutor.subjects.length > 3 && (
            <span className="text-muted-foreground text-xs py-1 text-center col-span-3">
              +{tutor.subjects.length - 3} khác
            </span>
          )}
        </div>

        {/* Stats - New Layout */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-7 text-[#e8c55d]"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-foreground">{tutor.studentCount}</div>
              <div className="text-xs text-muted-foreground">Học sinh</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-7 text-[#e8c55d]"
              >
                <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-foreground">{tutor.courseCount}</div>
              <div className="text-xs text-muted-foreground">Khóa học</div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 flex items-center justify-center">
              {/* <Star size={25} absoluteStrokeWidth /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-7 text-[#e8c55d]"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-foreground">
                {tutor.yearsOfExperience || 0}
              </div>
              <div className="text-xs text-muted-foreground">Năm</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="w-full">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleContact();
          }}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3  rounded-2xl text-white text-xs
                      backdrop-blur-sm shadow-md bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 transition-colors duration-200 font-medium hover:cursor-pointer"
        >
          <span className="text-sm">Học ngay</span>
        </button>
      </div>
    </EBMotionCard>
  );
};

export default TutorCard;
