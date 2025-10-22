import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { API_CONFIG, API_ENDPOINTS } from "@/common/constants/endpoint.constant";
import { StorageService } from "@/services/storage/secureStorage.service";
import { joinUrl } from "@/utils/joinUrl";
import { isPublicPath, shouldSetContentType } from "@/utils/isPublicPath";

const refreshMutex = new Mutex();

const getUrlFromArgs = (arg: any): string => {
  if (typeof arg === "string") return arg;
  if (typeof arg === "object" && arg?.url) return arg.url;
  return "";
};

const getMethodFromArgs = (arg: any): string => {
  if (typeof arg === "object" && arg?.method) return arg.method;
  return "GET";
};

const getBodyFromArgs = (arg: any): any => {
  if (typeof arg === "object" && arg?.body !== undefined) return arg.body;
  return undefined;
};

const redirectToLogin = (): void => {
  if (typeof window !== "undefined") {
    // Get current locale from URL or default to 'en'
    const currentPath = window.location.pathname;
    const locale = currentPath.split("/")[1] || "en";
    window.location.href = `/${locale}/login`;
  }
};
const createBaseQuery = (accessToken?: string) => {
  return fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    prepareHeaders: async (headers, { endpoint, ...rest }) => {
      const url = getUrlFromArgs(rest.arg);
      const method = getMethodFromArgs(rest.arg);
      const body = getBodyFromArgs(rest.arg);

      if (!isPublicPath(url)) {
        const token = accessToken || (await StorageService.getAccessToken());
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }

      if (shouldSetContentType(method, body)) {
        headers.set("Content-Type", "application/json");
      }

      headers.set("Accept", "application/json");

      return headers;
    },
  });
};

const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = await StorageService.getRefreshToken();

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const refreshUrl = joinUrl(API_CONFIG.BASE_URL || "", API_ENDPOINTS.AUTH.REFRESH);

  const response = await fetch(refreshUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Refresh failed: ${response.status}`);
  }

  const responseData = await response.json();
  const newAccessToken = responseData.data?.accessToken || responseData.data?.access_token;
  const newRefreshToken = responseData.data?.refreshToken || responseData.data?.refresh_token;
  const expiresIn = responseData.data?.expires_in || 3600;

  if (!newAccessToken) {
    throw new Error("No access token in refresh response");
  }

  await StorageService.setTokenData({
    access_token: newAccessToken,
    refresh_token: newRefreshToken || refreshToken,
    expires_in: expiresIn,
  });

  return newAccessToken;
};

const shouldRefreshToken = (error: FetchBaseQueryError): boolean => {
  if (typeof error.status === "number") {
    return [401, 403, 419, 440].includes(error.status);
  }

  if (error.status === "PARSING_ERROR" && error.originalStatus === 401) {
    return true;
  }

  return false;
};

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const url = getUrlFromArgs(args);

  if (isPublicPath(url)) {
    const baseQuery = createBaseQuery();
    return await baseQuery(args, api, extraOptions);
  }

  const baseQuery = createBaseQuery();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && shouldRefreshToken(result.error)) {
    const release = await refreshMutex.acquire();

    try {
      const currentToken = await StorageService.getAccessToken();
      const retryQuery = createBaseQuery(currentToken || undefined);
      const retryResult = await retryQuery(args, api, extraOptions);

      if (retryResult.error && shouldRefreshToken(retryResult.error)) {
        try {
          const newAccessToken = await refreshAccessToken();

          if (newAccessToken) {
            const finalQuery = createBaseQuery(newAccessToken);
            result = await finalQuery(args, api, extraOptions);
          } else {
            throw new Error("Failed to get new access token");
          }
        } catch (refreshError) {
          await StorageService.clearAuthData();
          redirectToLogin();
          return result;
        }
      } else {
        result = retryResult;
      }
    } finally {
      release();
    }
  }

  return result;
};

export const baseQuery = createBaseQuery();
