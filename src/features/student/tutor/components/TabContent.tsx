"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, Award, BookOpen, Users, Loader2 } from "lucide-react";
import EBTutorCard from "@/components/common/EBTutorCourseCard";
import EBSchedule from "@/components/common/EBSchedule";
import type { CourseData } from "@/components/common/EBTutorCourseCard";
import type { useManageCourses } from "@/features/tutor/courses/hooks/useManageCourses";
import type { useAvailabilityBlock } from "@/hooks/useAvailabilityBlock";
import { transformToCurrentWeekSchedule } from "@/utils/scheduleTransform";

interface TimeSlot {
  start: string;
  end: string;
  isBooked?: boolean;
}

interface DaySchedule {
  day: string;
  timeSlots: TimeSlot[];
  isFullDay?: boolean;
}

interface TabContentProps {
  activeTab: string;
  tutorId?: string;
  coursesData?: ReturnType<typeof useManageCourses>;
  availabilityData?: ReturnType<typeof useAvailabilityBlock>;
  selectedCourseId?: string;
  onCourseSelect?: (courseId: string) => void;
  scheduleData?: DaySchedule[];
}

const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  tutorId,
  coursesData,
  availabilityData,
  selectedCourseId,
  onCourseSelect,
  scheduleData,
}) => {
  const renderCoursesTab = () => {
    if (coursesData?.isLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Đang tải khóa học...</span>
        </div>
      );
    }

    // Hiển thị empty state nếu không có khóa học
    if (!coursesData?.courses || coursesData.courses.length === 0) {
      return (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có khóa học nào</h3>
          <p className="text-gray-500">Gia sư này chưa tạo khóa học nào.</p>
        </div>
      );
    }

    // Hiển thị danh sách khóa học
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {coursesData.courses.map((course, index) => (
          <EBTutorCard
            key={course.id}
            course={index + 1}
            mode="user"
            courseData={course}
            onClick={() => onCourseSelect?.(course.id)}
          />
        ))}
      </div>
    );
  };

  const renderScheduleTab = () => {
    // Hiển thị loading state
    if (availabilityData?.isLoadingBlocks) {
      return (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Đang tải lịch rảnh...</span>
        </div>
      );
    }

    // Transform availability blocks to schedule format
    const transformedSchedule = availabilityData?.availabilityBlocks
      ? transformToCurrentWeekSchedule(availabilityData.availabilityBlocks)
      : scheduleData;

    // Hiển thị empty state nếu không có lịch
    if (!transformedSchedule || transformedSchedule.length === 0) {
      return (
        <div className="text-center py-12">
          <Clock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có lịch rảnh</h3>
          <p className="text-gray-500">
            {selectedCourseId
              ? "Gia sư này chưa có lịch rảnh cho khóa học đã chọn."
              : "Gia sư này chưa tạo lịch rảnh nào."}
          </p>
        </div>
      );
    }

    return (
      <div>
        {selectedCourseId && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <Clock className="h-4 w-4 inline mr-1" />
              Hiển thị lịch rảnh cho khóa học đã chọn
            </p>
          </div>
        )}
        <EBSchedule
          scheduleData={transformedSchedule}
          title={selectedCourseId ? "Lịch rảnh cho khóa học" : "Lịch rảnh trong tuần"}
          showHeader={true}
          showDate={true}
          mode="week"
        />
      </div>
    );
  };

  const renderReviewsTab = () => (
    <div className="flex gap-6">
      {/* Left side - Rating Summary */}
      <div className="w-80 flex-shrink-0">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Tổng quan đánh giá</h3>
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-primary mb-2">4.9</div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">127 đánh giá</div>
            </div>

            {/* Rating breakdown */}
            <div className="space-y-2">
              {[
                { stars: 5, count: 89, percentage: 70 },
                { stars: 4, count: 25, percentage: 20 },
                { stars: 3, count: 8, percentage: 6 },
                { stars: 2, count: 3, percentage: 2 },
                { stars: 1, count: 2, percentage: 2 },
              ].map((item) => (
                <div key={item.stars} className="flex items-center gap-2 text-sm">
                  <span className="w-2">{item.stars}</span>
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="w-6 text-right">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right side - Reviews List */}
      <div className="flex-1 space-y-4">
        {[
          {
            name: "Hoàng Minh",
            subject: "Toán lớp 12",
            date: "2024-01-15",
            rating: 5,
            comment:
              "Thầy dạy rất dễ hiểu, giải thích tỉ mỉ từng bước. Điểm Toán của em đã tăng từ 6 lên 8.5!",
          },
          {
            name: "Thu Hà",
            subject: "Vật lý",
            date: "2024-01-10",
            rating: 5,
            comment:
              "Phương pháp giảng dạy của thầy rất hay, em hiểu bài ngay. Thầy rất tận tâm và chu đáo.",
          },
          {
            name: "Đức Anh",
            subject: "Toán lớp 12",
            date: "2024-01-08",
            rating: 4,
            comment:
              "Thầy dạy hay, chỉ có điều thỉnh thoảng hơi nhanh. Nhưng nhìn chung rất hài lòng.",
          },
        ].map((review, index) => (
          <Card key={index} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-medium">{review.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {review.subject} • {review.date}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderAwardsTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[
        { title: "Giáo viên xuất sắc 2023", org: "Trung tâm giáo dục ABC", year: "2023" },
        { title: "Chứng chỉ TESOL", org: "Cambridge University", year: "2022" },
        { title: "Thạc sĩ Toán học", org: "Đại học Bách Khoa", year: "2021" },
        { title: "Giải nhất Olympic Toán", org: "Bộ Giáo dục", year: "2020" },
      ].map((award, index) => (
        <Card key={index} className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{award.title}</h3>
                <p className="text-sm text-muted-foreground">{award.org}</p>
                <p className="text-sm text-muted-foreground">{award.year}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  switch (activeTab) {
    case "courses":
      return renderCoursesTab();
    case "schedule":
      return renderScheduleTab();
    case "reviews":
      return renderReviewsTab();
    case "awards":
      return renderAwardsTab();
    default:
      return renderCoursesTab();
  }
};

export default TabContent;
