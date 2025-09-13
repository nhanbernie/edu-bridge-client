"use client";

import React, { useState } from "react";
import { RoleGuard } from "@/components/guards";
import AdminLayout from "@/components/layouts/AdminLayout";
import {
  useGetAllUsersQuery,
  useGetUserQuery,
  useGetVerificationDocsQuery,
  useVerifyAllDocumentsMutation,
  useDeleteUserMutation,
} from "@/services/user";
import { UserDto } from "@/services/api/type";
import { Eye, Check, X, Trash2, FileText, Users, GraduationCap, BookOpen } from "lucide-react";

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

  return (
    <RoleGuard allowedRoles={["ADMIN"]} requiredStatus={["APPROVED"]}>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Total Students</h3>
                  <p className="text-3xl font-bold text-emerald-600">{totalStudents}</p>
                </div>
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Total Tutors</h3>
                  <p className="text-3xl font-bold text-blue-600">{totalTutors}</p>
                </div>
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Pending Approval</h3>
                  <p className="text-3xl font-bold text-orange-600">{pendingTutors}</p>
                </div>
                <BookOpen className="w-8 h-8 text-orange-600" />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Total Users</h3>
                  <p className="text-3xl font-bold text-purple-600">
                    {allUsersData?.data?.length || 0}
                  </p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          {/* User Management Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8 px-6">
                {[
                  { key: "pending", label: "Pending Tutors", count: pendingTutors },
                  {
                    key: "approved",
                    label: "Approved Tutors",
                    count: approvedTutorsData?.data?.length || 0,
                  },
                  { key: "all", label: "All Users", count: allUsersData?.data?.length || 0 },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.key
                        ? "border-emerald-500 text-emerald-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {isLoadingAllUsers ? (
                <div className="text-center py-4">Loading...</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {getCurrentTabData().map((user) => (
                        <tr key={user.userId}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {user.fullName || user.email}
                              </div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                user.role === "ADMIN"
                                  ? "bg-red-100 text-red-800"
                                  : user.role === "TUTOR"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-green-100 text-green-800"
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                user.status === "PENDING"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : user.status === "APPROVED"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button
                              onClick={() => handleViewUser(user)}
                              className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {user.role === "TUTOR" && (
                              <>
                                <button
                                  onClick={() => handleViewVerificationDocs(user)}
                                  className="text-purple-600 hover:text-purple-900 p-1 rounded hover:bg-purple-50"
                                  title="View Documents"
                                >
                                  <FileText className="w-4 h-4" />
                                </button>

                                {user.status === "PENDING" && (
                                  <>
                                    <button
                                      onClick={() => handleApproveTutor(user.userId)}
                                      className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                                      title="Approve"
                                    >
                                      <Check className="w-4 h-4" />
                                    </button>
                                    <button
                                      onClick={() => handleRejectTutor(user.userId)}
                                      className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
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
                              className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                              title="Delete User"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* User Details Modal */}
          {showUserModal && selectedUser && userDetailsData && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">User Details</h3>
                  <button
                    onClick={() => setShowUserModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-3">
                  <div>
                    <strong>Name:</strong> {userDetailsData.data?.fullName || "N/A"}
                  </div>
                  <div>
                    <strong>Email:</strong> {userDetailsData.data?.email}
                  </div>
                  <div>
                    <strong>Role:</strong> {userDetailsData.data?.role}
                  </div>
                  <div>
                    <strong>Status:</strong> {userDetailsData.data?.status}
                  </div>
                  <div>
                    <strong>User ID:</strong> {userDetailsData.data?.userId}
                  </div>
                  {userDetailsData.data?.tutor && (
                    <div>
                      <strong>Tutor Info:</strong>
                      <pre className="text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded mt-1">
                        {JSON.stringify(userDetailsData.data.tutor, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Verification Documents Modal */}
          {showVerificationModal && selectedUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full mx-4 max-h-96 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Verification Documents</h3>
                  <button
                    onClick={() => setShowVerificationModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {verificationDocsData ? (
                  <div className="space-y-4">
                    <pre className="text-sm bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-x-auto">
                      {JSON.stringify(verificationDocsData, null, 2)}
                    </pre>
                    <div className="flex space-x-4 mt-4">
                      <button
                        onClick={() => {
                          setShowVerificationModal(false);
                          handleApproveTutor(selectedUser.userId);
                        }}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center space-x-2"
                      >
                        <Check className="w-4 h-4" />
                        <span>Approve All</span>
                      </button>
                      <button
                        onClick={() => handleRejectTutor(selectedUser.userId)}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center space-x-2"
                      >
                        <X className="w-4 h-4" />
                        <span>Reject All</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>Loading verification documents...</div>
                )}
              </div>
            </div>
          )}

          {/* Approval Modal - Tutor Type Selection */}
          {showApprovalModal && selectedUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Approve Tutor</h3>
                  <button
                    onClick={() => {
                      setShowApprovalModal(false);
                      setTutorType("");
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tutor Type
                    </label>
                    <select
                      value={tutorType}
                      onChange={(e) => setTutorType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    >
                      <option value="">Select Tutor Type</option>
                      <option value="VERIFIED">VERIFIED - Gia sư đã xác minh đầy đủ</option>
                      <option value="TRUSTED_BEGINNER">
                        TRUSTED_BEGINNER - Gia sư mới đáng tin cậy
                      </option>
                    </select>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => {
                        setShowApprovalModal(false);
                        setTutorType("");
                      }}
                      className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleApproveTutor(selectedUser.userId, tutorType)}
                      disabled={!tutorType}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>Approve</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    </RoleGuard>
  );
};

export default AdminPage;
