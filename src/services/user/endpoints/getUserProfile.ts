import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { ApiResponse, UserDto } from "@/services/api/type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const getUserProfileEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<ApiResponse<UserDto>, { userId: string }>({
    query: ({ userId }) => ({
      url: API_ENDPOINTS.USER.GET_USER.replace("{id}", userId),
      method: "GET",
    }),

    providesTags: ["UserProfile"],
    transformResponse: (response: ApiResponse<UserDto>) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      console.error("Get user profile error:", response);
      return response;
    },
  });
