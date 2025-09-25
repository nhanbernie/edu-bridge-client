"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, Award, BookOpen, Users } from "lucide-react";
import EBTutorCard from "@/components/common/EBTutorCourseCard";
import EBSchedule from "@/components/common/EBSchedule";
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
  scheduleData?: DaySchedule[];
}

const TabContent: React.FC<TabContentProps> = ({ activeTab, scheduleData }) => {
  const renderCoursesTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((course) => (
        <EBTutorCard key={course} course={course} />
      ))}
    </div>
  );

  const renderScheduleTab = () => <EBSchedule scheduleData={scheduleData} />;

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
