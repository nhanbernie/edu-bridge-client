import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { UpdateAvailabilityBlockRequest, UpdateAvailabilityBlockResponse } from "../type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const updateAvailabilityBlockEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<
    UpdateAvailabilityBlockResponse,
    { blockId: string } & UpdateAvailabilityBlockRequest
  >({
    query: ({ blockId, ...body }) => ({
      url: API_ENDPOINTS.AVAILABILITY_BLOCK.UPDATE_AVAILABILITY_BLOCK.replace("{blockId}", blockId),
      method: "PUT",
      body,
    }),

    invalidatesTags: (_result, _error, { blockId }) => [
      { type: "AvailabilityBlock", id: blockId },
      "AvailabilityBlock",
    ],
    transformResponse: (response: UpdateAvailabilityBlockResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      return response;
    },
  });
