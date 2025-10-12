"use client";

import React from "react";
import { useStudentTransactions } from "./hooks/useStudentTransactions";
import {
  TransactionStatsCard,
  TransactionList,
  TransactionHeader,
  EBPageLoading,
} from "@/components/common";
import { CreditCard, TrendingDown, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { PAGE_CONTAINER, CONTENT_WRAPPER } from "@/common/constants/className.constant";

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
    return <EBPageLoading message="Đang tải lịch sử giao dịch..." />;
  }

  return (
    <div className={PAGE_CONTAINER}>
      <div className={CONTENT_WRAPPER}>
        <TransactionHeader
          title="Lịch sử thanh toán"
          description="Theo dõi các giao dịch thanh toán của bạn"
          onRefresh={refetchTransactions}
          isLoading={isLoading}
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <TransactionStatsCard
            title="Tổng chi tiêu"
            value={formatCurrency(totalSpent)}
            description="Tổng số tiền đã thanh toán"
            icon={CreditCard}
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
        <TransactionList
          transactions={transactions}
          formatCurrency={formatCurrency}
          userRole="student"
        />
      </div>
    </div>
  );
};

export default ManageTransactionsPage;
