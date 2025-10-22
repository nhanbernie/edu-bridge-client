import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { VerifyOtpRequest, VerifyOtpResponse } from "@/services/api/type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const verifyOtpEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
    query: (body) => ({
      url: API_ENDPOINTS.AUTH.VERIFY_OTP,
      method: "POST",
      body,
    }),

    transformResponse: (response: VerifyOtpResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      return response;
    },
  });
