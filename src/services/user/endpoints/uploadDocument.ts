import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { UploadDocumentRequest, UploadDocumentResponse } from "@/services/api/type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const uploadDocumentEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<UploadDocumentResponse, UploadDocumentRequest>({
    query: ({ tutorId, docType, file }) => {
      const formData = new FormData();
      formData.append("docType", docType);
      formData.append("file", file);

      return {
        url: API_ENDPOINTS.USER.UPLOAD_VERIFICATION_DOC.replace("{tutorId}", tutorId),
        method: "POST",
        body: formData,
      };
    },
    invalidatesTags: ["UserOnboarding"],
    transformResponse: (response: UploadDocumentResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      return response;
    },
  });
