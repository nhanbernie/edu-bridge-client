import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { ResendOtpRequest, ResendOtpResponse } from "@/services/api/type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const resendOtpEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ResendOtpResponse, ResendOtpRequest>({
    query: (body) => ({
      url: API_ENDPOINTS.AUTH.RESEND_OTP,
      method: "POST",
      body,
    }),

    transformResponse: (response: ResendOtpResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      console.error("Resend OTP error:", response);
      return response;
    },
  });
