"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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

  // Navigate to user detail page
  const handleViewTutorDetail = useCallback(
    (user: UserDto) => {
      if (user.role === "TUTOR" || user.role === "STUDENT") {
        router.push(`/admin/user/${user.userId}`);
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
        toast.success("Tutor approved successfully!", {
          description: `Tutor has been approved as ${tutorType === "VERIFIED" ? "Verified Tutor" : "Trusted Beginner Tutor"}`,
        });
        return { success: true };
      } catch (error) {
        toast.error("Failed to approve tutor", {
          description: "Please try again or contact support if the issue persists.",
        });
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
        toast.success("Tutor rejected successfully!", {
          description: "The tutor application has been rejected.",
        });
        return { success: true };
      } catch (error) {
        toast.error("Failed to reject tutor", {
          description: "Please try again or contact support if the issue persists.",
        });
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
        toast.success("User deleted successfully!", {
          description: "The user has been permanently removed from the system.",
        });
        return { success: true };
      } catch (error) {
        toast.error("Failed to delete user", {
          description: "Please try again or contact support if the issue persists.",
        });
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
