import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";
import { ApiResponse } from "@/services/api/type";
import { MediaItem, MediaType } from "../types/media.type";

export interface UpdateMediaRequest {
  tutorId: string;
  mediaId: string;
  file?: File;
  title: string;
  type: MediaType;
}

export type UpdateMediaResponse = ApiResponse<MediaItem>;

export const updateMediaEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<UpdateMediaResponse, UpdateMediaRequest>({
    query: ({ tutorId, mediaId, file, title, type }) => {
      const formData = new FormData();
      if (file) {
        formData.append("File", file);
      }
      formData.append("Title", title);
      formData.append("Type", type);

      return {
        url: API_ENDPOINTS.USER.UPDATE_MEDIA.replace("{tutorId}", tutorId).replace(
          "{mediaId}",
          mediaId
        ),
        method: "PUT",
        body: formData,
      };
    },
    invalidatesTags: (result, error, { tutorId, type }) => [
      { type: "TutorMedia", id: `${tutorId}-${type}` },
      "TutorMedia",
    ],
    transformResponse: (response: UpdateMediaResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      return response;
    },
  });
