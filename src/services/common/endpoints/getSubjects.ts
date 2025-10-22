import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";
import { ApiResponse } from "@/services/api/type";
import { GetSubjectsRequest, GetSubjectsResponse } from "../type";

export const getSubjectsEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ApiResponse<string[]>, GetSubjectsRequest>({
    query: ({ tutorId }) => ({
      url: API_ENDPOINTS.TUTOR.GET_SUBJECTS.replace("{tutorId}", tutorId),
      method: "GET",
    }),
    providesTags: ["UserProfile"],
    transformResponse: (response: ApiResponse<string[]>) => response,
    transformErrorResponse: (response: any) => response,
  });

