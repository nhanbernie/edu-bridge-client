"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  useGetUserQuery,
  useGetVerificationDocsQuery,
  useVerifyAllDocumentsMutation,
  useDeleteUserMutation,
} from "@/services/user";
import { UserDto, TutorType } from "@/services/api/type";

export const useAdminActions = () => {
  const router = useRouter();
  const [verifyAllDocuments] = useVerifyAllDocumentsMutation();
  const [deleteUser] = useDeleteUserMutation();

  // Navigate to tutor detail page
  const handleViewTutorDetail = useCallback(
    (user: UserDto) => {
      if (user.role === "TUTOR") {
        router.push(`/admin/tutor/${user.userId}`);
      }
    },
    [router]
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
        console.log("Tutor approved successfully!");
        return { success: true };
      } catch (error) {
        console.error("Error approving tutor:", error);
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
        console.log("Tutor rejected successfully!");
        return { success: true };
      } catch (error) {
        console.error("Error rejecting tutor:", error);
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
        console.log("User deleted successfully!");
        return { success: true };
      } catch (error) {
        console.error("Error deleting user:", error);
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
