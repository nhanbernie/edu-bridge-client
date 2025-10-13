"use client";

import React from "react";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Info } from "lucide-react";
import EBActionsMenu, { type ActionItem } from "./EBActionsMenu";

// Types
interface CourseData {
  id: string;
  title: string;
  tutorId: string;
  tutorName: string;
  price: { min: number; max: number };
  duration: string;
  students: number;
  popular?: boolean;
}

interface EBTutorCourseCardProps {
  course: number;
  mode?: "user" | "tutor";
  courseData?: CourseData;
  actions?: ActionItem[];
  onClick?: () => void;
}

const EBTutorCourseCard: React.FC<EBTutorCourseCardProps> = ({
  course,
  mode = "user",
  courseData: propCourseData,
  actions = [],
  onClick,
}) => {
  const { push } = useLocaleRouter();

  // Hard coded data - dễ dàng thêm trường mới
  const hardCodedCourses: CourseData[] = [
    {
      id: "course-1",
      title: "Toán học cơ bản lớp 10",
      tutorId: "tutor-1",
      tutorName: "Nguyễn Văn An",
      price: { min: 200000, max: 500000 },
      duration: "2 giờ/buổi",
      students: 25,
      popular: true,
    },
    {
      id: "course-2",
      title: "Vật lý nâng cao lớp 11",
      tutorId: "tutor-1",
      tutorName: "Trần Thị Bình",
      price: { min: 300000, max: 800000 },
      duration: "1.5 giờ/buổi",
      students: 18,
      popular: false,
    },
    {
      id: "course-3",
      title: "Hóa học hữu cơ lớp 12",
      tutorId: "tutor-1",
      tutorName: "Lê Minh Cường",
      price: { min: 250000, max: 600000 },
      duration: "2.5 giờ/buổi",
      students: 32,
      popular: true,
    },
    {
      id: "course-4",
      title: "Tiếng Anh giao tiếp",
      tutorId: "tutor-1",
      tutorName: "Phạm Thu Hà",
      price: { min: 180000, max: 400000 },
      duration: "1 giờ/buổi",
      students: 45,
      popular: true,
    },
    {
      id: "course-5",
      title: "Lập trình Python cơ bản",
      tutorId: "tutor-1",
      tutorName: "Ngô Đức Thành",
      price: { min: 400000, max: 1000000 },
      duration: "3 giờ/buổi",
      students: 12,
      popular: false,
    },
  ];

  // Sử dụng data từ props hoặc hard coded data
  const courseData: CourseData =
    propCourseData || hardCodedCourses[(course - 1) % hardCodedCourses.length];

  const handleBooking = () => {
    // Navigate to booking page với tutor ID và course ID
    push(`/student/booking/${courseData.tutorId}?courseId=${courseData.id}`);
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Card
      className="hover:shadow-lg transition-shadow border-0 shadow-sm cursor-pointer"
      onClick={handleCardClick}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{courseData.title}</CardTitle>
          <div className="flex items-center gap-2">
            {courseData.popular && <Badge variant="secondary">Phổ biến</Badge>}
            {mode === "tutor" && actions.length > 0 && (
              <div onClick={(e) => e.stopPropagation()}>
                <EBActionsMenu actions={actions} />
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{courseData.students} học sinh đã đăng ký</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{courseData.duration}</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-primary">
                {courseData.price.min.toLocaleString()} - {courseData.price.max.toLocaleString()}{" "}
                VNĐ
              </span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <Info className="h-3 w-3" />
                <span>Học phí dựa trên số buổi</span>
              </div>
            </div>
            {mode === "user" && (
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click
                  handleBooking();
                }}
              >
                Đăng ký
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EBTutorCourseCard;
export type { CourseData, EBTutorCourseCardProps };
