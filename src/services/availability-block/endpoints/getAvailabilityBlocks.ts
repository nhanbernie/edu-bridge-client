import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { GetAvailabilityBlocksRequest, GetAvailabilityBlocksResponse } from "../type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const getAvailabilityBlocksEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<GetAvailabilityBlocksResponse, GetAvailabilityBlocksRequest>({
    query: ({ tutorId, courseId }) => {
      const baseUrl = API_ENDPOINTS.AVAILABILITY_BLOCK.GET_AVAILABILITY_BLOCKS.replace(
        "{tutorId}",
        tutorId || ""
      );

      const url = courseId ? `${baseUrl}?courseId=${courseId}` : baseUrl;

      return {
        url,
        method: "GET",
      };
    },

    providesTags: (_result, _error, { tutorId, courseId }) => {
      const tags = [{ type: "AvailabilityBlock", id: tutorId || "LIST" }, "AvailabilityBlock"];

      if (courseId) {
        tags.push({ type: "AvailabilityBlock", id: `${tutorId}-${courseId}` });
      }

      return tags;
    },
    transformResponse: (response: GetAvailabilityBlocksResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      return response;
    },
  });
