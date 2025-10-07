"use client";

import React from "react";
import { useStudentTransactions } from "./hooks/useStudentTransactions";
import { TransactionStatsCard, TransactionList, TransactionHeader } from "@/components/common";
import { CreditCard, TrendingDown, Clock, CheckCircle, AlertCircle } from "lucide-react";

const ManageTransactionsPage: React.FC = () => {
  const {
    transactions,
    isLoading,
    totalSpent,
    totalServiceFees,
    completedTransactions,
    pendingTransactions,
    failedTransactions,
    refetchTransactions,
  } = useStudentTransactions();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 animate-spin mx-auto mb-4 border-2 border-gray-300 border-t-gray-600 rounded-full"></div>
          <p className="text-gray-600">Đang tải lịch sử giao dịch...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <TransactionHeader
          title="Lịch sử thanh toán"
          description="Theo dõi các giao dịch thanh toán của bạn"
          onRefresh={refetchTransactions}
          isLoading={isLoading}
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <TransactionStatsCard
            title="Tổng chi tiêu"
            value={formatCurrency(totalSpent)}
            description="Tổng số tiền đã thanh toán"
            icon={CreditCard}
          />
          <TransactionStatsCard
            title="Phí dịch vụ"
            value={formatCurrency(totalServiceFees)}
            description="Phí dịch vụ đã trả"
            icon={TrendingDown}
          />
          <TransactionStatsCard
            title="Hoàn thành"
            value={completedTransactions}
            description="Giao dịch thành công"
            icon={CheckCircle}
          />
          <TransactionStatsCard
            title="Đang chờ"
            value={pendingTransactions}
            description="Chờ xử lý"
            icon={Clock}
          />
        </div>

        {/* Transactions List */}
        <TransactionList transactions={transactions} formatCurrency={formatCurrency} />
      </div>
    </div>
  );
};

export default ManageTransactionsPage;
