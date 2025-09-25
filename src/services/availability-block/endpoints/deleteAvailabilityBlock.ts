import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { DeleteAvailabilityBlockRequest, DeleteAvailabilityBlockResponse } from "../type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const deleteAvailabilityBlockEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<DeleteAvailabilityBlockResponse, DeleteAvailabilityBlockRequest>({
    query: ({ blockId }) => ({
      url: API_ENDPOINTS.AVAILABILITY_BLOCK.DELETE_AVAILABILITY_BLOCK.replace("{blockId}", blockId),
      method: "DELETE",
    }),

    invalidatesTags: ["AvailabilityBlock"],
    transformResponse: (response: DeleteAvailabilityBlockResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      console.error("Delete availability block error:", response);
      return response;
    },
  });
