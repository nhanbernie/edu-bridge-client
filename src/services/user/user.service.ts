import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";
import {
  selectRoleEndpoint,
  uploadDocumentEndpoint,
  getUserProfileEndpoint,
  getUserEndpoint,
  getVerificationDocsEndpoint,
  verifyAllDocumentsEndpoint,
  getAllUsersEndpoint,
  deleteUserEndpoint,
  checkVerificationEndpoint,
  uploadAvatarEndpoint,
} from "./endpoints/index";
import { getSubjectsEndpoint } from "@/services/common";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["UserProfile", "UserOnboarding", "UserVerification"],
  endpoints: (builder) => ({
    getAllUsers: getAllUsersEndpoint(builder),
    getUser: getUserEndpoint(builder),
    getUserProfile: getUserProfileEndpoint(builder),
    getSubjects: getSubjectsEndpoint(builder),
    selectRole: selectRoleEndpoint(builder),
    uploadDocument: uploadDocumentEndpoint(builder),
    getVerificationDocs: getVerificationDocsEndpoint(builder),
    verifyAllDocuments: verifyAllDocumentsEndpoint(builder),
    deleteUser: deleteUserEndpoint(builder),
    checkVerification: checkVerificationEndpoint(builder),
    uploadAvatar: uploadAvatarEndpoint(builder),
    // TODO: Implement these endpoints when needed
    // updateProfile: updateProfileEndpoint(builder),
    // getProfile: getProfileEndpoint(builder),
    // deleteAccount: deleteAccountEndpoint(builder),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserQuery,
  useGetUserProfileQuery,
  useGetSubjectsQuery,
  useSelectRoleMutation,
  useUploadDocumentMutation,
  useGetVerificationDocsQuery,
  useVerifyAllDocumentsMutation,
  useDeleteUserMutation,
  useCheckVerificationQuery,
  useLazyCheckVerificationQuery,
  useUploadAvatarMutation,
} = userApi;
