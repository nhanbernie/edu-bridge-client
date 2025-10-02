"use client";

import React from "react";
import { motion } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Check, FileText, User } from "lucide-react";
import { UserDto } from "@/services/api/type";
import { ADMIN_ANIMATION_VARIANTS } from "@/common/constants/animation.constant";
import EBConfirmDialog from "@/components/common/EBConfirmDialog";

// User Details Modal
interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserDto | null;
  userDetails: any;
}

export const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  isOpen,
  onClose,
  user,
  userDetails,
}) => {
  if (!user || !userDetails) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
              <User className="w-5 h-5" />
            </div>
            <DialogTitle>User Details</DialogTitle>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[60vh] space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Full Name
                </label>
                <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                  {userDetails.data?.fullName || "N/A"}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Email
                </label>
                <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                  {userDetails.data?.email}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  User ID
                </label>
                <p className="text-sm font-mono text-gray-600 dark:text-gray-300 mt-1 break-all">
                  {userDetails.data?.userId}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Role
                </label>
                <div className="mt-2">
                  <Badge
                    variant={
                      userDetails.data?.role === "ADMIN"
                        ? "destructive"
                        : userDetails.data?.role === "TUTOR"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {userDetails.data?.role}
                  </Badge>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Status
                </label>
                <div className="mt-2">
                  <Badge
                    variant={
                      userDetails.data?.status === "PENDING"
                        ? "outline"
                        : userDetails.data?.status === "APPROVED"
                          ? "default"
                          : "destructive"
                    }
                  >
                    {userDetails.data?.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {userDetails.data?.tutor && (
            <div className="mt-6">
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Tutor Information
              </label>
              <div className="mt-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
                  {JSON.stringify(userDetails.data.tutor, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Verification Documents Modal
interface VerificationDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserDto | null;
  verificationDocs: any;
  onApprove: (userId: string) => void;
  onReject: (userId: string) => void;
}

export const VerificationDocsModal: React.FC<VerificationDocsModalProps> = ({
  isOpen,
  onClose,
  user,
  verificationDocs,
  onApprove,
  onReject,
}) => {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white">
              <FileText className="w-5 h-5" />
            </div>
            <DialogTitle>Verification Documents</DialogTitle>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[60vh] space-y-6">
          {verificationDocs ? (
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                  Document Data
                </h4>
                <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto bg-white dark:bg-gray-800 p-4 rounded border">
                  {JSON.stringify(verificationDocs, null, 2)}
                </pre>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                <Button
                  onClick={() => {
                    onClose();
                    onApprove(user.userId);
                  }}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                >
                  <Check className="w-5 h-5 mr-2" />
                  Approve All Documents
                </Button>
                <Button
                  onClick={() => onReject(user.userId)}
                  variant="destructive"
                  className="flex-1"
                >
                  <X className="w-5 h-5 mr-2" />
                  Reject All Documents
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-500 dark:text-gray-400">Loading verification documents...</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Approval Modal - Tutor Type Selection
interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserDto | null;
  tutorType: string;
  onTutorTypeChange: (type: string) => void;
  onApprove: (userId: string, tutorType: string) => void;
}

export const ApprovalModal: React.FC<ApprovalModalProps> = ({
  isOpen,
  onClose,
  user,
  tutorType,
  onTutorTypeChange,
  onApprove,
}) => {
  if (!user) return null;

  const handleClose = () => {
    onClose();
    onTutorTypeChange("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white">
              <Check className="w-5 h-5" />
            </div>
            <DialogTitle>Approve Tutor</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Select Tutor Type
            </label>
            <select
              value={tutorType}
              onChange={(e) => onTutorTypeChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
              required
            >
              <option value="">Choose tutor verification level...</option>
              <option value="VERIFIED">VERIFIED - Gia sư đã xác minh đầy đủ</option>
              <option value="TRUSTED_BEGINNER">TRUSTED_BEGINNER - Gia sư mới đáng tin cậy</option>
            </select>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">i</span>
                </div>
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300">
                <p className="font-medium mb-1">Tutor Type Information:</p>
                <ul className="space-y-1 text-xs">
                  <li>
                    • <strong>VERIFIED:</strong> Fully verified tutors with complete documentation
                  </li>
                  <li>
                    • <strong>TRUSTED_BEGINNER:</strong> New but trustworthy tutors starting their
                    journey
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button onClick={handleClose} variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={() => onApprove(user.userId, tutorType)}
              disabled={!tutorType}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 text-white"
            >
              <Check className="w-4 h-4 mr-2" />
              Approve Tutor
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Delete Confirmation Dialog
interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserDto | null;
  onConfirm: (userId: string) => void;
  loading?: boolean;
}

export const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  isOpen,
  onClose,
  user,
  onConfirm,
  loading = false,
}) => {
  if (!user) return null;

  return (
    <EBConfirmDialog
      open={isOpen}
      onOpenChange={onClose}
      title="Delete User"
      description={`Are you sure you want to delete ${user.fullName || user.email}? This action cannot be undone.`}
      confirmLabel="Delete"
      cancelLabel="Cancel"
      variant="destructive"
      loading={loading}
      onConfirm={() => onConfirm(user.userId)}
    />
  );
};

// Reject Confirmation Dialog
interface RejectConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserDto | null;
  onConfirm: (userId: string) => void;
  loading?: boolean;
}

export const RejectConfirmDialog: React.FC<RejectConfirmDialogProps> = ({
  isOpen,
  onClose,
  user,
  onConfirm,
  loading = false,
}) => {
  if (!user) return null;

  return (
    <EBConfirmDialog
      open={isOpen}
      onOpenChange={onClose}
      title="Reject Tutor"
      description={`Are you sure you want to reject ${user.fullName || user.email}? This will change their status to rejected.`}
      confirmLabel="Reject"
      cancelLabel="Cancel"
      variant="destructive"
      loading={loading}
      onConfirm={() => onConfirm(user.userId)}
    />
  );
};
