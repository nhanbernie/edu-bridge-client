"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import EBMediaCard from "@/components/common/EBMediaCard";
import EBEmptyState from "@/components/common/EBEmptyState";
import EBVideoUploadPlaceholder from "@/components/common/EBVideoUploadPlaceholder";
import { EBPageLoading } from "@/components/common";
import EBTutorProfileForm from "./components/EBTutorProfileForm";
import MediaUploadModal from "./components/MediaUploadModal";
import ImageViewModal from "@/features/tutor/profile/components/ImageViewModal";
import { useTutorProfile } from "@/features/tutor/profile/hooks/useTutorProfile";
import { PAGE_HEADER, PAGE_TITLE, PAGE_SUBTITLE } from "@/common/constants/className.constant";

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
    return <EBPageLoading message={t("loading")} />;
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className={PAGE_HEADER}>
        <h1 className={PAGE_TITLE}>{t("title")}</h1>
        <p className={PAGE_SUBTITLE}>{t("subtitle")}</p>
      </div>

      {/* 2 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT COLUMN - Profile Form */}
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

        {/* RIGHT COLUMN - Video & Certificates */}
        <div className="space-y-6">
          {/* Video Intro Section */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t("media.videoIntro.title")}
                </h3>
                {videoIntro && (
                  <button
                    onClick={() => openMediaModal("VideoIntro", videoIntro.mediaId)}
                    className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                  >
                    {t("media.videoIntro.edit")}
                  </button>
                )}
              </div>

              {/* Video Display or Upload Placeholder */}
              {videoIntro ? (
                <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
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
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t("media.certificates.title")}
                </h3>
                <button
                  onClick={() => openMediaModal("Award")}
                  className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  {t("media.certificates.add")}
                </button>
              </div>

              {/* Certificates List - Single Column */}
              <div className="space-y-3">
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
                        className="w-12 h-12 text-gray-400"
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
