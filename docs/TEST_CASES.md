# RTK Query + Auth System - Test Cases

## 8 Test Cases để Verify Các Tính Năng

### 1. **Content-Type Header Logic**
```javascript
// Test: Chỉ set Content-Type cho JSON requests
const testCases = [
  { method: 'GET', body: undefined, expected: false },
  { method: 'DELETE', body: undefined, expected: false },
  { method: 'POST', body: { data: 'test' }, expected: true },
  { method: 'PUT', body: new FormData(), expected: false },
  { method: 'PATCH', body: JSON.stringify({test: 1}), expected: true }
];

// Verify: Check network tab trong DevTools
// Expected: Chỉ POST/PUT/PATCH với JSON body mới có Content-Type: application/json
```

### 2. **Public Endpoint Detection**
```javascript
// Test: Public paths không cần Authorization header
const publicPaths = [
  '/api/auth/login',
  '/api/auth/register', 
  '/api/auth/refresh-token',
  '/api/auth/forgot-password'
];

const privatePaths = [
  '/api/user/profile',
  '/api/course',
  '/api/availability-block'
];

// Verify: Check network requests
// Expected: Public paths không có Authorization header, private paths có
```

### 3. **Token Cache Performance**
```javascript
// Test: RAM cache vs Storage performance
console.time('RAM Cache');
const token1 = await StorageService.getAccessToken(); // Should be fast (RAM)
console.timeEnd('RAM Cache');

console.time('Storage Fallback');
// Check cache info
console.log('Cache before:', StorageService.getCacheInfo());

// Simulate cache expiry by calling again after TTL
const token2 = await StorageService.getAccessToken(); // Should use cache or fallback
console.timeEnd('Storage Fallback');

console.log('Cache after:', StorageService.getCacheInfo());
// Expected: RAM cache < 1ms, Storage fallback có thể chậm hơn
```

### 4. **Mutex Concurrency Control**
```javascript
// Test: Multiple simultaneous 401 requests chỉ trigger 1 refresh
const simultaneousRequests = Array.from({ length: 5 }, (_, i) => 
  fetch('/api/user/profile', {
    headers: { 'Authorization': 'Bearer invalid_token' }
  })
);

Promise.all(simultaneousRequests);

// Verify: Check network tab
// Expected: Chỉ 1 refresh-token request, các requests khác chờ và retry
```

### 5. **Refresh Token Rotation**
```javascript
// Test: BE trả refresh token mới → rotate và lưu
// Mock response với newRefreshToken
const mockRefreshResponse = {
  data: {
    accessToken: 'new_access_token',
    refreshToken: 'new_refresh_token', // Khác với cũ
    expires_in: 3600
  }
};

// Verify: Check localStorage/IndexedDB
// Expected: Cả access và refresh token đều được update
```

### 6. **Error Handling & Redirect**
```javascript
// Test: Refresh fail → clear auth + redirect /login
// Mock refresh endpoint trả 401/403
const mockFailedRefresh = () => {
  // Intercept refresh request và trả error
  return Promise.reject(new Error('Refresh token expired'));
};

// Verify: 
// 1. localStorage.clear() được gọi
// 2. window.location.href = '/login'
// 3. Redux auth state được clear
```

### 7. **URL Normalization**
```javascript
// Test: joinUrl function xử lý double slashes
const testUrls = [
  { base: 'https://api.com/', path: '/users', expected: 'https://api.com/users' },
  { base: 'https://api.com', path: 'users', expected: 'https://api.com/users' },
  { base: 'https://api.com//', path: '//users//', expected: 'https://api.com/users' }
];

testUrls.forEach(test => {
  const result = joinUrl(test.base, test.path);
  console.assert(result === test.expected, `Failed: ${result} !== ${test.expected}`);
});

// Expected: Tất cả URLs được normalize chính xác
```

### 8. **Storage Fallback Strategy**
```javascript
// Test: localStorage fail → fallback IndexedDB
// Simulate localStorage quota exceeded
Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: () => { throw new Error('QuotaExceededError'); },
    getItem: () => null,
    removeItem: () => {}
  }
});

await refreshStorage.setTokenData({
  access_token: 'test_token',
  refresh_token: 'test_refresh',
  expires_in: 3600,
  token_type: 'Bearer'
});

const retrievedToken = await refreshStorage.getAccessToken();

// Verify: Check IndexedDB trong DevTools
// Expected: Data được lưu trong IndexedDB khi localStorage fail
```

## Cách Chạy Test Cases

### Manual Testing:
1. **Mở DevTools → Network tab**
2. **Login vào app**
3. **Thực hiện các actions khác nhau**
4. **Observe network requests và headers**
5. **Kiểm tra localStorage/IndexedDB trong Application tab**

### Console Testing:
```javascript
// Paste vào browser console để test
import { StorageService } from './src/services/storage/secureStorage.service';
import { joinUrl } from './src/utils/joinUrl';
import { isPublicPath } from './src/utils/isPublicPath';

// Test cache performance
console.log('Cache info:', StorageService.getCacheInfo());

// Run individual test cases
```

### Integration Testing:
1. **Login → Verify tokens stored**
2. **Make API calls → Verify headers**
3. **Wait for token expiry → Verify auto-refresh**
4. **Logout → Verify cleanup**
5. **Invalid refresh token → Verify redirect**

## Expected Results Summary:

✅ **Content-Type**: Chỉ set cho POST/PUT/PATCH với JSON body  
✅ **Public Paths**: Exact match, không có Authorization header  
✅ **Performance**: RAM cache < 1ms, Storage fallback có thể chậm hơn  
✅ **Concurrency**: Mutex đảm bảo chỉ 1 refresh tại một thời điểm  
✅ **Token Rotation**: Refresh token mới được lưu khi BE cung cấp  
✅ **Error Handling**: Clear auth + redirect khi refresh fail  
✅ **URL Normalization**: Không có double slashes  
✅ **Storage Fallback**: IndexedDB backup khi localStorage fail
