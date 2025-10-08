import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";
import { GetTutorFeedbacksResponse, TutorFeedbacksParams } from "../type";

export const getTutorFeedbacksEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<GetTutorFeedbacksResponse, TutorFeedbacksParams>({
    query: ({ tutorId }) => ({
      url: API_ENDPOINTS.FEEDBACK.GET_TUTOR_FEEDBACKS.replace("{tutorId}", tutorId),
      method: "GET",
    }),
    providesTags: ["TutorFeedbacks"],
  });
