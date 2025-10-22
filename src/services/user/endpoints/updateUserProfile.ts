import { EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { UpdateUserProfileRequest, UpdateUserProfileResponse } from "../types/profile.type";
import { API_ENDPOINTS } from "@/common/constants/endpoint.constant";

export const updateUserProfileEndpoint = (builder: EndpointBuilder<any, any, any>) =>
  builder.mutation<UpdateUserProfileResponse, UpdateUserProfileRequest>({
    query: ({ userId, ...body }) => ({
      url: API_ENDPOINTS.USER.UPDATE_USER_PROFILE.replace("{userId}", userId),
      method: "PUT",
      body,
    }),
    invalidatesTags: ["User", "UserProfile"],
  });
