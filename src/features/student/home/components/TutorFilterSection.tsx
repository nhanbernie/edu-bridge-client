"use client";

import React from "react";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import type { TutorSearchRequest } from "@/services/tutor/type";

interface QuickFilters {
  highRating: boolean;
  subjects: string[];
}

interface TutorFilterSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedSubject: string;
  onSubjectChange: (value: string) => void;
  quickFilters: QuickFilters;
  onQuickFilterToggle: (filterType: "highRating") => void;
  onSubjectFilterToggle: (subject: string) => void;
  onAdvancedFilterOpen: () => void;
  advancedFilters: TutorSearchRequest;
  subjectOptions: string[];
  quickFilterSubjects: string[];
  searchPlaceholder: string;
  allSubjectsText: string;
  filterButtonText: string;
  highRatingText: string;
  priceText: string;
  ratingText: string;
  durationText: string;
  hoursText: string;
}

export const TutorFilterSection: React.FC<TutorFilterSectionProps> = ({
  searchQuery,
  onSearchChange,
  selectedSubject,
  onSubjectChange,
  quickFilters,
  onQuickFilterToggle,
  onSubjectFilterToggle,
  onAdvancedFilterOpen,
  advancedFilters,
  subjectOptions,
  quickFilterSubjects,
  searchPlaceholder,
  allSubjectsText,
  filterButtonText,
  highRatingText,
  priceText,
  ratingText,
  durationText,
  hoursText,
}) => {
  return (
    <div className="mb-8 bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-xl">
      {/* Search Row */}
      <div className="flex flex-col lg:flex-row gap-3 mb-5">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl
                       focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                       transition-all duration-200 text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Subject Dropdown */}
        <div className="relative sm:min-w-[200px]">
          <select
            value={selectedSubject}
            onChange={(e) => onSubjectChange(e.target.value)}
            className="appearance-none bg-background border border-border rounded-xl px-4 py-3 pr-10 w-full
                       focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                       transition-all duration-200 cursor-pointer text-foreground font-medium"
          >
            <option value="">{allSubjectsText}</option>
            {subjectOptions.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
        </div>

        {/* Advanced Filter Button */}
        <button
          onClick={onAdvancedFilterOpen}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground
                     rounded-xl hover:bg-primary/90 transition-all duration-200 font-medium whitespace-nowrap"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>{filterButtonText}</span>
        </button>
      </div>

      {/* Quick Filters */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {/* High Rating Filter */}
          <button
            onClick={() => onQuickFilterToggle("highRating")}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
              quickFilters.highRating
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-foreground border-border hover:bg-muted"
            }`}
          >
            {highRatingText}
          </button>

          {/* Subject Quick Filters */}
          {quickFilterSubjects.map((subject) => (
            <button
              key={subject}
              onClick={() => onSubjectFilterToggle(subject)}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                quickFilters.subjects.includes(subject)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:bg-muted"
              }`}
            >
              {subject}
            </button>
          ))}
        </div>

        {/* Advanced Filter Tags */}
        {(advancedFilters.MinHourlyRate ||
          advancedFilters.MaxHourlyRate ||
          advancedFilters.MinRating ||
          advancedFilters.HoursPerSession) && (
          <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
            {advancedFilters.MinHourlyRate && advancedFilters.MaxHourlyRate && (
              <div className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium border border-primary/20">
                {priceText}: {advancedFilters.MinHourlyRate.toLocaleString()} -{" "}
                {advancedFilters.MaxHourlyRate.toLocaleString()} đ
              </div>
            )}
            {advancedFilters.MinRating && (
              <div className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium border border-primary/20">
                {ratingText}: ≥ {advancedFilters.MinRating} ⭐
              </div>
            )}
            {advancedFilters.HoursPerSession && (
              <div className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium border border-primary/20">
                {durationText}: {advancedFilters.HoursPerSession} {hoursText}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
