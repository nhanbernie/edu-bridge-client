export interface IInputFieldProps {
  name: string;
  label?: string;
  type?: "text" | "password" | "email" | "number" | "otp";
  placeholder?: string;
  className?: string;
  length?: number; // For OTP input
}

// export const INPUT_FIELDS = (
//   type: 'register' | 'login' | 'forgotPassword' | 'verifyOTP' | 'resetPassword'
// ): IInputFieldProps[] => {
//   const commonFields = getCommonFields();

//   const fields: Record<
//     'register' | 'login' | 'forgotPassword' | 'verifyOTP' | 'resetPassword',
//     IInputFieldProps[]
//   > = {
//     register: [
//       {
//         label: i18n.t('auth.fields.username.label'),
//         name: 'username',
//         type: 'text',
//         placeholder: i18n.t('auth.fields.username.placeholder'),
//       },
//       ...commonFields,
//       {
//         label: i18n.t('auth.fields.confirmPassword.label'),
//         name: 'confirmPassword',
//         type: 'password',
//         placeholder: i18n.t('auth.fields.confirmPassword.placeholder'),
//       },
//     ],
//     login: [...commonFields],
//     forgotPassword: [
//       {
//         label: i18n.t('auth.fields.email.label'),
//         name: 'email',
//         type: 'email',
//         placeholder: i18n.t('auth.fields.email.placeholder'),
//       },
//     ],
//     verifyOTP: [
//       {
//         label: i18n.t('auth.fields.verificationCode.label'),
//         name: 'code',
//         type: 'number',
//         placeholder: i18n.t('auth.fields.verificationCode.placeholder'),
//       },
//     ],
//     resetPassword: [
//       {
//         label: i18n.t('auth.fields.newPassword.label'),
//         name: 'password',
//         type: 'password',
//         placeholder: i18n.t('auth.fields.newPassword.placeholder'),
//       },
//       {
//         label: i18n.t('auth.fields.confirmPassword.label'),
//         name: 'confirmPassword',
//         type: 'password',
//         placeholder: i18n.t('auth.fields.confirmPassword.placeholder'),
//       },
//     ],
//   };

//   return fields[type];
// };

// This will be replaced by a function that uses i18n
export const getInputFields = (t: any) => ({
  login: [
    {
      name: "email",
      type: "email" as const,
      placeholder: t("login.email"),
      label: t("login.email"),
    },
    {
      name: "password",
      type: "password" as const,
      placeholder: t("login.password"),
      label: t("login.password"),
    },
  ],
  register: [
    {
      name: "fullName",
      type: "text" as const,
      placeholder: t("register.fullName"),
      label: t("register.fullName"),
    },
    {
      name: "email",
      type: "email" as const,
      placeholder: t("register.email"),
      label: t("register.email"),
    },
    {
      name: "password",
      type: "password" as const,
      placeholder: t("register.password"),
      label: t("register.password"),
    },
    {
      name: "confirmPassword",
      type: "password" as const,
      placeholder: t("register.confirmPassword"),
      label: t("register.confirmPassword"),
    },
  ],
  forgotPassword: [
    {
      name: "email",
      type: "email" as const,
      placeholder: t("forgotPassword.email"),
      label: t("forgotPassword.email"),
    },
  ],
  verifyOTP: [
    {
      name: "code",
      type: "otp" as const,
      placeholder: t("verifyOTP.code"),
      length: 6,
    },
  ],
  resetPassword: [
    {
      name: "password",
      type: "password" as const,
      placeholder: t("resetPassword.password"),
      label: t("resetPassword.password"),
    },
    {
      name: "confirmPassword",
      type: "password" as const,
      placeholder: t("resetPassword.confirmPassword"),
      label: t("resetPassword.confirmPassword"),
    },
  ],
});

// Keep the old constant for backward compatibility
export const INPUT_FIELDS = {
  login: [
    { name: "email", type: "email" as const, placeholder: "Nhập email của bạn", label: "Email" },
    {
      name: "password",
      type: "password" as const,
      placeholder: "Nhập mật khẩu",
      label: "Mật khẩu",
    },
  ],
  register: [
    { name: "fullName", type: "text" as const, placeholder: "Họ và tên", label: "Họ và tên" },
    { name: "email", type: "email" as const, placeholder: "Email", label: "Email" },
    { name: "password", type: "password" as const, placeholder: "Mật khẩu", label: "Mật khẩu" },
    {
      name: "confirmPassword",
      type: "password" as const,
      placeholder: "Xác nhận mật khẩu",
      label: "Xác nhận mật khẩu",
    },
  ],
  forgotPassword: [{ name: "email", type: "email" as const, placeholder: "Email", label: "Email" }],
  verifyOTP: [
    {
      name: "code",
      type: "otp" as const,
      placeholder: "Nhập mã xác thực",
      length: 6,
    },
  ],
  resetPassword: [
    {
      name: "password",
      type: "password" as const,
      placeholder: "Mật khẩu mới",
      label: "Mật khẩu mới",
    },
    {
      name: "confirmPassword",
      type: "password" as const,
      placeholder: "Xác nhận mật khẩu",
      label: "Xác nhận mật khẩu",
    },
  ],
};

// Function to get button titles with i18n
export const getButtonTitles = (t: any) => ({
  login: t("login.loginButton"),
  register: t("register.registerButton"),
  forgotPassword: t("forgotPassword.sendButton"),
  verifyOTP: t("verifyOTP.verifyButton"),
  resetPassword: t("resetPassword.resetButton"),
});

// Keep the old constant for backward compatibility
export const BUTTON_TITLES = {
  login: "Tiếp tục",
  register: "Đăng ký",
  forgotPassword: "Gửi liên kết đặt lại",
  verifyOTP: "Xác thực",
  resetPassword: "Đặt lại mật khẩu",
};

// Function to get processing text with i18n
export const getProcessingTextI18n = (type: string, t: any): string => {
  const processingTexts: Record<string, string> = {
    login: t("messages.loginSuccess"),
    register: t("messages.registerSuccess"),
    forgotPassword: t("messages.forgotPasswordSuccess"),
    verifyOTP: t("messages.otpVerified"),
    resetPassword: t("messages.passwordReset"),
  };

  return processingTexts[type] || t("messages.loginSuccess");
};

// Keep the old function for backward compatibility
export const getProcessingText = (type: string): string => {
  const processingTexts: Record<string, string> = {
    login: "Đang đăng nhập...",
    register: "Đang đăng ký...",
    forgotPassword: "Đang gửi liên kết...",
    verifyOTP: "Đang xác thực...",
    resetPassword: "Đang đặt lại mật khẩu...",
  };

  return processingTexts[type] || "Đang xử lý...";
};
