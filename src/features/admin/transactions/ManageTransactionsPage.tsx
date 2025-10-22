"use client";

import React from "react";
import { useAdminTransactions } from "./hooks/useAdminTransactions";
import {
  TransactionStatsCard,
  TransactionList,
  TransactionHeader,
  EBPageLoading,
} from "@/components/common";
import { DollarSign, TrendingUp, Clock, CheckCircle, Building2 } from "lucide-react";

const ManageTransactionsPage: React.FC = () => {
  const {
    transactions,
    serviceFees,
    isLoading,
    totalEarnings,
    totalServiceFees,
    completedTransactions,
    pendingTransactions,
    failedTransactions,
    refetchAll,
  } = useAdminTransactions();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  if (isLoading) {
    return <EBPageLoading message="Đang tải lịch sử giao dịch..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <TransactionHeader
          title="Quản lý giao dịch hệ thống"
          description="Theo dõi tất cả giao dịch và phí dịch vụ trong hệ thống"
          onRefresh={refetchAll}
          isLoading={isLoading}
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <TransactionStatsCard
            title="Tổng thu nhập"
            value={formatCurrency(totalEarnings)}
            description="Tổng thu nhập từ giao dịch"
            icon={DollarSign}
          />
          <TransactionStatsCard
            title="Phí dịch vụ"
            value={formatCurrency(totalServiceFees)}
            description="Phí dịch vụ từ giao dịch"
            icon={TrendingUp}
          />
          <TransactionStatsCard
            title="Phí hệ thống"
            value={formatCurrency(serviceFees)}
            description="Tổng phí hệ thống"
            icon={Building2}
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
