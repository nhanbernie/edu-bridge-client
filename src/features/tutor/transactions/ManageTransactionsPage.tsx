"use client";

import React from "react";
import { useTutorTransactions } from "./hooks/useTutorTransactions";
import {
  TransactionStatsCard,
  UserTransactionList,
  TransactionHeader,
  EBPageLoading,
} from "@/components/common";
import { DollarSign, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { PAGE_HEADER } from "@/common/constants/className.constant";

const ManageTransactionsPage: React.FC = () => {
  const {
    transactions,
    isLoading,
    totalEarnings,
    totalSpent,
    completedTransactions,
    pendingTransactions,
    failedTransactions,
    refetchTransactions,
  } = useTutorTransactions();

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
    <div className="min-h-screen">
      <div className={PAGE_HEADER}>
        <TransactionHeader
          title="Lịch sử giao dịch"
          description="Theo dõi thu nhập và giao dịch của bạn"
          onRefresh={refetchTransactions}
          isLoading={isLoading}
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <TransactionStatsCard
          title="Tổng thu nhập"
          value={formatCurrency(totalEarnings)}
          description="Tiền nhận vào"
          icon={DollarSign}
        />
        <TransactionStatsCard
          title="Tổng chi tiêu"
          value={formatCurrency(totalSpent)}
          description="Tiền chuyển đi"
          icon={TrendingUp}
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
      <UserTransactionList transactions={transactions} formatCurrency={formatCurrency} />
    </div>
  );
};

export default ManageTransactionsPage;
