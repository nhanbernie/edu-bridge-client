import { PUBLIC_ENDPOINTS } from "@/common/constants/endpoint.constant";

/**
 * Kiểm tra xem path có phải là public endpoint không
 * Sử dụng startsWith để match chính xác path đầu chuỗi
 * @param path - API path to check
 * @returns true if path is public
 */
export const isPublicPath = (path: string): boolean => {
  if (!path) return false;
  
  // Normalize path by removing leading slash and query params
  const normalizedPath = path.replace(/^\/+/, '').split('?')[0];
  
  return PUBLIC_ENDPOINTS.some(endpoint => {
    // Remove leading slash from endpoint for comparison
    const normalizedEndpoint = endpoint.replace(/^\/+/, '');
    
    // Use startsWith for exact path matching (not includes)
    return normalizedPath.startsWith(normalizedEndpoint);
  });
};

/**
 * Kiểm tra xem có phải là FormData request không
 * @param body - Request body
 * @returns true if body is FormData
 */
export const isFormDataRequest = (body: any): boolean => {
  return body instanceof FormData;
};

/**
 * Kiểm tra xem có cần set Content-Type header không
 * Chỉ set cho requests có JSON body (POST/PUT/PATCH với JSON)
 * @param method - HTTP method
 * @param body - Request body
 * @returns true if should set Content-Type
 */
export const shouldSetContentType = (method: string = 'GET', body: any): boolean => {
  // Không set Content-Type cho GET, DELETE, HEAD, OPTIONS
  const methodsWithoutBody = ['GET', 'DELETE', 'HEAD', 'OPTIONS'];
  if (methodsWithoutBody.includes(method.toUpperCase())) {
    return false;
  }
  
  // Không set Content-Type cho FormData
  if (isFormDataRequest(body)) {
    return false;
  }
  
  // Set Content-Type cho các method khác có body
  return body !== undefined && body !== null;
};
