import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";
import { GetTutorTeachingsRequest, GetTutorTeachingsResponse } from "../type";

export const getTutorTeachingsEndpoint = (builder: EndpointBuilder<any, any, any>) => {
  return builder.query<GetTutorTeachingsResponse, GetTutorTeachingsRequest>({
    query: ({ tutorId }) => ({
      url: API_ENDPOINTS.COURSE.GET_TUTOR_TEACHINGS.replace("{tutorId}", tutorId),
      method: "GET",
    }),

    providesTags: (result, error, { tutorId }) => [
      { type: "TutorTeachings", id: tutorId },
      "TutorTeachings",
    ],
    transformResponse: (response: GetTutorTeachingsResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      return response;
    },
  });
};
