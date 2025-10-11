import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { GetMediaResponse } from "../types/media.type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const getMediaEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<GetMediaResponse, { tutorId: string }>({
    query: ({ tutorId }) => ({
      url: API_ENDPOINTS.USER.GET_MEDIA.replace("{tutorId}", tutorId),
      method: "GET",
    }),
    providesTags: (result, error, { tutorId }) => [
      { type: "TutorMedia", id: tutorId },
      "TutorMedia",
    ],
    transformResponse: (response: GetMediaResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      return response;
    },
  });
