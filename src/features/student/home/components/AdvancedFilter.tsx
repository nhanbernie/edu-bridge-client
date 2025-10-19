"use client";

import React, { useState } from "react";
import { Filter } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { EBSelectField, EBTextField } from "@/components/form";
import type { TutorSearchRequest } from "@/services/tutor/type";
import { useTranslations } from "next-intl";

interface AdvancedFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: TutorSearchRequest) => void;
  currentFilters?: TutorSearchRequest;
  subjectOptions: string[];
  isLoadingSubjects?: boolean;
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
  subjectOptions,
  isLoadingSubjects = false,
}) => {
  const t = useTranslations("student.home.filter");
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
            <span>{t("title")}</span>
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <ScrollArea className="max-h-[calc(90vh-180px)] px-6 py-6">
            <form className="space-y-6 px-2">
              {/* Mức giá */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">{t("priceRange.title")}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <EBTextField name="minPrice" type="number" placeholder={t("priceRange.fromPlaceholder")} label={t("priceRange.from")} />
                  <EBTextField name="maxPrice" type="number" placeholder={t("priceRange.toPlaceholder")} label={t("priceRange.to")} />
                </div>
              </div>

              {/* Môn học */}
              <div className="">
                <h3 className="font-semibold text-foreground mb-3">{t("subjects.title")}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {isLoadingSubjects ? (
                    <div className="col-span-full text-center py-4 text-muted-foreground">
                      {t("subjects.loading")}
                    </div>
                  ) : subjectOptions.length === 0 ? (
                    <div className="col-span-full text-center py-4 text-muted-foreground">
                      {t("subjects.empty")}
                    </div>
                  ) : (
                    subjectOptions.map((subject) => (
                      <Button
                        key={subject}
                        type="button"
                        onClick={() => handleSubjectToggle(subject)}
                        variant={selectedSubjects.includes(subject) ? "default" : "secondary"}
                        className={`text-sm font-semibold transition-all duration-200 ${
                          selectedSubjects.includes(subject)
                            ? "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-md shadow-cyan-500/30"
                            : ""
                        }`}
                      >
                        {subject}
                      </Button>
                    ))
                  )}
                </div>
              </div>

              {/* Cấp độ */}
              <div>
                <EBSelectField
                  name="grades"
                  label={t("gradeLevel.title")}
                  placeholder={t("gradeLevel.all")}
                  options={gradeOptions}
                />
              </div>

              {/* Đánh giá */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">{t("rating.title")}</h3>
                <div className="flex flex-wrap gap-2">
                  {[3, 3.5, 4, 4.5, 5].map((rating) => (
                    <Button
                      key={rating}
                      type="button"
                      onClick={() =>
                        setSelectedRating(selectedRating === rating ? undefined : rating)
                      }
                      variant={selectedRating === rating ? "default" : "secondary"}
                      className={`text-sm font-semibold transition-all duration-200 ${
                        selectedRating === rating
                          ? "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-md shadow-cyan-500/30"
                          : ""
                      }`}
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
                  label={t("sessionDuration.title")}
                  placeholder={t("sessionDuration.all")}
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
              className="text-muted-foreground hover:text-foreground font-semibold"
            >
              {t("actions.reset")}
            </Button>
            <div className="flex space-x-3">
              <Button type="button" onClick={onClose} variant="outline" className="font-semibold">
                {t("actions.cancel")}
              </Button>
              <Button
                type="button"
                onClick={handleApply}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600
                           shadow-lg shadow-cyan-500/30 font-semibold"
              >
                {t("actions.apply")}
              </Button>
            </div>
          </div>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default AdvancedFilter;
