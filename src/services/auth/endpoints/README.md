# Authentication Endpoints

## Email Verification Flow (Registration)

### 1. Send OTP for Registration

**Endpoint:** `POST /api/auth/send-otp-register`

Send OTP to email for verification during registration.

**Request:**

```typescript
{
  email: string;
}
```

**Response:**

```typescript
{
  success: boolean;
  data: string; // Success message
  message: string;
  errors: null;
}
```

**Usage:**

```typescript
const [sendOtp] = useSendOtpRegisterMutation();

const handleSendOtp = async () => {
  try {
    const result = await sendOtp({ email: "user@example.com" }).unwrap();
    console.log(result.message); // "OTP đã được gửi đến email của bạn"
  } catch (error) {
    console.error(error);
  }
};
```

---

### 2. Verify OTP for Registration

**Endpoint:** `POST /api/auth/verify-otp-register`

Verify OTP code to complete email verification.

**Request:**

```typescript
{
  email: string;
  otpCode: string;
}
```

**Response:**

```typescript
{
  success: boolean;
  data: boolean; // true if verified successfully
  message: string; // "Xác thực email thành công. Bây giờ bạn có thể đăng nhập."
  errors: null;
}
```

**Usage:**

```typescript
const [verifyOtp] = useVerifyOtpRegisterMutation();

const handleVerifyOtp = async () => {
  try {
    const result = await verifyOtp({
      email: "user@example.com",
      otpCode: "614295",
    }).unwrap();

    if (result.data) {
      console.log(result.message);
      // Redirect to login or show success message
    }
  } catch (error) {
    console.error(error);
  }
};
```

---

## Reset Password Flow

### 1. Forgot Password

**Endpoint:** `POST /api/auth/forgot-password`

### 2. Verify OTP for Reset

**Endpoint:** `POST /api/auth/verify-otp-reset`

### 3. Reset Password

**Endpoint:** `POST /api/auth/reset-password`

### 4. Resend OTP for Reset

**Endpoint:** `POST /api/auth/resend-otp-reset`

---

## Notes

- **Email Verification Flow** is for new user registration
- **Reset Password Flow** is for existing users who forgot their password
- Both flows use separate OTP endpoints to avoid conflicts
- All endpoints are public (no authentication required)
