const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER_DATA: "user_data",
  EXPIRES_AT: "expires_at",
} as const;

export interface TokenData {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface StoredUserData {
  id: string;
  username: string;
  email: string;
  roles: string[];
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

// Browser storage utility functions
class BrowserStorage {
  static setItem(key: string, value: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  }

  static getItem(key: string): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key);
    }
    return null;
  }

  static removeItem(key: string): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  }
}

export class StorageService {
  static async setAccessToken(token: string): Promise<void> {
    try {
      BrowserStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
    } catch (error) {
      console.error("Error saving access token:", error);
      throw error;
    }
  }

  static async getAccessToken(): Promise<string | null> {
    try {
      return BrowserStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    } catch (error) {
      console.error("Error getting access token:", error);
      return null;
    }
  }

  static async setRefreshToken(token: string): Promise<void> {
    try {
      BrowserStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
    } catch (error) {
      console.error("Error saving refresh token:", error);
      throw error;
    }
  }

  static async getRefreshToken(): Promise<string | null> {
    try {
      return BrowserStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    } catch (error) {
      console.error("Error getting refresh token:", error);
      return null;
    }
  }

  static async setTokenData(tokenData: TokenData): Promise<void> {
    try {
      BrowserStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokenData.access_token);
      BrowserStorage.setItem(
        STORAGE_KEYS.REFRESH_TOKEN,
        tokenData.refresh_token
      );
      BrowserStorage.setItem(
        STORAGE_KEYS.EXPIRES_AT,
        (Date.now() + tokenData.expires_in * 1000).toString()
      );
    } catch (error) {
      console.error("Error saving token data:", error);
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

      const expiresAtMs = expires_at
        ? parseInt(expires_at)
        : Date.now() + 3600000; // Default 1 hour
      const expires_in = Math.max(
        0,
        Math.floor((expiresAtMs - Date.now()) / 1000)
      );

      return {
        access_token,
        refresh_token,
        expires_in,
      };
    } catch (error) {
      console.error("Error getting token data:", error);
      return null;
    }
  }

  static async setUserData(userData: StoredUserData): Promise<void> {
    try {
      BrowserStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
    } catch (error) {
      console.error("Error saving user data:", error);
      throw error;
    }
  }

  static async getUserData(): Promise<StoredUserData | null> {
    try {
      const userData = BrowserStorage.getItem(STORAGE_KEYS.USER_DATA);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error getting user data:", error);
      return null;
    }
  }

  static async isTokenExpired(): Promise<boolean> {
    try {
      const expires_at = BrowserStorage.getItem(STORAGE_KEYS.EXPIRES_AT);

      if (!expires_at) return true;

      return Date.now() >= parseInt(expires_at);
    } catch (error) {
      console.error("Error checking token expiration:", error);
      return true;
    }
  }

  static async clearAuthData(): Promise<void> {
    try {
      BrowserStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      BrowserStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      BrowserStorage.removeItem(STORAGE_KEYS.USER_DATA);
      BrowserStorage.removeItem(STORAGE_KEYS.EXPIRES_AT);
    } catch (error) {
      console.error("Error clearing auth data:", error);
    }
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
      console.error("Error checking authentication status:", error);
      return false;
    }
  }
}
