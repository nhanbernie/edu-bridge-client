import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { TutorFeedbacksResponse } from "../type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const getTutorFeedbacksEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<TutorFeedbacksResponse, { tutorId: string }>({
    query: ({ tutorId }) => ({
      url: API_ENDPOINTS.FEEDBACK.GET_TUTOR_FEEDBACKS.replace("{tutorId}", tutorId),
      method: "GET",
    }),

    providesTags: (result, error, { tutorId }) => [
      { type: "TutorFeedbacks", id: tutorId },
      "TutorFeedbacks",
    ],
    transformResponse: (response: TutorFeedbacksResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      return response;
    },
  });
