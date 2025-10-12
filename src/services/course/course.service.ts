import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";
import {
  getCourseEndpoint,
  createCourseEndpoint,
  updateCourseEndpoint,
  deleteCourseEndpoint,
  getCoursePackagesEndpoint,
  getStudentEnrollmentsEndpoint,
  getTutorTeachingsEndpoint,
} from "./endpoints/index";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Course", "CoursePackages", "CourseEnrollments", "TutorTeachings"],
  endpoints: (builder) => ({
    getCourse: getCourseEndpoint(builder),
    createCourse: createCourseEndpoint(builder),
    updateCourse: updateCourseEndpoint(builder),
    deleteCourse: deleteCourseEndpoint(builder),
    getCoursePackages: getCoursePackagesEndpoint(builder),
    getStudentEnrollments: getStudentEnrollmentsEndpoint(builder),
    getTutorTeachings: getTutorTeachingsEndpoint(builder),
  }),
});

export const {
  useGetCourseQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useGetCoursePackagesQuery,
  useGetStudentEnrollmentsQuery,
  useLazyGetStudentEnrollmentsQuery,
  useGetTutorTeachingsQuery,
  useLazyGetTutorTeachingsQuery,
} = courseApi;
