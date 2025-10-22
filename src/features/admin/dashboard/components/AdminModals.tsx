"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Download,
  Eye,
  AlertTriangle,
  UserCheck,
  GraduationCap,
  BookOpen,
  Award,
  Star,
  ExternalLink,
  Trash2,
  Ban,
  Check,
  X,
} from "lucide-react";
import { UserDto, TutorType } from "@/services/api/type";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

// ===== USER DETAILS MODAL =====
interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserDto | null;
  userDetails?: any;
}

export const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  isOpen,
  onClose,
  user,
  userDetails,
}) => {
  if (!user) return null;

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "destructive";
      case "TUTOR":
        return "default";
      case "STUDENT":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "PENDING":
        return "outline";
      case "APPROVED":
        return "default";
      case "REJECTED":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Clock className="w-4 h-4" />;
      case "APPROVED":
        return <CheckCircle className="w-4 h-4" />;
      case "REJECTED":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-2xl">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="" />
                  <AvatarFallback>
                    <User className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{user.fullName}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={getRoleBadgeVariant(user.role)} className="text-xs">
                      {user.role}
                    </Badge>
                    <Badge
                      variant={getStatusBadgeVariant(user.status || "PENDING")}
                      className="text-xs flex items-center gap-1"
                    >
                      {getStatusIcon(user.status || "PENDING")}
                      {user.status || "PENDING"}
                    </Badge>
                  </div>
                </div>
              </DialogTitle>
            </DialogHeader>

            <ScrollArea className="max-h-[70vh] pr-4">
              <div className="space-y-6">
                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-600">Full Name</Label>
                        <p className="text-sm">{user.fullName || "N/A"}</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-600">Email</Label>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <p className="text-sm">{user.email}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-600">Phone</Label>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <p className="text-sm">{user.phone || "N/A"}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-600">User ID</Label>
                        <p className="text-sm font-mono">{user.userId}</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-600">Role</Label>
                        <Badge variant={getRoleBadgeVariant(user.role)} className="text-xs">
                          {user.role}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-600">Status</Label>
                        <Badge
                          variant={getStatusBadgeVariant(user.status || "PENDING")}
                          className="text-xs flex items-center gap-1"
                        >
                          {getStatusIcon(user.status || "PENDING")}
                          {user.status || "PENDING"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Account Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Account Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-600">User ID</Label>
                        <p className="text-sm font-mono">{user.userId}</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-600">Email Status</Label>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <p className="text-sm">Active</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-600">Account Type</Label>
                        <p className="text-sm">{user.role}</p>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-600">Current Status</Label>
                        <Badge
                          variant={getStatusBadgeVariant(user.status || "PENDING")}
                          className="text-xs"
                        >
                          {user.status || "PENDING"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tutor Specific Information */}
                {user.role === "TUTOR" && user.tutor && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="w-5 h-5" />
                        Tutor Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-600">
                            Education Level
                          </Label>
                          <p className="text-sm">{user.tutor.educationLevel || "N/A"}</p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-600">Experience</Label>
                          <p className="text-sm">
                            {user.tutor.yearsOfExperience
                              ? `${user.tutor.yearsOfExperience} years`
                              : "N/A"}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-600">Subjects</Label>
                          <div className="flex flex-wrap gap-1">
                            {user.tutor.subjects?.map((subject: string, index: number) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {subject}
                              </Badge>
                            )) || <span className="text-sm text-gray-500">No subjects</span>}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-600">Languages</Label>
                          <div className="flex flex-wrap gap-1">
                            {user.tutor.languages?.map((language: string, index: number) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {language}
                              </Badge>
                            )) || <span className="text-sm text-gray-500">No languages</span>}
                          </div>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label className="text-sm font-medium text-gray-600">Bio</Label>
                          <p className="text-sm">{user.tutor.bio || "No bio available"}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Student Specific Information */}
                {user.role === "STUDENT" && user.student && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        Student Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-600">Grade</Label>
                          <p className="text-sm">{user.student.grade || "N/A"}</p>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label className="text-sm font-medium text-gray-600">Learning Goal</Label>
                          <p className="text-sm">
                            {user.student.learningGoal || "No learning goal set"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </ScrollArea>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

// ===== VERIFICATION DOCUMENTS MODAL =====
interface VerificationDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserDto | null;
  verificationDocs?: any;
  onApprove: (tutorId: string, tutorType: TutorType) => void;
  onReject: (tutorId: string) => void;
}

export const VerificationDocsModal: React.FC<VerificationDocsModalProps> = ({
  isOpen,
  onClose,
  user,
  verificationDocs,
  onApprove,
  onReject,
}) => {
  const [selectedTutorType, setSelectedTutorType] = useState<TutorType>("VERIFIED");

  if (!user) return null;

  const handleApprove = () => {
    onApprove(user.userId, selectedTutorType);
  };

  const handleReject = () => {
    onReject(user.userId);
  };

  const documentTypes = [
    { key: "STUDENT_CARD", label: "Student Card", icon: FileText },
    { key: "TRANSCRIPT", label: "Transcript", icon: Award },
    { key: "CCCD", label: "CCCD/ID Card", icon: BookOpen },
    { key: "SELFIE", label: "Selfie", icon: User },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-2xl">
                <FileText className="w-8 h-8 text-blue-600" />
                <div>
                  <h2 className="text-xl font-semibold">Verification Documents</h2>
                  <p className="text-sm text-gray-600">{user.fullName}</p>
                </div>
              </DialogTitle>
            </DialogHeader>

            <ScrollArea className="max-h-[60vh] pr-4">
              <div className="space-y-6">
                {/* Tutor Type Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5" />
                      Tutor Type Selection
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label htmlFor="tutorType">Select Tutor Type</Label>
                      <Select
                        value={selectedTutorType}
                        onValueChange={(value: TutorType) => setSelectedTutorType(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose tutor type..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="VERIFIED">
                            Verified Tutor (Gia sư đã xác minh)
                          </SelectItem>
                          <SelectItem value="TRUSTED_BEGINNER">
                            Trusted Beginner Tutor (Gia sư mới đáng tin cậy)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Documents Grid */}
                <div className="space-y-4">
                  {verificationDocs?.data && verificationDocs.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {verificationDocs.data.map((doc: any, index: number) => {
                        const docType = documentTypes.find((dt) => dt.key === doc.docType);
                        const Icon = docType?.icon || FileText;

                        return (
                          <Card key={doc.docId} className="hover:shadow-md transition-shadow">
                            <CardHeader>
                              <CardTitle className="flex items-center gap-2 text-lg">
                                <Icon className="w-5 h-5" />
                                {docType?.label || doc.docType}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                                  <div className="flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-gray-400" />
                                    <div>
                                      <p className="text-sm font-medium">{doc.docType}</p>
                                      <p className="text-xs text-gray-500">
                                        Status:{" "}
                                        <span
                                          className={`font-medium ${
                                            doc.status === "PENDING"
                                              ? "text-orange-600"
                                              : doc.status === "APPROVED"
                                                ? "text-green-600"
                                                : "text-red-600"
                                          }`}
                                        >
                                          {doc.status}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => window.open(doc.filePath, "_blank")}
                                    >
                                      <Eye className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => {
                                        const link = document.createElement("a");
                                        link.href = doc.filePath;
                                        link.download = `${doc.docType}_${index + 1}`;
                                        link.click();
                                      }}
                                    >
                                      <Download className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>

                                {/* Image Preview */}
                                <div className="mt-3">
                                  <img
                                    src={doc.filePath}
                                    alt={doc.docType}
                                    className="w-full h-48 object-cover rounded-lg border"
                                    onError={(e) => {
                                      e.currentTarget.style.display = "none";
                                    }}
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium">No verification documents</p>
                      <p className="text-sm">
                        This tutor has not uploaded any verification documents yet.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>

            <div className="flex justify-between pt-4 border-t">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  onClick={handleReject}
                  className="flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Reject
                </Button>
                <Button
                  onClick={handleApprove}
                  disabled={false}
                  className="flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Approve
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

// ===== APPROVAL MODAL =====
interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserDto | null;
  onApprove: (tutorId: string) => void;
}

export const ApprovalModal: React.FC<ApprovalModalProps> = ({
  isOpen,
  onClose,
  user,
  onApprove,
}) => {
  if (!user) return null;

  const handleApprove = () => {
    onApprove(user.userId);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <UserCheck className="w-6 h-6 text-green-600" />
                Approve Tutor
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  You are about to approve <strong>{user.fullName}</strong> as a tutor.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="note">Note (Optional)</Label>
                <Textarea
                  id="note"
                  placeholder="Add a note about this approval..."
                  className="resize-none"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleApprove} disabled={false} className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                Approve
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

// ===== DELETE CONFIRMATION DIALOG =====
interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserDto | null;
  onConfirm: (userId: string) => void;
}

export const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  isOpen,
  onClose,
  user,
  onConfirm,
}) => {
  const [confirmText, setConfirmText] = useState("");

  if (!user) return null;

  const handleConfirm = () => {
    if (confirmText === "DELETE") {
      onConfirm(user.userId);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-red-600">
                <AlertTriangle className="w-6 h-6" />
                Delete User
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">
                  You are about to delete <strong>{user.fullName}</strong>. This action cannot be
                  undone!
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmText">
                  Type <strong>DELETE</strong> to confirm
                </Label>
                <Input
                  id="confirmText"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="Type DELETE to confirm"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleConfirm}
                disabled={confirmText !== "DELETE"}
                className="flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

// ===== REJECT CONFIRMATION DIALOG =====
interface RejectConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserDto | null;
  onConfirm: (userId: string) => void;
}

export const RejectConfirmDialog: React.FC<RejectConfirmDialogProps> = ({
  isOpen,
  onClose,
  user,
  onConfirm,
}) => {
  const [rejectReason, setRejectReason] = useState("");

  if (!user) return null;

  const handleConfirm = () => {
    if (rejectReason.trim()) {
      onConfirm(user.userId);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-orange-600">
                <Ban className="w-6 h-6" />
                Reject Tutor
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm text-orange-800">
                  You are about to reject <strong>{user.fullName}</strong> as a tutor.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rejectReason">Rejection Reason *</Label>
                <Textarea
                  id="rejectReason"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Please provide a reason for rejection..."
                  className="resize-none"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleConfirm}
                disabled={!rejectReason.trim()}
                className="flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Reject
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
