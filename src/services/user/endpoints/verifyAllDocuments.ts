import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import {
  VerifyAllDocumentsRequest,
  VerifyAllDocumentsResponse,
  TutorType,
} from "@/services/api/type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const verifyAllDocumentsEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<VerifyAllDocumentsResponse, VerifyAllDocumentsRequest>({
    query: ({ tutorId, isApproved, tutorType }) => {
      const body: { isApproved: boolean; tutorType?: TutorType } = {
        isApproved,
        ...(tutorType && { tutorType }),
      };

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
      return response;
    },
  });
