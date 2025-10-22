import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { ResetPasswordRequest, ResetPasswordResponse } from "@/services/api/type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const resetPasswordEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ResetPasswordResponse, ResetPasswordRequest>({
    query: (body) => ({
      url: API_ENDPOINTS.AUTH.RESET_PASSWORD,
      method: "POST",
      body,
    }),

    transformResponse: (response: ResetPasswordResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      return response;
    },
  });
