import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { OnboardingRequest, ApiResponse, OnboardingResponse } from "@/services/api/type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const selectRoleEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ApiResponse<OnboardingResponse>, { userId: string; data: OnboardingRequest }>({
    query: ({ userId, data }) => ({
      url: API_ENDPOINTS.USER.SELECT_ROLE.replace("{id}", userId),
      method: "POST",
      body: data,
    }),

    invalidatesTags: ["User"],
    transformResponse: (response: ApiResponse<OnboardingResponse>) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      console.error("Select role error:", response);
      return response;
    },
  });
