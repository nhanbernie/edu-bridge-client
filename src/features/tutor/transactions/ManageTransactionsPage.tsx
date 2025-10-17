"use client";

import React from "react";
import { useTutorTransactions } from "./hooks/useTutorTransactions";
import {
  TransactionStatsCard,
  UserTransactionList,
  TransactionHeader,
  EBPageLoading,
} from "@/components/common";
import { DollarSign, TrendingUp, Clock, CheckCircle, RefreshCw } from "lucide-react";
import { MotionContainer, MotionItem } from "@/components/motion";

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
    <MotionContainer className="min-h-screen space-y-8">
      {/* Header */}
      <MotionItem>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold text-foreground">Lịch sử giao dịch</h1>
            </div>
            <p className="text-lg text-muted-foreground">Theo dõi thu nhập và giao dịch của bạn</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={refetchTransactions}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 border border-border text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              Làm mới
            </button>
          </div>
        </div>
      </MotionItem>

      {/* Stats Cards */}
      <MotionItem>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card rounded-3xl shadow-lg border border-border p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl">
                <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tổng thu nhập</p>
                <p className="text-2xl font-bold text-foreground">
                  {formatCurrency(totalEarnings)}
                </p>
                <p className="text-xs text-muted-foreground">Tiền nhận vào</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-3xl shadow-lg border border-border p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-xl">
                <TrendingUp className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tổng chi tiêu</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(totalSpent)}</p>
                <p className="text-xs text-muted-foreground">Tiền chuyển đi</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-3xl shadow-lg border border-border p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-xl">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Hoàn thành</p>
                <p className="text-2xl font-bold text-foreground">{completedTransactions}</p>
                <p className="text-xs text-muted-foreground">Giao dịch thành công</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-3xl shadow-lg border border-border p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl">
                <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Đang chờ</p>
                <p className="text-2xl font-bold text-foreground">{pendingTransactions}</p>
                <p className="text-xs text-muted-foreground">Chờ xử lý</p>
              </div>
            </div>
          </div>
        </div>
      </MotionItem>

      {/* Transactions List */}
      <MotionItem>
        <div className="bg-card rounded-3xl shadow-lg border border-border p-6">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Danh sách giao dịch</h2>
          </div>
          <UserTransactionList transactions={transactions} formatCurrency={formatCurrency} />
        </div>
      </MotionItem>
    </MotionContainer>
  );
};

export default ManageTransactionsPage;
