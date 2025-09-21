"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, Calendar, Award, BookOpen, Users } from "lucide-react";

interface TabContentProps {
  activeTab: string;
}

const TabContent: React.FC<TabContentProps> = ({ activeTab }) => {
  const renderCoursesTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((course) => (
          <Card key={course} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">Toán học cơ bản {course}</CardTitle>
                <Badge variant="secondary">Phổ biến</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  <span>12 bài học</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>25 học sinh đã đăng ký</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>2 giờ/buổi</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-semibold text-primary">
                    200,000 VNĐ/buổi
                  </span>
                  <Button size="sm">Đăng ký</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderScheduleTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Lịch rảnh trong tuần
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-4">
            {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day, index) => (
              <div key={day} className="text-center">
                <div className="font-medium mb-2">{day}</div>
                <div className="space-y-1">
                  {index < 5 ? (
                    <>
                      <div className="bg-green-100 text-green-800 text-xs p-1 rounded">
                        8:00-10:00
                      </div>
                      <div className="bg-green-100 text-green-800 text-xs p-1 rounded">
                        14:00-16:00
                      </div>
                      <div className="bg-green-100 text-green-800 text-xs p-1 rounded">
                        19:00-21:00
                      </div>
                    </>
                  ) : (
                    <div className="bg-blue-100 text-blue-800 text-xs p-1 rounded">
                      Cả ngày
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderReviewsTab = () => (
    <div className="space-y-6">
      {[1, 2, 3].map((review) => (
        <Card key={review}>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-medium">H{review}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">Học sinh {review}</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">2 ngày trước</span>
                </div>
                <p className="text-muted-foreground">
                  Thầy dạy rất tận tâm và dễ hiểu. Phương pháp giảng dạy phù hợp với học sinh.
                  Tôi đã cải thiện được điểm số rất nhiều sau khi học với thầy.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderAwardsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: "Giáo viên xuất sắc 2023", org: "Trung tâm giáo dục ABC", year: "2023" },
          { title: "Chứng chỉ TESOL", org: "Cambridge University", year: "2022" },
          { title: "Thạc sĩ Toán học", org: "Đại học Bách Khoa", year: "2021" },
          { title: "Giải nhất Olympic Toán", org: "Bộ Giáo dục", year: "2020" },
        ].map((award, index) => (
          <Card key={index}>
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
