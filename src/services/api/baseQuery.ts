import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import {
  API_CONFIG,
  API_ENDPOINTS,
  PUBLIC_ENDPOINTS,
} from "@/constants/endpoint.constant";
import { StorageService } from "@/services/storage/secureStorage.service";

const getUrlFromArgs = (arg: any) => {
  if (typeof arg === "string") return arg;
  if (typeof arg === "object" && arg.url) return arg.url;
  return "";
};

// Base query with keychain
const baseQuery = fetchBaseQuery({
  baseUrl: API_CONFIG.BASE_URL,
  prepareHeaders: async (headers, { ...rest }) => {
    const url = getUrlFromArgs(rest.arg);
    const isPublic = PUBLIC_ENDPOINTS.some((ep) => url.includes(ep));
    if (!isPublic) {
      const token = await StorageService.getAccessToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }
    headers.set("Content-Type", "application/json");
    headers.set("Accept", "application/json");
    return headers;
  },
});

// Base query with refresh token interceptor
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Determine if this is a public endpoint
  const url = typeof args === "string" ? args : args.url;
  const isPublic = PUBLIC_ENDPOINTS.some((ep) => url.includes(ep));
  let result = await baseQuery(args, api, extraOptions);

  // If unauthorized (401), try to refresh token
  if (!isPublic && result.error && result.error.status === 401) {
    const refreshToken = await StorageService.getRefreshToken();

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: API_ENDPOINTS.AUTH.REFRESH,
          method: "POST",
          body: { refresh_token: refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const responseData = refreshResult.data as any;
        const newAccessToken = responseData.data?.access_token;
        const newRefreshToken = responseData.data?.refresh_token;

        if (newAccessToken) {
          await StorageService.setTokenData({
            access_token: newAccessToken,
            refresh_token: newRefreshToken || refreshToken,
            expires_in: responseData.data?.expires_in || 3600,
          });

          result = await baseQuery(args, api, extraOptions);
        } else {
          await StorageService.clearAuthData();
        }
      } else {
        await StorageService.clearAuthData();
      }
    } else {
      await StorageService.clearAuthData();
    }
  }

  return result;
};
