import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/baseQuery";
import {
  loginEndpoint,
  registerEndpoint,
  refreshTokenEndpoint,
  forgotPasswordEndpoint,
  verifyOtpEndpoint,
  resetPasswordEndpoint,
  resendOtpEndpoint,
  sendOtpRegisterEndpoint,
  verifyOtpRegisterEndpoint,
} from "./endpoints/index";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Auth"],
  endpoints: (builder) => ({
    login: loginEndpoint(builder),
    register: registerEndpoint(builder),
    refreshToken: refreshTokenEndpoint(builder),
    // Reset password flow
    forgotPassword: forgotPasswordEndpoint(builder),
    verifyOtp: verifyOtpEndpoint(builder),
    resetPassword: resetPasswordEndpoint(builder),
    resendOtp: resendOtpEndpoint(builder),
    // Email verification flow (for registration)
    sendOtpRegister: sendOtpRegisterEndpoint(builder),
    verifyOtpRegister: verifyOtpRegisterEndpoint(builder),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  // Reset password flow
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useResendOtpMutation,
  // Email verification flow (for registration)
  useSendOtpRegisterMutation,
  useVerifyOtpRegisterMutation,
} = authApi;
