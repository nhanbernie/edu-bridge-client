"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { EBMotionCard, EBButtonAction } from "@/components/motion";
import { tutorCardVariants } from "@/common/constants/motion/cardMotion.constant";
import { Star, Heart, Users, BookOpen, Award, CheckCircle2 } from "lucide-react";
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
  const t = useTranslations("components.tutorCard");

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
      variant="base"
      padding="sm"
      className="group relative rounded-3xl overflow-hidden
                 !bg-card border border-border hover:border-primary/50
                 shadow-xl hover:shadow-2xl hover:shadow-primary/20
                 cursor-pointer p-3"
    >
      {/* Avatar Section with Name Overlay */}
      <div className="relative mb-3">
        {tutor.avatarUrl ? (
          <img
            src={tutor.avatarUrl}
            alt={tutor.name}
            className="w-full h-48 sm:h-52 md:h-56 object-cover rounded-2xl sm:rounded-3xl"
          />
        ) : (
          <div
            className="w-full h-48 sm:h-52 md:h-56 rounded-xl sm:rounded-2xl
                       bg-gradient-to-br from-primary/20 to-primary/40
                       flex items-center justify-center text-primary font-bold text-3xl sm:text-4xl md:text-5xl"
          >
            {tutor.avatar}
          </div>
        )}

        {/* Dark Overlay at Bottom with Name */}
        <div
          className="absolute bottom-0 left-0 right-0 rounded-b-xl sm:rounded-b-2xl
                        bg-gradient-to-t from-black/70 via-black/50 to-transparent
                        pt-8 pb-2 px-3"
        >
          <h3 className="text-base sm:text-lg font-bold text-white text-center line-clamp-1 drop-shadow-lg">
            {tutor.name}
          </h3>
        </div>

        {/* Favorite Button - Top Right */}
        <button
          onClick={handleFavorite}
          className="absolute top-2 right-2 z-10 p-1.5 sm:p-2 rounded-full
                     bg-black/40 backdrop-blur-sm border border-white/20
                     hover:bg-black/60 hover:scale-110 transition-all duration-200"
        >
          <Heart
            className={cn(
              "w-4 h-4 sm:w-5 sm:h-5 transition-colors",
              isFavorited ? "text-red-500 fill-red-500" : "text-white hover:text-red-400"
            )}
          />
        </button>

        {/* Verified Badge - Top Left */}
        {tutor.verified && (
          <div className="absolute top-2 left-2">
            <span
              className="inline-flex items-center gap-1 px-2 sm:px-3 py-1
                         bg-emerald-500/90 dark:bg-emerald-600/90 backdrop-blur-sm
                         text-white
                         text-xs font-medium rounded-full
                         border border-emerald-400/30 dark:border-emerald-500/30 shadow-lg"
            >
              <CheckCircle2 size={12} strokeWidth={2.5} />
              <span className="hidden sm:inline">{t("verified")}</span>
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="space-y-3 sm:space-y-4">
        {/* Rating */}
        <div className="flex items-center justify-center gap-1.5">
          <Star className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-yellow-500 fill-yellow-500" />
          <span className="text-sm sm:text-base font-semibold text-foreground">
            {tutor.rating > 0 ? tutor.rating.toFixed(1) : t("rating.default")}
          </span>
          <span className="text-xs sm:text-sm text-muted-foreground">({tutor.reviewCount})</span>
        </div>

        {/* Subjects */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
          {tutor.subjects.slice(0, 3).map((subject, index) => (
            <span
              key={index}
              className="px-2 sm:px-3 py-1 bg-muted text-foreground
                         text-xs sm:text-sm font-medium rounded-lg
                         border border-border"
            >
              {subject}
            </span>
          ))}
          {tutor.subjects.length > 3 && (
            <span className="px-2 sm:px-3 py-1 text-xs sm:text-sm text-muted-foreground font-medium">
              +{tutor.subjects.length - 3}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 py-3 border-t border-border">
          {/* Students */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            <div className="text-center">
              <div className="text-sm sm:text-base font-bold text-foreground">
                {tutor.studentCount}
              </div>
              <div className="text-xs text-muted-foreground">{t("stats.students")}</div>
            </div>
          </div>

          {/* Courses */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            <div className="text-center">
              <div className="text-sm sm:text-base font-bold text-foreground">
                {tutor.courseCount}
              </div>
              <div className="text-xs text-muted-foreground">{t("stats.courses")}</div>
            </div>
          </div>

          {/* Experience */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary/10 flex items-center justify-center">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            </div>
            <div className="text-center">
              <div className="text-sm sm:text-base font-bold text-foreground">
                {tutor.yearsOfExperience || 0}
              </div>
              <div className="text-xs text-muted-foreground">{t("stats.years")}</div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <EBButtonAction
          onClick={handleContact}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground
                     py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base
                     shadow-lg hover:shadow-xl transition-all duration-300 hover:cursor-pointer"
        >
          {t("actions.learnNow")}
        </EBButtonAction>
      </div>
    </EBMotionCard>
  );
};

export default TutorCard;
