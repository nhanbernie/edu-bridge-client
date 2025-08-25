"use client";

import { ReactNode } from "react";
import {
  FormProvider as RHFFormProvider,
  useForm,
  SubmitHandler,
  UseFormProps,
  FieldValues,
} from "react-hook-form";

interface IFormProviderProps<T extends FieldValues = FieldValues> {
  children: ReactNode;
  onSubmit?: SubmitHandler<T>;
  defaultValues?: UseFormProps<T>["defaultValues"];
  mode?: UseFormProps<T>["mode"];
}

const FormProvider = <T extends FieldValues = FieldValues>({
  children,
  onSubmit,
  defaultValues,
  mode = "onChange",
}: IFormProviderProps<T>) => {
  const methods = useForm<T>({
    mode,
    defaultValues,
  });

  const handleSubmit = onSubmit ? methods.handleSubmit(onSubmit) : undefined;

  return (
    <RHFFormProvider {...methods}>
      {handleSubmit ? (
        <form onSubmit={handleSubmit} noValidate>
          {children}
        </form>
      ) : (
        children
      )}
    </RHFFormProvider>
  );
};

export default FormProvider;
