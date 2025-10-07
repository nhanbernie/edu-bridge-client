import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { UpdateCourseRequest, UpdateCourseResponse } from "../type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const updateCourseEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<UpdateCourseResponse, { courseId: string } & UpdateCourseRequest>({
    query: ({ courseId, ...body }) => ({
      url: API_ENDPOINTS.COURSE.UPDATE_COURSE.replace("{courseId}", courseId),
      method: "PUT",
      body,
    }),

    invalidatesTags: (result, error, { courseId }) => [{ type: "Course", id: courseId }, "Course"],
    transformResponse: (response: UpdateCourseResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      return response;
    },
  });
