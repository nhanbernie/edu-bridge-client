import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";
import { CourseFeedbacksResponse, FeedbackRouteParams } from "../type";

export const getCourseFeedbacksEndpoint = (builder: EndpointBuilder<any, any, any>) => {
  return builder.query<CourseFeedbacksResponse, FeedbackRouteParams>({
    query: ({ courseId }) => ({
      url: API_ENDPOINTS.FEEDBACK.GET_COURSE_FEEDBACKS.replace("{courseId}", courseId),
      method: "GET",
    }),

    providesTags: (result, error, { courseId }) => [
      { type: "CourseFeedbacks", id: courseId },
      "CourseFeedbacks",
    ],
    transformResponse: (response: CourseFeedbacksResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      return response;
    },
  });
};
