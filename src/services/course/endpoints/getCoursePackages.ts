import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { GetCoursePackagesRequest, GetCoursePackagesResponse } from "../type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const getCoursePackagesEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<GetCoursePackagesResponse, GetCoursePackagesRequest>({
    query: ({ courseId }) => ({
      url: API_ENDPOINTS.COURSE.GET_COURSE_PACKAGES.replace("{courseId}", courseId),
      method: "GET",
    }),

    providesTags: (result, error, { courseId }) => [
      { type: "CoursePackages", id: courseId },
      "CoursePackages",
    ],
    transformResponse: (response: GetCoursePackagesResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      console.error("Get course packages error:", response);
      return response;
    },
  });
