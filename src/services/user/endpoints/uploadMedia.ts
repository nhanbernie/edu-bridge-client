import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { UploadMediaRequest, UploadMediaResponse } from "../types/media.type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const uploadMediaEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<UploadMediaResponse, UploadMediaRequest>({
    query: ({ tutorId, file, title, type }) => {
      const formData = new FormData();
      formData.append("File", file);
      formData.append("Title", title);
      formData.append("Type", type);

      return {
        url: API_ENDPOINTS.USER.UPLOAD_MEDIA.replace("{tutorId}", tutorId),
        method: "POST",
        body: formData,
      };
    },
    invalidatesTags: (result, error, { tutorId, type }) => [
      { type: "TutorMedia", id: `${tutorId}-${type}` },
      "TutorMedia",
    ],
    transformResponse: (response: UploadMediaResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      return response;
    },
  });
