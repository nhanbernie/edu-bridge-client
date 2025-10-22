import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { GetVerificationDocsRequest, GetVerificationDocsResponse } from "@/services/api/type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const getVerificationDocsEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<GetVerificationDocsResponse, GetVerificationDocsRequest>({
    query: ({ tutorId }) => ({
      url: API_ENDPOINTS.USER.GET_VERIFICATION_DOCS.replace("{tutorId}", tutorId),
      method: "GET",
    }),

    providesTags: ["UserOnboarding"],
    transformResponse: (response: GetVerificationDocsResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      return response;
    },
  });
