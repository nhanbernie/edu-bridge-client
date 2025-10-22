import { UserDto } from "../api/type";

const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER_DATA: "user_data",
  EXPIRES_AT: "expires_at",
} as const;

// RAM Cache để tối ưu performance
interface TokenCache {
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  lastUpdated: number;
}

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache TTL
let tokenCache: TokenCache = {
  accessToken: null,
  refreshToken: null,
  expiresAt: null,
  lastUpdated: 0,
};

export interface TokenData {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

// export interface UserDto {
//   id: string;
//   username: string;
//   email: string;
//   roles: string[];
//   firstName?: string;
//   lastName?: string;
//   fullName?: string;
//   avatar?: string;
// }

// Browser storag
class BrowserStorage {
  static setItem(key: string, value: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);

      // Set cookie
      const secure = window.location.protocol === "https:";
      document.cookie = `${key}=${value}; path=/; ${secure ? "secure;" : ""} SameSite=Strict; max-age=${60 * 60 * 24 * 7}`; // 7 days
    }
  }

  static getItem(key: string): string | null {
    if (typeof window !== "undefined") {
      // Try localStorage first
      const localValue = localStorage.getItem(key);
      if (localValue) return localValue;

      // Fallback to cookies
      const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${key}=`))
        ?.split("=")[1];

      return cookieValue || null;
    }
    return null;
  }

  static removeItem(key: string): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
      // Remove cookie
      document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
  }
}

// Helper functions for cache management
const isCacheValid = (): boolean => {
  const now = Date.now();
  return now - tokenCache.lastUpdated < CACHE_TTL;
};

const updateCache = (
  accessToken: string | null,
  refreshToken: string | null,
  expiresAt: number | null
): void => {
  tokenCache = {
    accessToken,
    refreshToken,
    expiresAt,
    lastUpdated: Date.now(),
  };
};

export class StorageService {
  static async setAccessToken(token: string): Promise<void> {
    try {
      BrowserStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
      // Update cache
      tokenCache.accessToken = token;
      tokenCache.lastUpdated = Date.now();
    } catch (error) {
      throw error;
    }
  }

  static async getAccessToken(): Promise<string | null> {
    try {
      // Check cache first
      if (isCacheValid() && tokenCache.accessToken) {
        return tokenCache.accessToken;
      }

      // Fallback to storage
      const token = BrowserStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

      // Update cache
      if (token) {
        tokenCache.accessToken = token;
        tokenCache.lastUpdated = Date.now();
      }

      return token;
    } catch (error) {
      return null;
    }
  }

  static async setRefreshToken(token: string): Promise<void> {
    try {
      BrowserStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
      // Update cache
      tokenCache.refreshToken = token;
      tokenCache.lastUpdated = Date.now();
    } catch (error) {
      throw error;
    }
  }

  static async getRefreshToken(): Promise<string | null> {
    try {
      // Check cache first
      if (isCacheValid() && tokenCache.refreshToken) {
        return tokenCache.refreshToken;
      }

      // Fallback to storage
      const token = BrowserStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

      // Update cache
      if (token) {
        tokenCache.refreshToken = token;
        tokenCache.lastUpdated = Date.now();
      }

      return token;
    } catch (error) {
      return null;
    }
  }

  static async setTokenData(tokenData: TokenData): Promise<void> {
    try {
      const expiresAt = Date.now() + tokenData.expires_in * 1000;

      BrowserStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokenData.access_token);
      BrowserStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokenData.refresh_token);
      BrowserStorage.setItem(STORAGE_KEYS.EXPIRES_AT, expiresAt.toString());

      // Update cache
      updateCache(tokenData.access_token, tokenData.refresh_token, expiresAt);
    } catch (error) {
      throw error;
    }
  }

  static async getTokenData(): Promise<TokenData | null> {
    try {
      const access_token = BrowserStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      const refresh_token = BrowserStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      const expires_at = BrowserStorage.getItem(STORAGE_KEYS.EXPIRES_AT);

      if (!access_token || !refresh_token) {
        return null;
      }

      const expiresAtMs = expires_at ? parseInt(expires_at) : Date.now() + 3600000; // Default 1 hour
      const expires_in = Math.max(0, Math.floor((expiresAtMs - Date.now()) / 1000));

      return {
        access_token,
        refresh_token,
        expires_in,
      };
    } catch (error) {
      return null;
    }
  }

  static async setUserData(userData: UserDto): Promise<void> {
    try {
      BrowserStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
    } catch (error) {
      throw error;
    }
  }

  static async getUserData(): Promise<UserDto | null> {
    try {
      const userData = BrowserStorage.getItem(STORAGE_KEYS.USER_DATA);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  }

  static async isTokenExpired(): Promise<boolean> {
    try {
      const expires_at = BrowserStorage.getItem(STORAGE_KEYS.EXPIRES_AT);

      if (!expires_at) return true;

      return Date.now() >= parseInt(expires_at);
    } catch (error) {
      return true;
    }
  }

  static async clearAuthData(): Promise<void> {
    try {
      BrowserStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      BrowserStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      BrowserStorage.removeItem(STORAGE_KEYS.USER_DATA);
      BrowserStorage.removeItem(STORAGE_KEYS.EXPIRES_AT);

      // Clear cache
      updateCache(null, null, null);
    } catch (error) {}
  }

  // Debug method để kiểm tra cache
  static getCacheInfo() {
    return {
      hasAccessToken: !!tokenCache.accessToken,
      hasRefreshToken: !!tokenCache.refreshToken,
      isCacheValid: isCacheValid(),
      lastUpdated: new Date(tokenCache.lastUpdated).toISOString(),
      expiresAt: tokenCache.expiresAt ? new Date(tokenCache.expiresAt).toISOString() : null,
    };
  }

  static async isAuthenticated(): Promise<boolean> {
    try {
      const tokenData = await this.getTokenData();
      const userData = await this.getUserData();
      const isExpired = await this.isTokenExpired();

      if (!tokenData || !userData) {
        return false;
      }

      // If token is not expired, user is authenticated
      if (!isExpired) {
        return true;
      }

      // If token is expired, clear auth data and return false
      // The refresh logic is handled in baseQuery.ts
      await this.clearAuthData();
      return false;
    } catch (error) {
      return false;
    }
  }
}
