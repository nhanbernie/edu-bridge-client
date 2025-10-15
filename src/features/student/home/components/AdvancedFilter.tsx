"use client";

import React, { useState } from "react";
import { Filter } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
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

  const gradeOptions = ["Lớp 1-5", "Lớp 6-9", "Lớp 10-12", "Đại học", "Người đi làm"];

  const sessionOptions = ["1-2 giờ", "2-3 giờ", "3-4 giờ", "4+ giờ"];

  const handleSubjectToggle = (subject: string) => {
    const currentSubjects = filters.Subjects || [];
    const newSubjects = currentSubjects.includes(subject)
      ? currentSubjects.filter((s) => s !== subject)
      : [...currentSubjects, subject];

    setFilters((prev) => ({ ...prev, Subjects: newSubjects }));
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 border-b border-border">
          <DialogTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-primary" />
            <span>Bộ lọc nâng cao</span>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-180px)] px-6 py-4">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-3">Mức giá (VNĐ/giờ)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Từ</label>
                  <input
                    type="number"
                    placeholder="100,000"
                    value={filters.MinHourlyRate || ""}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        MinHourlyRate: e.target.value ? Number(e.target.value) : undefined,
                      }))
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Đến</label>
                  <input
                    type="number"
                    placeholder="500,000"
                    value={filters.MaxHourlyRate || ""}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        MaxHourlyRate: e.target.value ? Number(e.target.value) : undefined,
                      }))
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Môn học</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {subjectOptions.map((subject) => (
                  <Button
                    key={subject}
                    onClick={() => handleSubjectToggle(subject)}
                    variant={filters.Subjects?.includes(subject) ? "default" : "secondary"}
                    className="text-sm font-medium"
                  >
                    {subject}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Cấp độ</h3>
              <select
                value={filters.Grades || ""}
                onChange={(e) => setFilters((prev) => ({ ...prev, Grades: e.target.value }))}
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

            <div>
              <h3 className="font-semibold text-foreground mb-3">Đánh giá tối thiểu</h3>
              <div className="flex space-x-2">
                {[3, 3.5, 4, 4.5, 5].map((rating) => (
                  <Button
                    key={rating}
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        MinRating: prev.MinRating === rating ? undefined : rating,
                      }))
                    }
                    variant={filters.MinRating === rating ? "default" : "secondary"}
                    className="text-sm font-medium"
                  >
                    {rating}+ ⭐
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Thời lượng buổi học</h3>
              <select
                value={filters.HoursPerSession || ""}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, HoursPerSession: e.target.value }))
                }
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
        </ScrollArea>

        <div className="flex items-center justify-between p-6 border-t border-border">
          <Button onClick={handleReset} variant="ghost" className="text-muted-foreground">
            Đặt lại
          </Button>
          <div className="flex space-x-3">
            <Button onClick={onClose} variant="outline">
              Hủy
            </Button>
            <Button onClick={handleApply}>Áp dụng</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdvancedFilter;
