import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { API_CONFIG, API_ENDPOINTS, PUBLIC_ENDPOINTS } from "@/common/constants/endpoint.constant";
import { StorageService } from "@/services/storage/secureStorage.service";

const getUrlFromArgs = (arg: any) => {
  if (typeof arg === "string") return arg;
  if (typeof arg === "object" && arg.url) return arg.url;
  return "";
};

const redirectToLogin = () => {
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};

// Base query with keychain
const baseQuery = fetchBaseQuery({
  baseUrl: API_CONFIG.BASE_URL,
  prepareHeaders: async (headers, { endpoint, ...rest }) => {
    const url = getUrlFromArgs(rest.arg);
    const isPublic = PUBLIC_ENDPOINTS.some((ep) => url.includes(ep));

    if (!isPublic) {
      const token = await StorageService.getAccessToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }

    // Check if body is FormData, don't set Content-Type for FormData
    const isFormData =
      rest.arg && typeof rest.arg === "object" && rest.arg.body instanceof FormData;

    if (!isFormData) {
      headers.set("Content-Type", "application/json");
    }

    headers.set("Accept", "application/json");
    return headers;
  },
});

// Track refresh token requests to prevent multiple simultaneous calls
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: any) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

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
    
    // If already refreshing, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: async (token: string) => {
            // Use fresh baseQuery with new token for queued requests
            const retryResult = await fetchBaseQuery({
              baseUrl: API_CONFIG.BASE_URL,
              prepareHeaders: async (headers, { arg }) => {
                headers.set("Authorization", `Bearer ${token}`);

                // Check if body is FormData, don't set Content-Type for FormData
                const isFormData = arg && typeof arg === "object" && arg.body instanceof FormData;

                if (!isFormData) {
                  headers.set("Content-Type", "application/json");
                }

                headers.set("Accept", "application/json");
                return headers;
              },
            })(args, api, extraOptions);

            resolve(retryResult);
          },
          reject: (error: any) => {
            reject(error);
          },
        });
      });
    }

    const refreshToken = await StorageService.getRefreshToken();

    if (refreshToken) {
      isRefreshing = true;

      try {
        // Call refresh endpoint directly without baseQuery to avoid recursion
        const refreshResult = await fetch(`${API_CONFIG.BASE_URL}/${API_ENDPOINTS.AUTH.REFRESH}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken: refreshToken }),
        });


        if (refreshResult.ok) {
          const responseData = await refreshResult.json();

          const newAccessToken = responseData.data?.accessToken || responseData.data?.access_token;
          const newRefreshToken =
            responseData.data?.refreshToken || responseData.data?.refresh_token;

          if (newAccessToken) {
            await StorageService.setTokenData({
              access_token: newAccessToken,
              refresh_token: newRefreshToken || refreshToken,
              expires_in: responseData.data?.expires_in || 3600,
            });

            // Force a fresh baseQuery call with new token
            const retryResult = await fetchBaseQuery({
              baseUrl: API_CONFIG.BASE_URL,
              prepareHeaders: async (headers, { arg }) => {
                headers.set("Authorization", `Bearer ${newAccessToken}`);

                // Check if body is FormData, don't set Content-Type for FormData
                const isFormData = arg && typeof arg === "object" && arg.body instanceof FormData;

                if (!isFormData) {
                  headers.set("Content-Type", "application/json");
                }

                headers.set("Accept", "application/json");
                return headers;
              },
            })(args, api, extraOptions);

            result = retryResult;

            // Process queued requests
            processQueue(null, newAccessToken);
          } else {
            processQueue(new Error("No access token received"), null);
            await StorageService.clearAuthData();
            redirectToLogin();
          }
        } else {
          const errorData = await refreshResult.json().catch(() => ({}));
          processQueue(errorData, null);
          await StorageService.clearAuthData();
          redirectToLogin();
        }
      } catch (error) {
        processQueue(error, null);
        await StorageService.clearAuthData();
        redirectToLogin();
      } finally {
        isRefreshing = false;
      }
    } else {
      await StorageService.clearAuthData();
      redirectToLogin();
    }
  }

  return result;
};
