import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { GetAvailabilityBlocksRequest, GetAvailabilityBlocksResponse } from "../type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const getAvailabilityBlocksEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<GetAvailabilityBlocksResponse, GetAvailabilityBlocksRequest>({
    query: ({ tutorId }) => ({
      url: API_ENDPOINTS.AVAILABILITY_BLOCK.GET_AVAILABILITY_BLOCKS.replace(
        "{tutorId}",
        tutorId || ""
      ),
      method: "GET",
    }),

    providesTags: (_result, _error, { tutorId }) => [
      { type: "AvailabilityBlock", id: tutorId || "LIST" },
      "AvailabilityBlock",
    ],
    transformResponse: (response: GetAvailabilityBlocksResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      console.error("Get availability blocks error:", response);
      return response;
    },
  });
