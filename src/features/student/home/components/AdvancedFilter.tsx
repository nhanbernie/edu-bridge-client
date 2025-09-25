"use client";

import React, { useState } from "react";
import { X, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TutorSearchRequest } from "@/services/tutor/type";

interface AdvancedFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: TutorSearchRequest) => void;
  currentFilters?: TutorSearchRequest;
}

const AdvancedFilter: React.FC<AdvancedFilterProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  currentFilters = {},
}) => {
  const [filters, setFilters] = useState<TutorSearchRequest>({
    MinHourlyRate: currentFilters.MinHourlyRate || undefined,
    MaxHourlyRate: currentFilters.MaxHourlyRate || undefined,
    Subjects: currentFilters.Subjects || [],
    Grades: currentFilters.Grades || "",
    MinRating: currentFilters.MinRating || undefined,
    HoursPerSession: currentFilters.HoursPerSession || "",
  });

  const subjectOptions = [
    "Toán học",
    "Vật lý", 
    "Hóa học",
    "Sinh học",
    "Văn học",
    "Tiếng Anh",
    "Lịch sử",
    "Địa lý",
    "Tin học",
    "Âm nhạc",
  ];

  const gradeOptions = [
    "Lớp 1-5",
    "Lớp 6-9", 
    "Lớp 10-12",
    "Đại học",
    "Người đi làm",
  ];

  const sessionOptions = [
    "1-2 giờ",
    "2-3 giờ",
    "3-4 giờ",
    "4+ giờ",
  ];

  const handleSubjectToggle = (subject: string) => {
    const currentSubjects = filters.Subjects || [];
    const newSubjects = currentSubjects.includes(subject)
      ? currentSubjects.filter(s => s !== subject)
      : [...currentSubjects, subject];
    
    setFilters(prev => ({ ...prev, Subjects: newSubjects }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      MinHourlyRate: undefined,
      MaxHourlyRate: undefined,
      Subjects: [],
      Grades: "",
      MinRating: undefined,
      HoursPerSession: "",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Bộ lọc nâng cao</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Price Range */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Mức giá (VNĐ/giờ)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Từ</label>
                <input
                  type="number"
                  placeholder="100,000"
                  value={filters.MinHourlyRate || ""}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    MinHourlyRate: e.target.value ? Number(e.target.value) : undefined 
                  }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Đến</label>
                <input
                  type="number"
                  placeholder="500,000"
                  value={filters.MaxHourlyRate || ""}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    MaxHourlyRate: e.target.value ? Number(e.target.value) : undefined 
                  }))}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>

          {/* Subjects */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Môn học</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {subjectOptions.map((subject) => (
                <button
                  key={subject}
                  onClick={() => handleSubjectToggle(subject)}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    filters.Subjects?.includes(subject)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>

          {/* Grade Level */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Cấp độ</h3>
            <select
              value={filters.Grades || ""}
              onChange={(e) => setFilters(prev => ({ ...prev, Grades: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Tất cả cấp độ</option>
              {gradeOptions.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Đánh giá tối thiểu</h3>
            <div className="flex space-x-2">
              {[3, 3.5, 4, 4.5, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setFilters(prev => ({ 
                    ...prev, 
                    MinRating: prev.MinRating === rating ? undefined : rating 
                  }))}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    filters.MinRating === rating
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  {rating}+ ⭐
                </button>
              ))}
            </div>
          </div>

          {/* Session Duration */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Thời lượng buổi học</h3>
            <select
              value={filters.HoursPerSession || ""}
              onChange={(e) => setFilters(prev => ({ ...prev, HoursPerSession: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Tất cả thời lượng</option>
              {sessionOptions.map((session) => (
                <option key={session} value={session}>
                  {session}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            Đặt lại
          </button>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleApply}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Áp dụng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilter;
