"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  useGetAllUsersQuery,
  useGetUserQuery,
  useGetVerificationDocsQuery,
  useVerifyAllDocumentsMutation,
  useDeleteUserMutation,
} from "@/services/user";
import { UserDto } from "@/services/api/type";
import {
  Eye,
  Check,
  X,
  Trash2,
  FileText,
  Users,
  GraduationCap,
  TrendingUp,
  Shield,
  Clock,
  UserCheck,
} from "lucide-react";
import { EBMotionCard, MotionContainer, MotionItem } from "@/components/motion";
import { motion } from "motion/react";
import { ADMIN_ANIMATION_VARIANTS } from "@/common/constants/animation.constant";
import AdminDataTable from "./components/AdminDataTable";
import { createAdminTableColumns } from "./components/AdminTableColumns";
import {
  UserDetailsModal,
  VerificationDocsModal,
  ApprovalModal,
  DeleteConfirmDialog,
  RejectConfirmDialog,
} from "./components/AdminModals";

const AdminDashboardPage = () => {
  const [selectedUser, setSelectedUser] = useState<UserDto | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [tutorType, setTutorType] = useState<string>("");

  // Fetch all users data
  const { data: allUsersData, isLoading: isLoadingAllUsers } = useGetAllUsersQuery({});
  const { data: pendingTutorsData } = useGetAllUsersQuery({ role: 2, status: 0 }); // TUTOR = 2, PENDING = 0
  const { data: studentsData } = useGetAllUsersQuery({ role: 1 }); // STUDENT = 1
  const { data: approvedTutorsData } = useGetAllUsersQuery({ role: 2, status: 1 }); // TUTOR = 2, APPROVED = 1

  // Get user details when selected
  const { data: userDetailsData } = useGetUserQuery(
    { userId: selectedUser?.userId || "" },
    { skip: !selectedUser?.userId }
  );

  // Get verification docs when viewing tutor
  const { data: verificationDocsData } = useGetVerificationDocsQuery(
    { tutorId: selectedUser?.userId || "" },
    { skip: !selectedUser?.userId || selectedUser?.role !== "TUTOR" }
  );

  // Mutations
  const [verifyAllDocuments] = useVerifyAllDocumentsMutation();
  const [deleteUser] = useDeleteUserMutation();

  // Calculate statistics
  const totalStudents = studentsData?.data?.length || 0;
  const totalTutors =
    (approvedTutorsData?.data?.length || 0) + (pendingTutorsData?.data?.length || 0);
  const pendingTutors = pendingTutorsData?.data?.length || 0;

  const handleViewUser = useCallback((user: UserDto) => {
    setSelectedUser(user);
    setShowUserModal(true);
  }, []);

  const handleViewVerificationDocs = useCallback((user: UserDto) => {
    setSelectedUser(user);
    setShowVerificationModal(true);
  }, []);

  const handleApproveTutor = useCallback(
    async (tutorId: string, tutorTypeValue?: string) => {
      if (!tutorTypeValue) {
        setSelectedUser({ userId: tutorId } as UserDto);
        setShowApprovalModal(true);
        return;
      }

      try {
        await verifyAllDocuments({
          tutorId,
          isApproved: true,
          tutorType: tutorTypeValue,
        }).unwrap();
        alert("Tutor approved successfully!");
        setShowApprovalModal(false);
        setTutorType("");
      } catch (error) {
        console.error("Error approving tutor:", error);
        alert("Error approving tutor");
      }
    },
    [verifyAllDocuments]
  );

  const handleDeleteUser = useCallback(
    (userId: string) => {
      const user = allUsersData?.data?.find((u) => u.userId === userId);
      if (user) {
        setSelectedUser(user);
        setShowDeleteDialog(true);
      }
    },
    [allUsersData?.data]
  );

  const handleDeleteConfirm = async (userId: string) => {
    try {
      await deleteUser({ userId }).unwrap();
      alert("User deleted successfully!");
      setShowDeleteDialog(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user");
    }
  };

  const handleRejectTutor = useCallback(
    (userId: string) => {
      const user = allUsersData?.data?.find((u) => u.userId === userId);
      if (user) {
        setSelectedUser(user);
        setShowRejectDialog(true);
      }
    },
    [allUsersData?.data]
  );

  const handleRejectConfirm = async (userId: string) => {
    try {
      await verifyAllDocuments({
        tutorId: userId,
        isApproved: false,
        rejectType: "OTHER",
      }).unwrap();
      alert("Tutor rejected successfully!");
      setShowRejectDialog(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error rejecting tutor:", error);
      alert("Error rejecting tutor");
    }
  };

  // Memoize table columns to prevent recreation
  const tableColumns = useMemo(
    () =>
      createAdminTableColumns({
        onViewUser: handleViewUser,
        onViewVerificationDocs: handleViewVerificationDocs,
        onApproveTutor: handleApproveTutor,
        onRejectTutor: handleRejectTutor,
        onDeleteUser: handleDeleteUser,
      }),
    [
      handleViewUser,
      handleViewVerificationDocs,
      handleApproveTutor,
      handleRejectTutor,
      handleDeleteUser,
    ]
  );

  // Statistics data for cleaner code
  const statsData = [
    {
      title: "Total Students",
      value: totalStudents,
      icon: Users,
      color: "emerald",
      bgGradient: "from-emerald-500/10 to-emerald-600/10",
      iconBg: "bg-emerald-500",
      textColor: "text-emerald-600",
    },
    {
      title: "Total Tutors",
      value: totalTutors,
      icon: GraduationCap,
      color: "blue",
      bgGradient: "from-blue-500/10 to-blue-600/10",
      iconBg: "bg-blue-500",
      textColor: "text-blue-600",
    },
    {
      title: "Pending Approval",
      value: pendingTutors,
      icon: Clock,
      color: "orange",
      bgGradient: "from-orange-500/10 to-orange-600/10",
      iconBg: "bg-orange-500",
      textColor: "text-orange-600",
    },
    {
      title: "Total Users",
      value: allUsersData?.data?.length || 0,
      icon: UserCheck,
      color: "purple",
      bgGradient: "from-purple-500/10 to-purple-600/10",
      iconBg: "bg-purple-500",
      textColor: "text-purple-600",
    },
  ];

  return (
    <MotionContainer className="space-y-8" variants={ADMIN_ANIMATION_VARIANTS.staggerContainer}>
      {/* EBHeader */}
      <MotionItem variants={ADMIN_ANIMATION_VARIANTS.adminPage}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Manage users and monitor platform activity
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Shield className="w-4 h-4" />
            <span>Admin Panel</span>
          </div>
        </div>
      </MotionItem>

      {/* Statistics Cards */}
      <MotionContainer
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={ADMIN_ANIMATION_VARIANTS.staggerContainer}
      >
        {statsData.map((stat) => (
          <MotionItem key={stat.title} variants={ADMIN_ANIMATION_VARIANTS.statsCard}>
            <EBMotionCard
              variants={ADMIN_ANIMATION_VARIANTS.statsCard}
              className={`relative overflow-hidden bg-gradient-to-br ${stat.bgGradient} border-0 hover:shadow-xl hover:shadow-${stat.color}-500/20 transition-all duration-300`}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                    {stat.title}
                  </h3>
                  <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <TrendingUp className="w-3 h-3" />
                    <span>Active</span>
                  </div>
                </div>
                <div className={`${stat.iconBg} p-3 rounded-2xl shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Decorative gradient overlay */}
              <div
                className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-${stat.color}-400/20 to-${stat.color}-600/20 rounded-full blur-xl`}
              />
            </EBMotionCard>
          </MotionItem>
        ))}
      </MotionContainer>

      {/* User Management Table with Tabs */}
      <AdminDataTable
        columns={tableColumns}
        data={allUsersData?.data || []}
        isLoading={isLoadingAllUsers}
      />

      {/* User Details Modal */}
      <UserDetailsModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        user={selectedUser}
        userDetails={userDetailsData}
      />

      {/* Verification Documents Modal */}
      <VerificationDocsModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        user={selectedUser}
        verificationDocs={verificationDocsData}
        onApprove={handleApproveTutor}
        onReject={handleRejectTutor}
      />

      {/* Approval Modal - Tutor Type Selection */}
      <ApprovalModal
        isOpen={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
        user={selectedUser}
        tutorType={tutorType}
        onTutorTypeChange={setTutorType}
        onApprove={handleApproveTutor}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        user={selectedUser}
        onConfirm={handleDeleteConfirm}
      />

      {/* Reject Confirmation Dialog */}
      <RejectConfirmDialog
        isOpen={showRejectDialog}
        onClose={() => setShowRejectDialog(false)}
        user={selectedUser}
        onConfirm={handleRejectConfirm}
      />
    </MotionContainer>
  );
};

export default AdminDashboardPage;
