"use client";

import { useCallback } from "react";
import { useLocaleRouter } from "./useLocaleRouter";
import {
  useGetUserQuery,
  useGetVerificationDocsQuery,
  useVerifyAllDocumentsMutation,
  useDeleteUserMutation,
} from "@/services/user";
import { UserDto, TutorType } from "@/services/api/type";
import { buildAdminTutorDetailRoute } from "@/common/constants/route.constant";

export const useAdminActions = () => {
  const { push } = useLocaleRouter();
  const [verifyAllDocuments] = useVerifyAllDocumentsMutation();
  const [deleteUser] = useDeleteUserMutation();

  // Navigate to tutor detail page
  const handleViewTutorDetail = useCallback(
    (user: UserDto) => {
      if (user.role === "TUTOR") {
        push(buildAdminTutorDetailRoute(user.userId));
      }
    },
    [push]
  );

  // View verification documents (modal)
  const handleViewVerificationDocs = useCallback(
    (user: UserDto, onOpenModal: (user: UserDto) => void) => {
      if (user.role === "TUTOR") {
        onOpenModal(user);
      }
    },
    []
  );

  // Approve tutor
  const handleApproveTutor = useCallback(
    async (tutorId: string, tutorType: TutorType) => {
      try {
        await verifyAllDocuments({
          tutorId,
          isApproved: true,
          tutorType,
        }).unwrap();
        return { success: true };
      } catch (error) {
        return { success: false, error };
      }
    },
    [verifyAllDocuments]
  );

  // Reject tutor
  const handleRejectTutor = useCallback(
    async (tutorId: string) => {
      try {
        await verifyAllDocuments({
          tutorId,
          isApproved: false,
          tutorType: "TRUSTED_BEGINNER",
        }).unwrap();
        return { success: true };
      } catch (error) {
        return { success: false, error };
      }
    },
    [verifyAllDocuments]
  );

  // Delete user
  const handleDeleteUser = useCallback(
    async (userId: string) => {
      try {
        await deleteUser({ userId }).unwrap();
        return { success: true };
      } catch (error) {
        return { success: false, error };
      }
    },
    [deleteUser]
  );

  return {
    handleViewTutorDetail,
    handleViewVerificationDocs,
    handleApproveTutor,
    handleRejectTutor,
    handleDeleteUser,
  };
};
