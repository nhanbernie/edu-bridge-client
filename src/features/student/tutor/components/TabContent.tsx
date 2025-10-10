"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Clock, Award, BookOpen, Loader2 } from "lucide-react";
import EBTutorCard from "@/components/common/EBTutorCourseCard";
import EBSchedule from "@/components/common/EBSchedule";
import RatingSummary from "@/components/common/RatingSummary";
import type { useManageCourses } from "@/features/tutor/courses/hooks/useManageCourses";
import type { useAvailabilityBlock } from "@/hooks/useAvailabilityBlock";
import { transformToCurrentWeekSchedule } from "@/utils/scheduleTransform";
import { useTutorFeedbacksData } from "../hooks/useTutorFeedbacks";

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
  // Get tutor feedbacks data
  const { feedbacksData, isLoading: isLoadingFeedbacks } = useTutorFeedbacksData({
    tutorId: tutorId || "",
    enabled: !!tutorId && activeTab === "reviews",
  });
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
      ? transformToCurrentWeekSchedule(availabilityData.availabilityBlocks, new Date())
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

  const renderReviewsTab = () => {
    if (isLoadingFeedbacks) {
      return (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Đang tải đánh giá...</span>
        </div>
      );
    }

    return (
      <div className="flex gap-6">
        {/* Left side - Rating Summary */}
        <div className="w-80 flex-shrink-0">
          <RatingSummary
            type="view"
            totalFeedbacks={feedbacksData?.totalFeedbacks}
            averageTutorRating={feedbacksData?.averageTutorRating}
            ratingCounts={feedbacksData?.ratingCounts}
          />
        </div>

        {/* Right side - Reviews List */}
        <div className="flex-1 space-y-4">
          {feedbacksData?.feedbacks?.map((feedback, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="mb-3">
                  <div className="font-medium text-lg mb-1">{feedback.studentName}</div>
                  <div className="text-sm text-muted-foreground mb-3">
                    {feedback.courseTitle} •{" "}
                    {new Date(feedback.createdAt).toLocaleDateString("vi-VN")}
                  </div>

                  {/* Tutor Rating */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-muted-foreground font-semibold">Tutor:</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < feedback.tutorRating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Course Rating */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground font-semibold">Course:</span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < feedback.courseRating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{feedback.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

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
