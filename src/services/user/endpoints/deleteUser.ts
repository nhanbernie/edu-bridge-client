import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { DeleteUserRequest, DeleteUserResponse } from "@/services/api/type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const deleteUserEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<DeleteUserResponse, DeleteUserRequest>({
    query: ({ userId }) => ({
      url: API_ENDPOINTS.USER.DELETE_USER.replace("{id}", userId),
      method: "DELETE",
    }),

    invalidatesTags: ["UserProfile"],
    transformResponse: (response: DeleteUserResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      console.error("Delete user error:", response);
      return response;
    },
  });
