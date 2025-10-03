"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useGetUserQuery,
  useGetVerificationDocsQuery,
  useVerifyAllDocumentsMutation,
} from "@/services/user";
import { useAdminActions } from "@/features/admin/hooks/useAdminActions";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  GraduationCap,
  BookOpen,
  Award,
  Star,
  FileText,
  Eye,
  Download,
  Check,
  X,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ExternalLink,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TutorType } from "@/services/api/type";
import { vi } from "date-fns/locale";

interface AdminTutorDetailPageProps {
  tutorId: string;
}

const AdminTutorDetailPage: React.FC<AdminTutorDetailPageProps> = ({ tutorId }) => {
  const router = useRouter();
  const [selectedTutorType, setSelectedTutorType] = useState<TutorType>("VERIFIED");
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  // Fetch tutor data
  const { data: tutorData, isLoading: isLoadingTutor } = useGetUserQuery({ userId: tutorId });
  const { data: verificationDocsData, isLoading: isLoadingDocs } = useGetVerificationDocsQuery(
    {
      tutorId,
    },
    {
      skip: !tutorId,
    }
  );
  const [verifyAllDocuments] = useVerifyAllDocumentsMutation();

  const { handleApproveTutor, handleRejectTutor } = useAdminActions();

  const tutor = tutorData?.data;
  const verificationDocs = verificationDocsData?.data || [];

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
        return <Calendar className="w-4 h-4" />;
      case "APPROVED":
        return <Check className="w-4 h-4" />;
      case "REJECTED":
        return <X className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const documentTypes = [
    { key: "STUDENT_CARD", label: "Student Card", icon: FileText },
    { key: "TRANSCRIPT", label: "Transcript", icon: Award },
    { key: "CCCD", label: "CCCD/ID Card", icon: BookOpen },
    { key: "SELFIE", label: "Selfie", icon: User },
  ];

  const handleApprove = async () => {
    const result = await handleApproveTutor(tutorId, selectedTutorType);
    if (result.success) {
      setShowApprovalModal(false);
      // Optionally refresh data or show success message
    }
  };

  const handleReject = async () => {
    const result = await handleRejectTutor(tutorId);
    if (result.success) {
      setShowRejectModal(false);
      // Optionally refresh data or show success message
    }
  };

  if (isLoadingTutor) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Loading Tutor Details
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Please wait while we fetch the information...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tutor Not Found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              The requested tutor could not be found.
            </p>
          </div>
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-900 dark:bg-gray-100 rounded-xl flex items-center justify-center text-white dark:text-gray-900 font-bold text-xl">
                  {(tutor.fullName || tutor.email || "U").charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {tutor.fullName || tutor.email}
                  </h1>
                  <div className="flex items-center gap-3 mt-2">
                    <Badge variant={getRoleBadgeVariant(tutor.role)} className="text-sm px-3 py-1">
                      {tutor.role}
                    </Badge>
                    <Badge
                      variant={getStatusBadgeVariant(tutor.status || "PENDING")}
                      className="text-sm px-3 py-1 flex items-center gap-2"
                    >
                      {getStatusIcon(tutor.status || "PENDING")}
                      {tutor.status || "PENDING"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons (Only for Tutors) */}
            {tutor.role === "TUTOR" && (
              <div className="flex items-center gap-3">
                {tutor.status === "PENDING" && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => setShowRejectModal(true)}
                      className="text-gray-600 border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600 dark:text-gray-300 transition-colors"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                    <Button
                      onClick={() => setShowApprovalModal(true)}
                      className="bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                  </>
                )}
                {tutor.status === "APPROVED" && (
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Approved</span>
                  </div>
                )}
                {tutor.status === "REJECTED" && (
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <XCircle className="w-5 h-5" />
                    <span className="font-medium">Rejected</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Personal Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Basic Information */}
            <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              <CardHeader className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
                <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-white">
                  <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-lg font-semibold">Basic Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <p className="font-medium text-gray-900 dark:text-white">{tutor.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {tutor.phone || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <Shield className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">User ID</p>
                      <p className="font-mono text-sm text-gray-900 dark:text-white">
                        {tutor.userId}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tutor Information */}
            {tutor.tutor && (
              <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <CardHeader className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
                  <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-white">
                    <GraduationCap className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-lg font-semibold">Tutor Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center gap-3 mb-2">
                        <BookOpen className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <Label className="text-sm font-semibold text-gray-900 dark:text-white">
                          Education Level
                        </Label>
                      </div>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {tutor.tutor.educationLevel || "N/A"}
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center gap-3 mb-2">
                        <Award className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <Label className="text-sm font-semibold text-gray-900 dark:text-white">
                          Experience
                        </Label>
                      </div>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {tutor.tutor.yearsOfExperience
                          ? `${tutor.tutor.yearsOfExperience} years`
                          : "N/A"}
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center gap-3 mb-3">
                        <Star className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <Label className="text-sm font-semibold text-gray-900 dark:text-white">
                          Subjects
                        </Label>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {tutor.tutor.subjects?.map((subject: string, index: number) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                          >
                            {subject}
                          </Badge>
                        )) || (
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            No subjects
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center gap-3 mb-3">
                        <Globe className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <Label className="text-sm font-semibold text-gray-900 dark:text-white">
                          Languages
                        </Label>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {tutor.tutor.languages?.map((language: string, index: number) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
                          >
                            {language}
                          </Badge>
                        )) || (
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            No languages
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center gap-3 mb-3">
                        <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <Label className="text-sm font-semibold text-gray-900 dark:text-white">
                          Bio
                        </Label>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed break-words overflow-wrap-anywhere">
                        {tutor.tutor.bio || "No bio available"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Verification Documents (Only for Tutors) */}
          {tutor.role === "TUTOR" && (
            <div className="lg:col-span-2">
              <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <CardHeader className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
                  <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-white">
                    <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-lg font-semibold">Verification Documents</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {isLoadingDocs ? (
                    <div className="flex items-center justify-center py-16">
                      <div className="text-center space-y-4">
                        <div className="relative">
                          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600 mx-auto"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <FileText className="w-5 h-5 text-indigo-600" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Loading Documents
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400">
                            Fetching verification documents...
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : verificationDocs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {verificationDocs.map((doc: any, index: number) => {
                        const docType = documentTypes.find((dt) => dt.key === doc.docType);
                        const Icon = docType?.icon || FileText;

                        return (
                          <Card
                            key={doc.docId}
                            className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all duration-300 group overflow-hidden"
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-gray-100 dark:bg-gray-600 rounded-lg">
                                    <Icon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                      {docType?.label || doc.docType}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => window.open(doc.filePath, "_blank")}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
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
                                    className="hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                                  >
                                    <Download className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>

                              {/* Image Preview */}
                              <div className="relative">
                                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center overflow-hidden">
                                  <img
                                    src={doc.filePath}
                                    alt={`${doc.docType} document`}
                                    className="w-full h-auto object-contain rounded-lg"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.style.display = "none";
                                      const parent = target.parentElement;
                                      if (parent) {
                                        parent.innerHTML = `
                                        <div class="w-full h-48 flex items-center justify-center">
                                          <div class="text-center space-y-2 p-4">
                                            <FileText class="w-8 h-8 text-gray-400 mx-auto" />
                                            <p class="text-sm text-gray-500 dark:text-gray-400">Image not available</p>
                                          </div>
                                        </div>
                                      `;
                                      }
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
                    <div className="text-center py-16">
                      <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FileText className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        No Verification Documents
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                        This tutor has not uploaded any verification documents yet. Documents will
                        appear here once they are submitted.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Student Information (Only for Students) */}
          {tutor.role === "STUDENT" && (
            <div className="lg:col-span-2">
              <Card className="bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <CardHeader className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
                  <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-white">
                    <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-lg font-semibold">Student Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Student Profile
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      This student doesn't have verification documents as they are not required for
                      students.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Approval Dialog */}
      <Dialog open={showApprovalModal} onOpenChange={setShowApprovalModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              Approve Tutor
            </DialogTitle>
            <DialogDescription>
              Select the tutor type for approval. This action will approve the tutor application.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="tutorType" className="text-sm font-medium">
                Select Tutor Type
              </Label>
              <Select
                value={selectedTutorType}
                onValueChange={(value: TutorType) => setSelectedTutorType(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose tutor type..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="VERIFIED">Verified Tutor (Gia sư đã xác minh)</SelectItem>
                  <SelectItem value="TRUSTED_BEGINNER">
                    Trusted Beginner Tutor (Gia sư mới đáng tin cậy)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApprovalModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700">
              <Check className="w-4 h-4 mr-2" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectModal} onOpenChange={setShowRejectModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                <X className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              Reject Tutor
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to reject this tutor? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectModal(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              <X className="w-4 h-4 mr-2" />
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTutorDetailPage;
