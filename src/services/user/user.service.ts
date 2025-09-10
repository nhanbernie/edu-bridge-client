import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";
import { selectRoleEndpoint } from "./endpoints/index";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    selectRole: selectRoleEndpoint(builder),
    // TODO: Implement these endpoints when needed
    // updateProfile: updateProfileEndpoint(builder),
    // getProfile: getProfileEndpoint(builder),
    // deleteAccount: deleteAccountEndpoint(builder),
  }),
});

export const { useSelectRoleMutation } = userApi;
