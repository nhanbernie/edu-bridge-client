"use client";

import React from "react";
import { useTranslations } from "next-intl";
import EBButton from "@/components/common/EBButton";
import { useDocumentUpload, DocumentUpload } from "../hooks/useDocumentUpload";
import { toast } from "sonner";
import EBFormProvider from "@/components/form/EBFormProvider";
import EBSelectField from "@/components/form/EBSelectField";
import { useWatch, useFormContext } from "react-hook-form";
import * as Yup from "yup";

interface TutorStep2Props {
  onSubmit: (uploadResults: any[]) => void;
  onBack: () => void;
  isLoading?: boolean;
}

// Validation schema will be created with translations in the component
const createTutorVerificationSchema = (t: any) => {
  return Yup.object().shape({
    verificationType: Yup.string().required(t("validation.verificationType")),
    cccd: Yup.mixed().when("verificationType", {
      is: (val: string) => val === "verified" || val === "trusted",
      then: (schema) => schema.required(t("validation.cccd")),
      otherwise: (schema) => schema.nullable(),
    }),
    selfie: Yup.mixed().when("verificationType", {
      is: (val: string) => val === "verified" || val === "trusted",
      then: (schema) => schema.required(t("validation.selfie")),
      otherwise: (schema) => schema.nullable(),
    }),
    degree: Yup.mixed().when("verificationType", {
      is: "verified",
      then: (schema) => schema.required(t("validation.degree")),
      otherwise: (schema) => schema.nullable(),
    }),
    certificate: Yup.mixed().nullable(),
    studentCard: Yup.mixed().when("verificationType", {
      is: "trusted",
      then: (schema) => schema.required(t("validation.studentCard")),
      otherwise: (schema) => schema.nullable(),
    }),
    transcript: Yup.mixed().when("verificationType", {
      is: "trusted",
      then: (schema) => schema.required(t("validation.transcript")),
      otherwise: (schema) => schema.nullable(),
    }),
    certificate_trusted: Yup.mixed().nullable(),
  });
};

// File Upload Input Component with improved UI
const FileUploadInput = ({
  name,
  label,
  description,
  required = false,
}: {
  name: string;
  label: string;
  description: string;
  required?: boolean;
}) => {
  const t = useTranslations("tutor.onboard.step2");
  const { setValue, watch } = useFormContext();
  const file = watch(name);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error(t("messages.fileSizeError"));
        e.target.value = "";
        return;
      }
      setValue(name, selectedFile, { shouldValidate: true });
    }
  };

  const handleRemoveFile = () => {
    setValue(name, null, { shouldValidate: true });
  };

  return (
    <div className="space-y-3">
      {/* Label */}
      <label className="block text-sm font-semibold text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-4 transition-all duration-200 ${
          file
            ? "border-primary/50 bg-primary/10"
            : "border-border bg-muted/50 hover:border-primary/60 hover:bg-primary/5"
        }`}
      >
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        {!file ? (
          <div className="text-center py-2">
            <svg
              className="mx-auto h-10 w-10 text-muted-foreground"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-2 text-sm text-muted-foreground">
              <span className="font-semibold text-primary">{t("upload.clickToSelect")}</span>{" "}
              {t("upload.orDragDrop")}
            </p>
            <p className="text-xs text-muted-foreground/70 mt-1">{t("upload.supportedFormats")}</p>
          </div>
        ) : (
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className="flex-shrink-0">
                <svg
                  className="h-8 w-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="ml-3 flex-shrink-0 text-destructive hover:text-destructive/80 transition-colors z-20"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-xs text-muted-foreground italic">{description}</p>
    </div>
  );
};

const VerificationForm = ({
  verificationOptions,
  onBack,
  isUploading,
}: {
  verificationOptions: { value: string; label: string }[];
  onBack: () => void;
  isUploading: boolean;
}) => {
  const t = useTranslations("tutor.onboard.step2");
  const verificationType = useWatch({ name: "verificationType" });

  return (
    <div className="space-y-6">
      {/* Verification Type Selection */}
      <div className="border border-border rounded-xl p-6 bg-card shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <svg
            className="h-5 w-5 text-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
          <h3 className="text-base font-semibold text-foreground">
            {t("sections.verificationType")}
          </h3>
        </div>

        <EBSelectField
          name="verificationType"
          label={t("fields.verificationType.label")}
          options={verificationOptions}
          placeholder={t("fields.verificationType.placeholder")}
        />

        <div className="mt-4 p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <svg
              className="h-5 w-5 text-primary mt-0.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-semibold text-primary mb-2">{t("info.title")}:</p>
              <ul className="space-y-2 text-sm text-primary/80">
                <li className="flex items-start">
                  <span className="font-semibold mr-2">•</span>
                  <span>{t("info.verified")}</span>
                </li>
                <li className="flex items-start">
                  <span className="font-semibold mr-2">•</span>
                  <span>{t("info.trusted")}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Tutor Documents */}
      {verificationType === "verified" && (
        <div className="border border-border rounded-xl p-6 bg-card shadow-sm space-y-6">
          <div className="flex items-center space-x-2">
            <svg
              className="h-6 w-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-foreground">
              {t("sections.verifiedDocuments")}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FileUploadInput
              name="cccd"
              label={t("documents.cccd.label")}
              description={t("documents.cccd.description")}
              required
            />
            <FileUploadInput
              name="selfie"
              label={t("documents.selfie.label")}
              description={t("documents.selfie.description")}
              required
            />
            <FileUploadInput
              name="degree"
              label={t("documents.degree.label")}
              description={t("documents.degree.description")}
              required
            />
            <FileUploadInput
              name="certificate"
              label={t("documents.certificate.label")}
              description={t("documents.certificate.description")}
            />
          </div>
        </div>
      )}

      {/* Trusted Beginner Tutor Documents */}
      {verificationType === "trusted" && (
        <div className="border border-border rounded-xl p-6 bg-card shadow-sm space-y-6">
          <div className="flex items-center space-x-2">
            <svg
              className="h-6 w-6 text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <h3 className="text-lg font-semibold text-foreground">
              {t("sections.trustedDocuments")}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FileUploadInput
              name="cccd"
              label={t("documents.cccd.label")}
              description={t("documents.cccd.description")}
              required
            />
            <FileUploadInput
              name="selfie"
              label={t("documents.selfie.label")}
              description={t("documents.selfie.description")}
              required
            />
            <FileUploadInput
              name="studentCard"
              label={t("documents.studentCard.label")}
              description={t("documents.studentCard.description")}
              required
            />
            <FileUploadInput
              name="transcript"
              label={t("documents.transcript.label")}
              description={t("documents.transcript.description")}
              required
            />
            <FileUploadInput
              name="certificate_trusted"
              label={t("documents.certificate.label")}
              description={t("documents.certificate.description")}
            />
          </div>
        </div>
      )}

      {/* Important Notes */}
      {verificationType && (
        <div className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 rounded-xl p-5 shadow-sm">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-accent" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-accent mb-2">{t("notes.title")}</h3>
              <ul className="space-y-2 text-sm text-accent/80">
                <li className="flex items-start">
                  <span className="text-accent mr-2 font-bold">✓</span>
                  <span>{t("notes.verification")}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2 font-bold">✓</span>
                  <span>{t("notes.formats")}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2 font-bold">✓</span>
                  <span>{t("notes.fileSize")}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2 font-bold">✓</span>
                  <span>{t("notes.privacy")}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-6 border-t gap-5">
        <EBButton
          type="button"
          variant="outline"
          size="lg"
          onClick={onBack}
          className="flex-1 font-semibold py-4 border-1 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {t("buttons.back")}
        </EBButton>
        <EBButton
          type="submit"
          variant="default"
          size="lg"
          loading={isUploading}
          disabled={!verificationType || isUploading}
          className="flex-1 font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isUploading ? t("buttons.uploading") : t("buttons.submit")}
        </EBButton>
      </div>
    </div>
  );
};

const TutorStep2: React.FC<TutorStep2Props> = ({ onSubmit, onBack, isLoading = false }) => {
  const t = useTranslations("tutor.onboard.step2");
  const { uploadDocuments, isLoading: isUploading } = useDocumentUpload();

  const verificationOptions = [
    { value: "verified", label: t("options.verified") },
    { value: "trusted", label: t("options.trusted") },
  ];

  const defaultValues = {
    verificationType: "",
    cccd: null,
    selfie: null,
    degree: null,
    certificate: null,
    studentCard: null,
    transcript: null,
    certificate_trusted: null,
  };

  const handleFormSubmit = async (data: any) => {
    const documents: DocumentUpload[] = [];
    // CCCD, Selfie, Degree, Certificate (optional): Verified
    // CCCD, Selfie, Student card, Transcript, Certificate (optional): Trusted Beginner Tutor
    // Map form data to document uploads based on verification type
    if (data.verificationType === "verified") {
      // Verified Tutor documents
      if (data.cccd) documents.push({ docType: "CCCD", file: data.cccd });
      if (data.selfie) documents.push({ docType: "SELFIE", file: data.selfie });
      if (data.degree) documents.push({ docType: "DEGREE", file: data.degree });
      if (data.certificate) documents.push({ docType: "CERTIFICATE", file: data.certificate });
    } else if (data.verificationType === "trusted") {
      // Trusted Beginner Tutor documents
      if (data.cccd) documents.push({ docType: "CCCD", file: data.cccd });
      if (data.selfie) documents.push({ docType: "SELFIE", file: data.selfie });
      if (data.studentCard) documents.push({ docType: "STUDENT_CARD", file: data.studentCard });
      if (data.transcript) documents.push({ docType: "TRANSCRIPT", file: data.transcript });
      if (data.certificate_trusted)
        documents.push({ docType: "CERTIFICATE", file: data.certificate_trusted });
    }

    // Validate that at least one document is uploaded
    if (documents.length === 0) {
      toast.error(t("messages.noDocuments"));
      return;
    }

    // Upload documents and handle result
    const uploadResult = await uploadDocuments(documents);
    if (uploadResult.success) {
      onSubmit(uploadResult.results || []);
    }
  };

  return (
    <div className="space-y-6">
      {/* EBHeader */}
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold text-foreground mb-3">{t("title")}</h2>
        <p className="text-muted-foreground text-lg">{t("subtitle")}</p>
      </div>
      <EBFormProvider
        validationSchema={createTutorVerificationSchema(t)}
        defaultValues={defaultValues}
        onSubmit={handleFormSubmit}
        formType="tutorVerification"
      >
        <VerificationForm
          verificationOptions={verificationOptions}
          onBack={onBack}
          isUploading={isUploading}
        />
      </EBFormProvider>
    </div>
  );
};

export default TutorStep2;
