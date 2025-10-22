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
  uploadMediaEndpoint,
  getMediaEndpoint,
  updateMediaEndpoint,
  updateUserProfileEndpoint,
} from "./endpoints/index";
import { getSubjectsEndpoint } from "@/services/common";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "UserProfile", "UserOnboarding", "UserVerification", "TutorMedia"],
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
    uploadMedia: uploadMediaEndpoint(builder),
    getMedia: getMediaEndpoint(builder),
    updateMedia: updateMediaEndpoint(builder),
    updateUserProfile: updateUserProfileEndpoint(builder),
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
  useUploadMediaMutation,
  useGetMediaQuery,
  useLazyGetMediaQuery,
  useUpdateMediaMutation,
  useUpdateUserProfileMutation,
} = userApi;
