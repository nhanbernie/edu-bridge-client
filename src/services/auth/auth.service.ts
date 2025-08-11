import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";
import { StoredUserData } from "../storage/secureStorage.service";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  data: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    user: StoredUserData;
  };
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
    getProfile: builder.query<{ data: StoredUserData }, void>({
      query: () => "/auth/profile",
      providesTags: ["Auth"],
    }),
  }),
});
