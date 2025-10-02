"use client";

import React, { useState } from "react";
import { RoleGuard } from "@/components/guards";
import AdminLayout from "@/components/layouts/EBManageLayout";
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
import { MotionCard, MotionContainer, MotionItem } from "@/components/motion";
import { motion, type Variants } from "motion/react";

// Custom animation variants for admin page
const adminPageVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const statsCardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  hover: {
    y: -5,
    scale: 1.02,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const tableRowVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const AdminPage = () => {
  const [selectedUser, setSelectedUser] = useState<UserDto | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [tutorType, setTutorType] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "all">("pending");

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

  const handleViewUser = (user: UserDto) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleViewVerificationDocs = (user: UserDto) => {
    setSelectedUser(user);
    setShowVerificationModal(true);
  };

  const handleApproveTutor = async (tutorId: string, tutorTypeValue?: string) => {
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
  };

  const handleRejectTutor = async (
    tutorId: string,
    reason: "INVALID" | "INCOMPLETE" | "EXPIRED" | "OTHER" = "OTHER"
  ) => {
    try {
      await verifyAllDocuments({ tutorId, isApproved: false, rejectType: reason }).unwrap();
      alert("Tutor rejected successfully!");
    } catch (error) {
      console.error("Error rejecting tutor:", error);
      alert("Error rejecting tutor");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser({ userId }).unwrap();
        alert("User deleted successfully!");
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Error deleting user");
      }
    }
  };

  const getCurrentTabData = () => {
    switch (activeTab) {
      case "pending":
        return pendingTutorsData?.data || [];
      case "approved":
        return approvedTutorsData?.data || [];
      case "all":
        return allUsersData?.data || [];
      default:
        return [];
    }
  };

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
    <RoleGuard allowedRoles={["ADMIN"]} requiredStatus={["APPROVED"]}>
      <AdminLayout>
        <MotionContainer className="space-y-8" variants={staggerContainer}>
          {/* EBHeader */}
          <MotionItem variants={adminPageVariants}>
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
            variants={staggerContainer}
          >
            {statsData.map((stat) => (
              <MotionItem key={stat.title} variants={statsCardVariants}>
                <MotionCard
                  variants={statsCardVariants}
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
                </MotionCard>
              </MotionItem>
            ))}
          </MotionContainer>

          {/* User Management Tabs */}
          <div className="border-0 rounded-4xl shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <div className="border-b border-gray-200/50 dark:border-gray-700/50">
              <nav className="flex space-x-8 px-6">
                {[
                  {
                    key: "pending",
                    label: "Pending Tutors",
                    count: pendingTutors,
                    icon: Clock,
                    color: "orange",
                  },
                  {
                    key: "approved",
                    label: "Approved Tutors",
                    count: approvedTutorsData?.data?.length || 0,
                    icon: UserCheck,
                    color: "green",
                  },
                  {
                    key: "all",
                    label: "All Users",
                    count: allUsersData?.data?.length || 0,
                    icon: Users,
                    color: "blue",
                  },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`relative py-4 px-1 font-medium text-sm transition-all duration-300 flex items-center space-x-2 ${
                      activeTab === tab.key
                        ? `text-${tab.color}-600 dark:text-${tab.color}-400`
                        : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        activeTab === tab.key
                          ? `bg-${tab.color}-100 text-${tab.color}-700 dark:bg-${tab.color}-900/30 dark:text-${tab.color}-300`
                          : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                      }`}
                    >
                      {tab.count}
                    </span>

                    {/* Active tab indicator */}
                    {activeTab === tab.key && (
                      <motion.div
                        layoutId="activeTab"
                        className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-${tab.color}-500 to-${tab.color}-600 rounded-full`}
                      />
                    )}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {isLoadingAllUsers ? (
                <motion.div
                  variants={adminPageVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-center py-12"
                >
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-500 dark:text-gray-400">Loading users...</p>
                </motion.div>
              ) : (
                <div className="overflow-x-auto">
                  <motion.table
                    className="min-w-full"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    <thead>
                      <tr className="border-b border-gray-200/50 dark:border-gray-700/50">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                      {getCurrentTabData().map((user) => (
                        <motion.tr
                          key={user.userId}
                          variants={tableRowVariants}
                          className="group hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors duration-200"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                  {(user.fullName || user.email).charAt(0).toUpperCase()}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {user.fullName || user.email}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                                user.role === "ADMIN"
                                  ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                                  : user.role === "TUTOR"
                                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                                    : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                                user.status === "PENDING"
                                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                                  : user.status === "APPROVED"
                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                    : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                              }`}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleViewUser(user)}
                                className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>

                              {user.role === "TUTOR" && (
                                <>
                                  <button
                                    onClick={() => handleViewVerificationDocs(user)}
                                    className="p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-lg transition-colors duration-200"
                                    title="View Documents"
                                  >
                                    <FileText className="w-4 h-4" />
                                  </button>

                                  {user.status === "PENDING" && (
                                    <>
                                      <button
                                        onClick={() => handleApproveTutor(user.userId)}
                                        className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors duration-200"
                                        title="Approve"
                                      >
                                        <Check className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={() => handleRejectTutor(user.userId)}
                                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-200"
                                        title="Reject"
                                      >
                                        <X className="w-4 h-4" />
                                      </button>
                                    </>
                                  )}
                                </>
                              )}

                              <button
                                onClick={() => handleDeleteUser(user.userId)}
                                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-200"
                                title="Delete User"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </motion.table>
                </div>
              )}
            </div>
          </div>

          {/* User Details Modal */}
          {showUserModal && selectedUser && userDetailsData && (
            <motion.div
              variants={adminPageVariants}
              initial="hidden"
              animate="visible"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <MotionCard
                variants={modalVariants}
                className="bg-white dark:bg-gray-800 max-w-2xl w-full max-h-[80vh] overflow-hidden border-0 shadow-2xl"
              >
                <div className="flex justify-between items-center p-6 border-b border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {(userDetailsData.data?.fullName || userDetailsData.data?.email || "U")
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      User Details
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowUserModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[60vh]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          Full Name
                        </label>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                          {userDetailsData.data?.fullName || "N/A"}
                        </p>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          Email
                        </label>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                          {userDetailsData.data?.email}
                        </p>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          User ID
                        </label>
                        <p className="text-sm font-mono text-gray-600 dark:text-gray-300 mt-1 break-all">
                          {userDetailsData.data?.userId}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          Role
                        </label>
                        <span
                          className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full mt-2 ${
                            userDetailsData.data?.role === "ADMIN"
                              ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                              : userDetailsData.data?.role === "TUTOR"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                                : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                          }`}
                        >
                          {userDetailsData.data?.role}
                        </span>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                          Status
                        </label>
                        <span
                          className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full mt-2 ${
                            userDetailsData.data?.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                              : userDetailsData.data?.status === "APPROVED"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                          }`}
                        >
                          {userDetailsData.data?.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {userDetailsData.data?.tutor && (
                    <div className="mt-6">
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Tutor Information
                      </label>
                      <div className="mt-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                        <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
                          {JSON.stringify(userDetailsData.data.tutor, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              </MotionCard>
            </motion.div>
          )}

          {/* Verification Documents Modal */}
          {showVerificationModal && selectedUser && (
            <motion.div
              variants={adminPageVariants}
              initial="hidden"
              animate="visible"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <MotionCard
                variants={modalVariants}
                className="bg-white dark:bg-gray-800 max-w-4xl w-full max-h-[80vh] overflow-hidden border-0 shadow-2xl"
              >
                <div className="flex justify-between items-center p-6 border-b border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white">
                      <FileText className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Verification Documents
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowVerificationModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[60vh]">
                  {verificationDocsData ? (
                    <div className="space-y-6">
                      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                          Document Data
                        </h4>
                        <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto bg-white dark:bg-gray-800 p-4 rounded border">
                          {JSON.stringify(verificationDocsData, null, 2)}
                        </pre>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                        <button
                          onClick={() => {
                            setShowVerificationModal(false);
                            handleApproveTutor(selectedUser.userId);
                          }}
                          className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                        >
                          <Check className="w-5 h-5" />
                          <span className="font-medium">Approve All Documents</span>
                        </button>
                        <button
                          onClick={() => handleRejectTutor(selectedUser.userId)}
                          className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                        >
                          <X className="w-5 h-5" />
                          <span className="font-medium">Reject All Documents</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
                      <p className="text-gray-500 dark:text-gray-400">
                        Loading verification documents...
                      </p>
                    </div>
                  )}
                </div>
              </MotionCard>
            </motion.div>
          )}

          {/* Approval Modal - Tutor Type Selection */}
          {showApprovalModal && selectedUser && (
            <motion.div
              variants={adminPageVariants}
              initial="hidden"
              animate="visible"
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <MotionCard
                variants={modalVariants}
                className="bg-white dark:bg-gray-800 max-w-md w-full border-0 shadow-2xl"
              >
                <div className="flex justify-between items-center p-6 border-b border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white">
                      <Check className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Approve Tutor
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      setShowApprovalModal(false);
                      setTutorType("");
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Select Tutor Type
                    </label>
                    <select
                      value={tutorType}
                      onChange={(e) => setTutorType(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200"
                      required
                    >
                      <option value="">Choose tutor verification level...</option>
                      <option value="VERIFIED">VERIFIED - Gia sư đã xác minh đầy đủ</option>
                      <option value="TRUSTED_BEGINNER">
                        TRUSTED_BEGINNER - Gia sư mới đáng tin cậy
                      </option>
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
                            • <strong>VERIFIED:</strong> Fully verified tutors with complete
                            documentation
                          </li>
                          <li>
                            • <strong>TRUSTED_BEGINNER:</strong> New but trustworthy tutors starting
                            their journey
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => {
                        setShowApprovalModal(false);
                        setTutorType("");
                      }}
                      className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-all duration-200 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleApproveTutor(selectedUser.userId, tutorType)}
                      disabled={!tutorType}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-lg transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-medium shadow-lg hover:shadow-xl disabled:shadow-none"
                    >
                      <Check className="w-4 h-4" />
                      <span>Approve Tutor</span>
                    </button>
                  </div>
                </div>
              </MotionCard>
            </motion.div>
          )}
        </MotionContainer>
      </AdminLayout>
    </RoleGuard>
  );
};

export default AdminPage;
