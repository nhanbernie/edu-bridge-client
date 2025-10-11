import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "@/services/api/type";
import { CreateFeedbackRequest, CreateFeedbackResponse, FeedbackRouteParams } from "../type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const createFeedbackEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<
    ApiResponse<CreateFeedbackResponse>,
    CreateFeedbackRequest & FeedbackRouteParams
  >({
    query: ({ courseId, ...body }) => ({
      url: API_ENDPOINTS.FEEDBACK.CREATE_FEEDBACK.replace("{courseId}", courseId),
      method: "POST",
      body,
    }),
    invalidatesTags: ["Feedback", "TutorRating", "CourseRating"],
    transformResponse: (response: ApiResponse<CreateFeedbackResponse>) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      return response;
    },
  });
