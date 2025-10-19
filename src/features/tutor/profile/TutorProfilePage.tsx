"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { CheckCircle, Plus, Edit3 } from "lucide-react";
import EBMediaCard from "@/components/common/EBMediaCard";
import EBEmptyState from "@/components/common/EBEmptyState";
import EBVideoUploadPlaceholder from "@/components/common/EBVideoUploadPlaceholder";
import { EBPageLoading } from "@/components/common";
import EBTutorProfileForm from "./components/EBTutorProfileForm";
import MediaUploadModal from "./components/MediaUploadModal";
import ImageViewModal from "@/features/tutor/profile/components/ImageViewModal";
import { useTutorProfile } from "@/features/tutor/profile/hooks/useTutorProfile";
import { Card, CardContent } from "@/components/ui/card";
import { EBButtonAction } from "@/components/motion";
import { TutorProfileSkeleton } from "./skeleton";

interface TutorProfileFormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  educationLevel: string;
  yearsOfExperience: number;
  bio: string;
  subjects: string[];
  languages: string[];
}

const TutorProfilePage = () => {
  const t = useTranslations("tutor.profile");

  const {
    userData,
    videoIntro,
    certificates,
    allMedia,
    isLoading,
    isUploadingAvatar,
    isUploadingMedia,
    isUpdatingMedia,
    isSaving,
    isEditing,
    setIsEditing,
    setIsSaving,
    isMediaModalOpen,
    selectedMediaType,
    selectedMediaId,
    isImageViewOpen,
    selectedImage,
    handleAvatarUpload,
    handleUpdateProfile,
    openMediaModal,
    closeMediaModal,
    handleMediaUpload,
    handleViewImage,
    closeImageView,
  } = useTutorProfile();

  const handleSubmit = async (data: TutorProfileFormData) => {
    await handleUpdateProfile(data);
  };

  const handleAvatarChange = async (file: File) => {
    await handleAvatarUpload(file);
  };

  if (isLoading) {
    return <TutorProfileSkeleton />;
  }

  return (
    <div className="min-h-screen space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="mb-6 lg:mb-8">
        <div className="flex items-center gap-3 mb-3 lg:mb-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            {t("title")}
          </h1>
          <div className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/20 rounded-full">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-xs font-medium text-green-600 dark:text-green-400">
              {t("form.verification.verified")}
            </span>
          </div>
        </div>
        <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
          {t("subtitle")}
        </p>
      </div>

      {/* 2 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* LEFT COLUMN - Profile Form - Show first on mobile */}
        <div className="order-1">
          <EBTutorProfileForm
            userData={userData}
            isEditing={isEditing}
            isSaving={isSaving}
            isUploadingAvatar={isUploadingAvatar}
            onSubmit={handleSubmit}
            onEdit={() => setIsEditing(true)}
            onCancel={() => setIsEditing(false)}
            onAvatarChange={handleAvatarChange}
          />
        </div>

        {/* RIGHT COLUMN - Video & Certificates - Show second on mobile */}
        <div className="space-y-6 order-2">
          {/* Video Intro Section */}
          <Card className="rounded-3xl border-0 shadow-lg bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-foreground">
                  {t("media.videoIntro.title")}
                </h3>
                {videoIntro && (
                  <EBButtonAction
                    onClick={() => openMediaModal("VideoIntro", videoIntro.mediaId)}
                    className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-2"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span>{t("media.videoIntro.edit")}</span>
                  </EBButtonAction>
                )}
              </div>

              {/* Video Display or Upload Placeholder */}
              {videoIntro ? (
                <div className="w-full aspect-video bg-muted rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
                  <video
                    src={videoIntro.filePath}
                    controls
                    className="w-full h-full object-cover"
                    style={{ objectFit: "cover" }}
                  >
                    {t("media.videoIntro.noSupport")}
                  </video>
                </div>
              ) : (
                <EBVideoUploadPlaceholder onClick={() => openMediaModal("VideoIntro")} />
              )}
            </CardContent>
          </Card>

          {/* Certificates Section */}
          <Card className="rounded-3xl border-0 shadow-lg bg-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-foreground">
                  {t("media.certificates.title")}
                </h3>
                <EBButtonAction
                  onClick={() => openMediaModal("Award")}
                  className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>{t("media.certificates.add")}</span>
                </EBButtonAction>
              </div>

              {/* Certificates List - Single Column */}
              <div className="space-y-3 sm:space-y-4">
                {certificates.length > 0 ? (
                  certificates.map((cert) => (
                    <EBMediaCard
                      key={cert.mediaId}
                      title={cert.title}
                      imageUrl={cert.filePath}
                      onView={() => handleViewImage(cert.filePath, cert.title)}
                      onEdit={() => openMediaModal("Award", cert.mediaId)}
                      showEdit={true}
                    />
                  ))
                ) : (
                  <EBEmptyState
                    icon={
                      <svg
                        className="w-12 h-12 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    }
                    title={t("media.certificates.empty.title")}
                    description={t("media.certificates.empty.description")}
                    actionLabel={t("media.certificates.empty.action")}
                    onAction={() => openMediaModal("Award")}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        {/* End RIGHT COLUMN */}
      </div>
      {/* End 2 Column Grid */}

      {/* Media Upload Modal */}
      <MediaUploadModal
        isOpen={isMediaModalOpen}
        onClose={closeMediaModal}
        mediaType={selectedMediaType}
        mediaId={selectedMediaId}
        existingTitle={
          selectedMediaId ? allMedia.find((m) => m.mediaId === selectedMediaId)?.title : undefined
        }
        onUpload={handleMediaUpload}
        isUploading={isUploadingMedia || isUpdatingMedia}
      />

      {/* Image View Modal */}
      {selectedImage && (
        <ImageViewModal
          isOpen={isImageViewOpen}
          onClose={closeImageView}
          imageUrl={selectedImage.url}
          title={selectedImage.title}
        />
      )}
    </div>
  );
};

export default TutorProfilePage;
