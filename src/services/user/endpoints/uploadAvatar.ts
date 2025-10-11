import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "@/services/api/type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

interface UploadAvatarResponse {
  avatarUrl: string;
}

export const uploadAvatarEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<ApiResponse<UploadAvatarResponse>, { userId: string; file: File }>({
    query: ({ userId, file }) => {
      const formData = new FormData();
      formData.append("File", file);

      return {
        url: API_ENDPOINTS.USER.UPLOAD_AVATAR.replace("{userId}", userId),
        method: "POST",
        body: formData,
      };
    },
    invalidatesTags: ["UserProfile"],
    transformResponse: (response: ApiResponse<UploadAvatarResponse>) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      return response;
    },
  });
