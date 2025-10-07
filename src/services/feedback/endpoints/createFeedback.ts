import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { CreateFeedbackRequest, CreateFeedbackResponse, FeedbackRouteParams } from "../type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const createFeedbackEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<CreateFeedbackResponse, CreateFeedbackRequest & FeedbackRouteParams>({
    query: ({ courseId, ...body }) => ({
      url: API_ENDPOINTS.FEEDBACK.CREATE_FEEDBACK.replace("{courseId}", courseId),
      method: "POST",
      body,
    }),
    invalidatesTags: ["Feedback", "TutorRating", "CourseRating"],
    transformErrorResponse: (response: any) => {
      console.error("Create feedback error:", response);
      return response;
    },
  });
