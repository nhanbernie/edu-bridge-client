import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";
import {
  selectRoleEndpoint,
  uploadDocumentEndpoint,
  getUserProfileEndpoint,
  getVerificationDocsEndpoint,
  verifyAllDocumentsEndpoint,
  getAllUsersEndpoint,
  deleteUserEndpoint,
} from "./endpoints/index";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["UserProfile", "UserOnboarding"],
  endpoints: (builder) => ({
    getAllUsers: getAllUsersEndpoint(builder),
    getUserProfile: getUserProfileEndpoint(builder),
    selectRole: selectRoleEndpoint(builder),
    uploadDocument: uploadDocumentEndpoint(builder),
    getVerificationDocs: getVerificationDocsEndpoint(builder),
    verifyAllDocuments: verifyAllDocumentsEndpoint(builder),
    deleteUser: deleteUserEndpoint(builder),
    // TODO: Implement these endpoints when needed
    // updateProfile: updateProfileEndpoint(builder),
    // getProfile: getProfileEndpoint(builder),
    // deleteAccount: deleteAccountEndpoint(builder),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserProfileQuery,
  useSelectRoleMutation,
  useUploadDocumentMutation,
  useGetVerificationDocsQuery,
  useVerifyAllDocumentsMutation,
  useDeleteUserMutation,
} = userApi;
