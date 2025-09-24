import React from "react";
import {
  useGetCourseQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useGetCoursePackagesQuery,
} from "./course.service";
import { CreateCourseRequest, UpdateCourseRequest, PackageType } from "./type";

// Example component demonstrating course API usage
export const CourseExample: React.FC = () => {
  const tutorId = "dd4eaa0c-5f90-44bb-b501-6da25154f646"; // Example tutor ID
  const courseId = "f7217cbb-f424-4294-a4df-ab5f77f64710"; // Example course ID

  // Query hooks
  const {
    data: courseData,
    isLoading: isCourseLoading,
    error: courseError,
  } = useGetCourseQuery({ tutorId });

  const {
    data: packagesData,
    isLoading: isPackagesLoading,
    error: packagesError,
  } = useGetCoursePackagesQuery({ courseId });

  // Mutation hooks
  const [createCourse, { isLoading: isCreating }] = useCreateCourseMutation();
  const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();

  // Example handlers
  const handleCreateCourse = async () => {
    const newCourse: CreateCourseRequest = {
      title: "Mathematics Fundamentals",
      description: "Basic mathematics course covering algebra and geometry",
      subjects: ["Mathematics", "Physics"],
      isPublished: true,
      hoursPerSession: 2,
      hourlyRate: 150000,
    };

    try {
      const result = await createCourse(newCourse).unwrap();
      console.log("Course created:", result);
    } catch (error) {
      console.error("Failed to create course:", error);
    }
  };

  const handleUpdateCourse = async () => {
    const updates: UpdateCourseRequest = {
      title: "Advanced Mathematics",
      hourlyRate: 200000,
    };

    try {
      const result = await updateCourse({ courseId, ...updates }).unwrap();
      console.log("Course updated:", result);
    } catch (error) {
      console.error("Failed to update course:", error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Course API Example</h1>

      {/* Course Information */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Course Information</h2>
        {isCourseLoading && <p>Loading course...</p>}
        {courseError && <p className="text-red-500">Error loading course</p>}
        {courseData?.success && (
          <div className="space-y-2">
            <p><strong>Title:</strong> {courseData.data.title}</p>
            <p><strong>Description:</strong> {courseData.data.description}</p>
            <p><strong>Subjects:</strong> {courseData.data.subjects.join(", ")}</p>
            <p><strong>Hourly Rate:</strong> {courseData.data.hourlyRate.toLocaleString()} VND</p>
            <p><strong>Hours per Session:</strong> {courseData.data.hoursPerSession}</p>
            <p><strong>Published:</strong> {courseData.data.isPublished ? "Yes" : "No"}</p>
          </div>
        )}
      </div>

      {/* Course Packages */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Course Packages</h2>
        {isPackagesLoading && <p>Loading packages...</p>}
        {packagesError && <p className="text-red-500">Error loading packages</p>}
        {packagesData?.success && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {packagesData.data.map((pkg) => (
              <div key={pkg.packageId} className="border p-3 rounded">
                <h3 className="font-medium">
                  {PackageType[pkg.packageType]} Package
                </h3>
                <p>Sessions: {pkg.numberOfSessions}</p>
                <p>Price: {pkg.price.toLocaleString()} VND</p>
                <p>Service Fee: {pkg.serviceFeePercentage}%</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Actions</h2>
        <div className="space-x-4">
          <button
            onClick={handleCreateCourse}
            disabled={isCreating}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isCreating ? "Creating..." : "Create Course"}
          </button>
          <button
            onClick={handleUpdateCourse}
            disabled={isUpdating}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {isUpdating ? "Updating..." : "Update Course"}
          </button>
        </div>
      </div>
    </div>
  );
};
