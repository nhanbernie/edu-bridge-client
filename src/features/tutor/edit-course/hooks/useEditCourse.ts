import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { 
  useUpdateCourseMutation, 
  useGetCourseQuery,
  type UpdateCourseRequest,
  type CourseDto 
} from "@/services/course";
import { CourseFormData } from "@/components/form/course";

export const useEditCourse = (courseId: string) => {
  const router = useRouter();
  const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();
  const { 
    data: courseResponse, 
    isLoading: isLoadingCourse, 
    error: courseError 
  } = useGetCourseQuery({ tutorId: "dd4eaa0c-5f90-44bb-b501-6da25154f646" }); // TODO: Get from auth

  const [initialData, setInitialData] = useState<CourseFormData | null>(null);

  // Transform CourseDto to CourseFormData
  useEffect(() => {
    if (courseResponse?.success && courseResponse.data) {
      const courseData = Array.isArray(courseResponse.data) 
        ? courseResponse.data.find((course: CourseDto) => course.courseId === courseId)
        : courseResponse.data.courseId === courseId 
          ? courseResponse.data 
          : null;

      if (courseData) {
        setInitialData({
          title: courseData.title,
          description: courseData.description,
          subjects: courseData.subjects,
          isPublished: courseData.isPublished,
          hoursPerSession: courseData.hoursPerSession,
          hourlyRate: courseData.hourlyRate,
        });
      }
    }
  }, [courseResponse, courseId]);

  const handleUpdateCourse = useCallback(async (formData: CourseFormData) => {
    try {
      // Transform form data to API request format
      const updateRequest: UpdateCourseRequest = {
        title: formData.title,
        description: formData.description,
        subjects: formData.subjects,
        isPublished: formData.isPublished,
        hoursPerSession: formData.hoursPerSession,
        hourlyRate: formData.hourlyRate,
      };

      const response = await updateCourse({ 
        courseId, 
        ...updateRequest 
      }).unwrap();

      if (response.success) {
        toast.success("Cập nhật khóa học thành công!");
        router.push("/tutor/courses");
      } else {
        toast.error(response.message || "Có lỗi xảy ra khi cập nhật khóa học");
      }
    } catch (error: any) {
      console.error("Error updating course:", error);
      
      // Handle different error types
      if (error?.data?.message) {
        toast.error(error.data.message);
      } else if (error?.message) {
        toast.error(error.message);
      } else {
        toast.error("Có lỗi xảy ra khi cập nhật khóa học. Vui lòng thử lại.");
      }
    }
  }, [courseId, updateCourse, router]);

  const handleCancel = useCallback(() => {
    router.push("/tutor/courses");
  }, [router]);

  // Handle loading error
  if (courseError) {
    console.error("Error loading course:", courseError);
    toast.error("Không thể tải thông tin khóa học. Vui lòng thử lại.");
  }

  return {
    // Data
    initialData,
    courseId,
    
    // Loading states
    isLoading: isUpdating,
    isLoadingCourse,
    
    // Actions
    handleUpdateCourse,
    handleCancel,
  };
};
