"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TutorCourseCard {
  id: string;
  title: string;
  tutorId: string;
  tutorName: string;
  price: { min: number; max: number };
  duration: string;
  students: number;
  popular?: boolean;
}

const EBTutorCourseCard = ({ course }: { course: number }) => {
  const router = useRouter();

  // Mock data - trong thực tế sẽ nhận từ props
  const courseData: TutorCourseCard = {
    id: `course-${course}`,
    title: `Toán học cơ bản ${course}`,
    tutorId: "tutor-1",
    tutorName: "Nguyễn Văn An",
    price: { min: 200000, max: 1000000 },
    duration: "2 giờ/buổi",
    students: 25,
    popular: true,
  };

  const handleBooking = () => {
    // Navigate to booking page với tutor ID và course ID
    router.push(`/student/booking/${courseData.tutorId}?courseId=${courseData.id}`);
  };
  return (
    <Card key={course} className="hover:shadow-lg transition-shadow border-0 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{courseData.title}</CardTitle>
          {courseData.popular && <Badge variant="secondary">Phổ biến</Badge>}
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
            <Button size="sm" onClick={handleBooking}>
              Đăng ký
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EBTutorCourseCard;
