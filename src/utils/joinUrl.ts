/**
 * Chuẩn hóa và join URL paths, tránh double slashes
 * @param baseUrl - Base URL
 * @param path - Path to join
 * @returns Normalized URL
 */
export const joinUrl = (baseUrl: string, path: string): string => {
  // Remove trailing slash from baseUrl
  const normalizedBase = baseUrl.replace(/\/+$/, '');
  
  // Remove leading slash from path and normalize multiple slashes
  const normalizedPath = path.replace(/^\/+/, '').replace(/\/+/g, '/');
  
  // Join with single slash
  return normalizedPath ? `${normalizedBase}/${normalizedPath}` : normalizedBase;
};

/**
 * Normalize URL by removing double slashes and trailing slashes
 * @param url - URL to normalize
 * @returns Normalized URL
 */
export const normalizeUrl = (url: string): string => {
  return url
    .replace(/([^:]\/)\/+/g, '$1') // Remove double slashes except after protocol
    .replace(/\/+$/, ''); // Remove trailing slashes
};
