import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { GetAllUsersRequest, GetAllUsersResponse } from "@/services/api/type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const getAllUsersEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.query<GetAllUsersResponse, GetAllUsersRequest>({
    query: ({ role, status } = {}) => {
      const params = new URLSearchParams();

      // Add query parameters as numbers
      if (role !== undefined) {
        params.append("role", role.toString());
      }

      if (status !== undefined) {
        params.append("status", status.toString());
      }

      const queryString = params.toString();
      const url = queryString
        ? `${API_ENDPOINTS.USER.GET_ALL_USERS}?${queryString}`
        : API_ENDPOINTS.USER.GET_ALL_USERS;

      return {
        url,
        method: "GET",
      };
    },

    providesTags: ["UserProfile"],
    transformResponse: (response: GetAllUsersResponse) => {
      return response;
    },
    transformErrorResponse: (response: any) => {
      return response;
    },
  });
