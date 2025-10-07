import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { ForgotPasswordRequest, ForgotPasswordResponse } from "@/services/api/type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const forgotPasswordEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
    query: (body) => ({
      url: API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      method: "POST",
      body,
    }),

    transformResponse: (response: ForgotPasswordResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      return response;
    },
  });
