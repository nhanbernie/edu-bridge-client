import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { CheckVerificationResponse } from "@/services/api/type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export interface CheckVerificationParams {
  tutorId: string;
}

export const checkVerificationEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<CheckVerificationResponse, CheckVerificationParams>({
    query: ({ tutorId }) => ({
      url: API_ENDPOINTS.USER.CHECK_VERIFICATION.replace("{tutorId}", tutorId),
      method: "GET",
    }),
    providesTags: (result, error, { tutorId }) => [
      { type: "UserVerification", id: tutorId },
      "UserVerification",
    ],
    transformErrorResponse: (response: any) => {
      return response;
    },
  });
