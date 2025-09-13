import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { VerifyAllDocumentsRequest, VerifyAllDocumentsResponse } from "@/services/api/type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const verifyAllDocumentsEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<VerifyAllDocumentsResponse, VerifyAllDocumentsRequest>({
    query: ({ tutorId, isApproved, rejectType, tutorType }) => {
      const body: { isApproved: boolean; rejectType?: string; tutorType?: string } = { isApproved };

      if (rejectType) {
        body.rejectType = rejectType;
      }

      if (tutorType) {
        body.tutorType = tutorType;
      }

      return {
        url: API_ENDPOINTS.USER.VERIFY_ALL_DOCUMENTS.replace("{tutorId}", tutorId),
        method: "PUT",
        body,
      };
    },

    invalidatesTags: ["UserOnboarding"],
    transformResponse: (response: VerifyAllDocumentsResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      console.error("Verify all documents error:", response);
      return response;
    },
  });
