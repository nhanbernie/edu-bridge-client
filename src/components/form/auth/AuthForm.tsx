"use client";

import React, { useState } from "react";
import EBFormProvider from "../EBFormProvider";
import { EBTextField } from "../EBTextField";
import { EBOTPInput } from "../EBOTPInput";
import { cn } from "@/lib/utils";
import { useLocaleRouter } from "@/hooks/useLocaleRouter";
import { useFormContext } from "react-hook-form";
import validatorSchema from "@/lib/validator/authValidator";
import {
  INPUT_FIELDS,
  BUTTON_TITLES,
  getInputFields,
  getButtonTitles,
} from "@/common/constants/form.constant";
import { ROUTES } from "@/common/constants/route.constant";
import { useTranslations } from "next-intl";

export interface IAuthFormProps {
  type: "login" | "register" | "forgotPassword" | "verifyOTP" | "resetPassword";
  onSubmit?: (data: any, email?: string, formMethods?: any) => void | Promise<void>;
  email?: string;
  token?: string;
}

const AuthForm = ({ type, onSubmit: customOnSubmit, email, token }: IAuthFormProps) => {
  const { push } = useLocaleRouter();
  const t = useTranslations("auth");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const defaultOnSubmit = (data: any) => {};

  // Enhanced handleSubmit with validation
  const handleSubmit = async (data: any, formMethods?: any) => {
    setIsSubmitting(true);
    try {
      // Validate data using appropriate schema
      const schema = validatorSchema[type];
      await schema.validate(data, { abortEarly: false });

      // For verifyOTP, combine the email from props with the code from form
      if (type === "verifyOTP" && email) {
        await (customOnSubmit?.({ email, otp: data.code }) || defaultOnSubmit(data));
      } else if (type === "resetPassword" && email) {
        // For resetPassword, pass email along with form data
        await (customOnSubmit?.(data, email) || defaultOnSubmit(data));
      } else {
        // For other form types, pass data as is
        await (customOnSubmit?.(data) || defaultOnSubmit(data));
      }
    } catch (error: any) {
      if (error.name === "ValidationError" && formMethods?.setError) {
        // Set validation errors to respective fields
        error.inner?.forEach((err: any) => {
          if (err.path) {
            formMethods.setError(err.path, {
              type: "manual",
              message: err.message,
            });
          }
        });
      } else {
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const AuthFormContent = () => {
    const { formState } = useFormContext();
    const { isValid } = formState;

    // Get i18n fields and button titles
    const inputFields = getInputFields(t);
    const buttonTitles = getButtonTitles(t);

    return (
      <div className="w-full">
        <div className="space-y-5">
          {inputFields[type].map((field) => {
            if (field.type === "otp") {
              return (
                <EBOTPInput
                  key={field.name}
                  name={field.name}
                  length={field.length || 6}
                  autoFocus={true}
                />
              );
            }
            return <EBTextField key={field.name} {...field} />;
          })}
        </div>

        {/* Display email when in verifyOTP mode */}
        {type === "verifyOTP" && email && (
          <div className="mt-2">
            <p className="text-gray-500 text-center text-sm">
              {t("verifyOTP.subtitle")} {email}
            </p>
          </div>
        )}

        <div className="flex">
          {/* add checkbox for remember me */}
          {type === "login" && (
            <div className="flex items-center justify-between w-full">
              <button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className="flex items-center"
              >
                <div
                  className={cn(
                    "w-5 h-5 border border-gray-300 rounded mr-2 flex items-center justify-center",
                    rememberMe && "bg-primary border-primary"
                  )}
                >
                  {rememberMe && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className="text-gray-700 text-sm">{t("login.rememberMe")}</span>
              </button>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => push(ROUTES.FORGOT_PASSWORD)}
                  className="text-primary hover:text-primary/80 text-sm"
                >
                  {t("login.forgotPassword")}
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className={cn(
              "w-full py-4 px-6 rounded-xl font-semibold text-base transition-all duration-200",
              isValid && !isSubmitting
                ? "bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            )}
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Đang xử lý..." : buttonTitles[type]}
          </button>
        </div>

        {/* EBFooter text for login */}
        {type === "login" && (
          <div className="mt-4 text-center">
            <span className="text-gray-600 text-sm">
              {t("login.noAccount")}{" "}
              <button
                type="button"
                onClick={() => push(ROUTES.REGISTER)}
                className="text-primary hover:text-primary/80 font-medium ml-1"
              >
                {t("login.registerLink")}
              </button>
            </span>
          </div>
        )}

        {/* EBFooter text for register */}
        {type === "register" && (
          <div className="mt-4 text-center">
            <span className="text-gray-600 text-sm">
              {t("register.hasAccount")}{" "}
              <button
                type="button"
                onClick={() => push(ROUTES.LOGIN)}
                className="text-primary hover:text-primary/80 font-medium ml-1"
              >
                {t("register.loginLink")}
              </button>
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <EBFormProvider
      onSubmit={handleSubmit}
      validationSchema={validatorSchema[type]}
      formType={type}
    >
      <AuthFormContent />
    </EBFormProvider>
  );
};

export default AuthForm;
