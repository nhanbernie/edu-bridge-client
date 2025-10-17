"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Info, Eye } from "lucide-react";
import { CourseFormData } from "./CourseForm";

interface CoursePreviewProps {
  formData: CourseFormData | null;
}

const CoursePreview: React.FC<CoursePreviewProps> = ({ formData }) => {
  // Default preview data
  const previewData = {
    title: formData?.title || "Tên khóa học",
    subjects: formData?.subjects || [],
    description: formData?.description || "Mô tả khóa học sẽ hiển thị ở đây...",
    hoursPerSession: formData?.hoursPerSession || "2",
    hourlyRate: formData?.hourlyRate || 100000,
    students: 0, // New course, no students yet
    popular: false,
  };

  const getSubjectLabel = (value: string) => {
    const subjectMap: { [key: string]: string } = {
      math: "Toán",
      physics: "Vật lý",
      chemistry: "Hóa học",
      biology: "Sinh học",
      english: "Tiếng Anh",
      literature: "Ngữ văn",
      history: "Lịch sử",
      geography: "Địa lý",
    };
    return subjectMap[value] || value;
  };

  return (
    <Card className="shadow-sm border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Eye className="h-5 w-5 text-muted-foreground" />
          Xem trước
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Course Preview Card */}
        <Card className="hover:shadow-md transition-shadow border border-border rounded-lg">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg text-foreground line-clamp-2">
                {previewData.title}
              </CardTitle>
              <div className="flex items-center gap-2">
                {previewData.popular && <Badge variant="secondary">Phổ biến</Badge>}
                {previewData.subjects.length > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {previewData.subjects.map(getSubjectLabel).join(", ")}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {/* Description */}
              <p className="text-sm text-muted-foreground line-clamp-3">
                {previewData.description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{previewData.students} học sinh</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{previewData.hoursPerSession}h/buổi</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex justify-between items-center pt-2 border-t border-border">
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-primary">
                    {previewData.hourlyRate.toLocaleString()} VNĐ
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Info className="h-3 w-3" />
                    <span>Giá mỗi buổi học</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Packages Preview */}
        <div className="mt-6">
          <h4 className="font-medium text-foreground mb-3">Gói học tự động</h4>
          <div className="space-y-3">
            {[
              { sessions: 4, discount: 0, label: "Gói 4 buổi" },
              { sessions: 8, discount: 10, label: "Gói 8 buổi" },
              { sessions: 12, discount: 15, label: "Gói 12 buổi" },
            ].map((pkg) => {
              const originalPrice = previewData.hourlyRate * pkg.sessions;
              const discountedPrice = originalPrice * (1 - pkg.discount / 100);

              return (
                <div
                  key={pkg.sessions}
                  className="flex justify-between items-center p-4 bg-muted/50 rounded-lg text-sm min-h-[60px]"
                >
                  <div className="flex flex-col justify-center">
                    <span className="font-medium text-foreground">{pkg.label}</span>
                    {pkg.discount > 0 && (
                      <Badge variant="secondary" className="mt-1 text-xs w-fit">
                        -{pkg.discount}%
                      </Badge>
                    )}
                  </div>
                  <div className="text-right flex flex-col justify-center">
                    {pkg.discount > 0 ? (
                      <>
                        <div className="text-primary font-semibold">
                          {discountedPrice.toLocaleString()} VNĐ
                        </div>
                        <div className="text-xs text-muted-foreground line-through">
                          {originalPrice.toLocaleString()} VNĐ
                        </div>
                      </>
                    ) : (
                      <div className="text-foreground font-semibold">
                        {originalPrice.toLocaleString()} VNĐ
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Note */}
        <div className="mt-4 p-3 bg-primary/10 rounded-lg">
          <p className="text-sm text-primary">
            <Info className="h-4 w-4 inline mr-1" />
            Đây là bản xem trước khóa học của bạn.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoursePreview;
