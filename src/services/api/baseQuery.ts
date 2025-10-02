import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from 'async-mutex';
import { API_CONFIG, API_ENDPOINTS } from "@/common/constants/endpoint.constant";
import { StorageService } from "@/services/storage/secureStorage.service";
import { joinUrl } from "@/utils/joinUrl";
import { isPublicPath, shouldSetContentType } from "@/utils/isPublicPath";

// Mutex để đảm bảo chỉ có 1 refresh token request tại một thời điểm
const refreshMutex = new Mutex();

/**
 * Extract URL from RTK Query args
 */
const getUrlFromArgs = (arg: any): string => {
  if (typeof arg === "string") return arg;
  if (typeof arg === "object" && arg?.url) return arg.url;
  return "";
};

/**
 * Extract HTTP method from RTK Query args
 */
const getMethodFromArgs = (arg: any): string => {
  if (typeof arg === "object" && arg?.method) return arg.method;
  return "GET";
};

/**
 * Extract body from RTK Query args
 */
const getBodyFromArgs = (arg: any): any => {
  if (typeof arg === "object" && arg?.body !== undefined) return arg.body;
  return undefined;
};

/**
 * Redirect to login page
 */
const redirectToLogin = (): void => {
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};

/**
 * Create base query với optimized headers
 */
const createBaseQuery = (accessToken?: string) => {
  return fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    prepareHeaders: async (headers, { endpoint, ...rest }) => {
      const url = getUrlFromArgs(rest.arg);
      const method = getMethodFromArgs(rest.arg);
      const body = getBodyFromArgs(rest.arg);
      
      // Chỉ set Authorization cho non-public endpoints
      if (!isPublicPath(url)) {
        const token = accessToken || await StorageService.getAccessToken();
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }

      // Chỉ set Content-Type khi cần thiết (không phải GET/DELETE và không phải FormData)
      if (shouldSetContentType(method, body)) {
        headers.set("Content-Type", "application/json");
      }

      // Always set Accept header
      headers.set("Accept", "application/json");
      
      return headers;
    },
  });
};

/**
 * Refresh access token using refresh token
 */
const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = await StorageService.getRefreshToken();
  
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const refreshUrl = joinUrl(API_CONFIG.BASE_URL || '', API_ENDPOINTS.AUTH.REFRESH);
  
  const response = await fetch(refreshUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
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

  // Update tokens in StorageService
  await StorageService.setTokenData({
    access_token: newAccessToken,
    refresh_token: newRefreshToken || refreshToken, // Keep old refresh token if new one not provided
    expires_in: expiresIn
  });

  return newAccessToken;
};

/**
 * Check if error should trigger refresh
 */
const shouldRefreshToken = (error: FetchBaseQueryError): boolean => {
  if (typeof error.status === 'number') {
    // 401: Unauthorized, 403: Forbidden, 419: Authentication Timeout, 440: Login Timeout
    return [401, 403, 419, 440].includes(error.status);
  }
  return false;
};

/**
 * Base query with automatic token refresh
 */
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const url = getUrlFromArgs(args);
  
  // Skip auth logic for public endpoints
  if (isPublicPath(url)) {
    const baseQuery = createBaseQuery();
    return await baseQuery(args, api, extraOptions);
  }

  // First attempt with current token
  const baseQuery = createBaseQuery();
  let result = await baseQuery(args, api, extraOptions);

  // If request failed with auth error, try to refresh token
  if (result.error && shouldRefreshToken(result.error)) {
    
    // Use mutex to ensure only one refresh happens at a time
    const release = await refreshMutex.acquire();
    
    try {
      // Check if token was already refreshed by another request
      const currentToken = await StorageService.getAccessToken();
      
      // Try with current token first (might have been refreshed by another request)
      const retryQuery = createBaseQuery(currentToken || undefined);
      const retryResult = await retryQuery(args, api, extraOptions);
      
      // If still failing, do the actual refresh
      if (retryResult.error && shouldRefreshToken(retryResult.error)) {
        try {
          const newAccessToken = await refreshAccessToken();
          
          if (newAccessToken) {
            // Retry with new token
            const finalQuery = createBaseQuery(newAccessToken);
            result = await finalQuery(args, api, extraOptions);
          } else {
            throw new Error("Failed to get new access token");
          }
          
        } catch (refreshError) {
          console.error("Token refresh failed:", refreshError);
          
          // Clear auth data and redirect to login
          await StorageService.clearAuthData();
          redirectToLogin();
          
          // Return the original error
          return result;
        }
      } else {
        // Token was refreshed by another request, use retry result
        result = retryResult;
      }
      
    } finally {
      release();
    }
  }

  return result;
};

// Export base query for direct use if needed
export const baseQuery = createBaseQuery();