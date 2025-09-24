import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";
import {
  getCourseEndpoint,
  createCourseEndpoint,
  updateCourseEndpoint,
  getCoursePackagesEndpoint,
} from "./endpoints/index";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Course", "CoursePackages"],
  endpoints: (builder) => ({
    getCourse: getCourseEndpoint(builder),
    createCourse: createCourseEndpoint(builder),
    updateCourse: updateCourseEndpoint(builder),
    getCoursePackages: getCoursePackagesEndpoint(builder),
  }),
});

export const {
  useGetCourseQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useGetCoursePackagesQuery,
} = courseApi;
