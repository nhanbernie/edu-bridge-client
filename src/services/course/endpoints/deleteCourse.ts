import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export interface DeleteCourseRequest {
  courseId: string;
}

export interface DeleteCourseResponse {
  success: boolean;
  message: string;
  errors: any[] | null;
}

export const deleteCourseEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<DeleteCourseResponse, DeleteCourseRequest>({
    query: ({ courseId }) => ({
      url: API_ENDPOINTS.COURSE.UPDATE_COURSE.replace("{courseId}", courseId),
      method: "DELETE",
    }),

    invalidatesTags: ["Course"],
    transformResponse: (response: DeleteCourseResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      console.error("Delete course error:", response);
      return response;
    },
  });
