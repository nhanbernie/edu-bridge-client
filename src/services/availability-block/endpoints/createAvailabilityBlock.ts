import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { CreateAvailabilityBlockRequest, CreateAvailabilityBlockResponse } from "../type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const createAvailabilityBlockEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<CreateAvailabilityBlockResponse, CreateAvailabilityBlockRequest>({
    query: (body) => ({
      url: API_ENDPOINTS.AVAILABILITY_BLOCK.CREATE_AVAILABILITY_BLOCK,
      method: "POST",
      body,
    }),

    invalidatesTags: ["AvailabilityBlock"],
    transformResponse: (response: CreateAvailabilityBlockResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      return response;
    },
  });
