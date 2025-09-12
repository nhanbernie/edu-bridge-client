import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";
import { selectRoleEndpoint, uploadDocumentEndpoint } from "./endpoints/index";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["UserProfile", "UserOnboarding"],
  endpoints: (builder) => ({
    selectRole: selectRoleEndpoint(builder),
    uploadDocument: uploadDocumentEndpoint(builder),
    // TODO: Implement these endpoints when needed
    // updateProfile: updateProfileEndpoint(builder),
    // getProfile: getProfileEndpoint(builder),
    // deleteAccount: deleteAccountEndpoint(builder),
  }),
});

export const { useSelectRoleMutation, useUploadDocumentMutation } = userApi;
