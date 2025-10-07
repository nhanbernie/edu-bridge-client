import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { GetRatingResponse, TutorRatingRouteParams } from "../type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const getTutorRatingEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<GetRatingResponse, TutorRatingRouteParams>({
    query: ({ tutorId }) => ({
      url: API_ENDPOINTS.FEEDBACK.GET_TUTOR_RATING.replace("{tutorId}", tutorId),
      method: "GET",
    }),
    providesTags: ["TutorRating"],
    transformErrorResponse: (response: any) => {
      console.error("Get tutor rating error:", response);
      return response;
    },
  });
