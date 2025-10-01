import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";
import { 
  loginEndpoint, 
  registerEndpoint, 
  refreshTokenEndpoint,
  forgotPasswordEndpoint,
  verifyOtpEndpoint,
  resetPasswordEndpoint,
  resendOtpEndpoint
} from "./endpoints/index";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Auth"],
  endpoints: (builder) => ({
    login: loginEndpoint(builder),
    register: registerEndpoint(builder),
    refreshToken: refreshTokenEndpoint(builder),
    forgotPassword: forgotPasswordEndpoint(builder),
    verifyOtp: verifyOtpEndpoint(builder),
    resetPassword: resetPasswordEndpoint(builder),
    resendOtp: resendOtpEndpoint(builder),
  }),
});

export const { 
  useLoginMutation, 
  useRegisterMutation, 
  useRefreshTokenMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useResendOtpMutation
} = authApi;
