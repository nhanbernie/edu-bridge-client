import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { ApiResponse, UserDto } from "@/services/api/type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const getUserEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ApiResponse<UserDto>, { userId: string }>({
    query: ({ userId }) => ({
      url: API_ENDPOINTS.USER.GET_USER.replace("{id}", userId),
      method: "GET",
    }),

    providesTags: (result, error, { userId }) => [
      { type: "UserProfile", id: userId },
      "UserProfile",
    ],
    transformResponse: (response: ApiResponse<UserDto>) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      return response;
    },
  });
