"use client";

import { MainLayout } from "@/components/layouts";
import { useAuth } from "@/contexts/AuthContext";

const HomeFeature = () => {
  const { user, logout } = useAuth();

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 relative overflow-hidden pt-16">
        <div className="max-w-4xl mx-auto p-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Chào mừng đến với EduBridge</h1>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Đăng xuất
              </button>
            </div>

            {user && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-2">Thông tin người dùng</h2>
                <p>
                  <strong>ID:</strong> {user.id}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Họ và tên:</strong> {user.fullName}
                </p>
                <p>
                  <strong>Vai trò:</strong> {user.roles?.join(", ")}
                </p>
              </div>
            )}

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">Tính năng</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900">Tìm gia sư</h4>
                  <p className="text-blue-700 text-sm">
                    Tìm kiếm gia sư phù hợp với nhu cầu của bạn
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900">Đặt lịch học</h4>
                  <p className="text-green-700 text-sm">Đặt lịch học với gia sư yêu thích</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-900">Quản lý khóa học</h4>
                  <p className="text-purple-700 text-sm">Theo dõi tiến độ học tập của bạn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomeFeature;
