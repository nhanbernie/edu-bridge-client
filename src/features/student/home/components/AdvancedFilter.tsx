"use client";

import React, { useState } from "react";
import { Filter } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { EBSelectField, EBTextField } from "@/components/form";
import type { TutorSearchRequest } from "@/services/tutor/type";

interface AdvancedFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: TutorSearchRequest) => void;
  currentFilters?: TutorSearchRequest;
}

interface FilterFormData {
  minPrice: string;
  maxPrice: string;
  subjects: string[];
  grades: string;
  minRating: number | undefined;
  hoursPerSession: string;
}

const AdvancedFilter: React.FC<AdvancedFilterProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  currentFilters = {},
}) => {
  const methods = useForm<FilterFormData>({
    defaultValues: {
      minPrice: currentFilters.MinHourlyRate?.toString() || "",
      maxPrice: currentFilters.MaxHourlyRate?.toString() || "",
      subjects: currentFilters.Subjects || [],
      grades: currentFilters.Grades || "",
      minRating: currentFilters.MinRating || undefined,
      hoursPerSession: currentFilters.HoursPerSession || "",
    },
  });

  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(currentFilters.Subjects || []);

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
    { value: "Lớp 1-5", label: "Lớp 1-5" },
    { value: "Lớp 6-9", label: "Lớp 6-9" },
    { value: "Lớp 10-12", label: "Lớp 10-12" },
    { value: "Đại học", label: "Đại học" },
    { value: "Người đi làm", label: "Người đi làm" },
  ];

  const sessionOptions = [
    { value: "1", label: "1 giờ" },
    { value: "2", label: "2 giờ" },
    { value: "3", label: "3 giờ" },
    { value: "4", label: "4 giờ" },
  ];

  const [selectedRating, setSelectedRating] = useState<number | undefined>(
    currentFilters.MinRating
  );

  const handleSubjectToggle = (subject: string) => {
    const newSubjects = selectedSubjects.includes(subject)
      ? selectedSubjects.filter((s) => s !== subject)
      : [...selectedSubjects, subject];

    setSelectedSubjects(newSubjects);
  };

  const handleApply = () => {
    const values = methods.getValues();
    const filters: TutorSearchRequest = {
      MinHourlyRate: values.minPrice ? Number(values.minPrice) : undefined,
      MaxHourlyRate: values.maxPrice ? Number(values.maxPrice) : undefined,
      Subjects: selectedSubjects.length > 0 ? selectedSubjects : undefined,
      Grades: values.grades || undefined,
      MinRating: selectedRating,
      HoursPerSession: values.hoursPerSession || undefined,
    };
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    methods.reset({
      minPrice: "",
      maxPrice: "",
      subjects: [],
      grades: "",
      minRating: undefined,
      hoursPerSession: "",
    });
    setSelectedSubjects([]);
    setSelectedRating(undefined);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <DialogTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-primary" />
            <span>Bộ lọc nâng cao</span>
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <ScrollArea className="max-h-[calc(90vh-180px)] px-6 py-6">
            <form className="space-y-6 px-2">
              {/* Mức giá */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Mức giá (VNĐ/giờ)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <EBTextField name="minPrice" type="number" placeholder="100,000" label="Từ" />
                  <EBTextField name="maxPrice" type="number" placeholder="500,000" label="Đến" />
                </div>
              </div>

              {/* Môn học */}
              <div className="">
                <h3 className="font-semibold text-foreground mb-3">Môn học</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {subjectOptions.map((subject) => (
                    <Button
                      key={subject}
                      type="button"
                      onClick={() => handleSubjectToggle(subject)}
                      variant={selectedSubjects.includes(subject) ? "default" : "secondary"}
                      className="text-sm font-medium"
                    >
                      {subject}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Cấp độ */}
              <div>
                <EBSelectField
                  name="grades"
                  label="Cấp độ"
                  placeholder="Tất cả cấp độ"
                  options={gradeOptions}
                />
              </div>

              {/* Đánh giá */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Đánh giá tối thiểu</h3>
                <div className="flex flex-wrap gap-2">
                  {[3, 3.5, 4, 4.5, 5].map((rating) => (
                    <Button
                      key={rating}
                      type="button"
                      onClick={() =>
                        setSelectedRating(selectedRating === rating ? undefined : rating)
                      }
                      variant={selectedRating === rating ? "default" : "secondary"}
                      className="text-sm font-medium"
                    >
                      {rating}+ ⭐
                    </Button>
                  ))}
                </div>
              </div>

              {/* Thời lượng buổi học */}
              <div>
                <EBSelectField
                  name="hoursPerSession"
                  label="Thời lượng buổi học"
                  placeholder="Tất cả thời lượng"
                  options={sessionOptions}
                />
              </div>
            </form>
          </ScrollArea>

          <div className="flex items-center justify-between px-6 py-4 border-t border-border">
            <Button
              type="button"
              onClick={handleReset}
              variant="ghost"
              className="text-muted-foreground"
            >
              Đặt lại
            </Button>
            <div className="flex space-x-3">
              <Button type="button" onClick={onClose} variant="outline">
                Hủy
              </Button>
              <Button type="button" onClick={handleApply}>
                Áp dụng
              </Button>
            </div>
          </div>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default AdvancedFilter;
