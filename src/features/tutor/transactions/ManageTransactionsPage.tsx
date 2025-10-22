"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useTutorTransactions } from "./hooks/useTutorTransactions";
import {
  TransactionStatsCard,
  UserTransactionList,
  TransactionHeader,
  EBPageLoading,
} from "@/components/common";
import { ManageTransactionsSkeleton } from "./skeleton";
import { DollarSign, TrendingUp, Clock, CheckCircle, RefreshCw } from "lucide-react";
import { MotionContainer, MotionItem } from "@/components/motion";

const ManageTransactionsPage: React.FC = () => {
  const t = useTranslations("tutor.transactions.manage");
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
    return <ManageTransactionsSkeleton />;
  }

  return (
    <MotionContainer className="min-h-screen space-y-6 lg:space-y-8">
      {/* Header */}
      <MotionItem>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3 lg:mb-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                {t("title")}
              </h1>
            </div>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full lg:w-auto">
            <button
              onClick={refetchTransactions}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-border text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors disabled:opacity-50 w-full sm:w-auto"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">{t("buttons.refresh")}</span>
              <span className="sm:hidden">Refresh</span>
            </button>
          </div>
        </div>
      </MotionItem>

      {/* Stats Cards */}
      <MotionItem>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-card rounded-2xl sm:rounded-3xl shadow-lg border border-border p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-3 bg-green-100 dark:bg-green-900/20 rounded-lg sm:rounded-xl">
                <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                  {t("stats.totalEarnings.title")}
                </p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
                  {formatCurrency(totalEarnings)}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {t("stats.totalEarnings.description")}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl sm:rounded-3xl shadow-lg border border-border p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-3 bg-red-100 dark:bg-red-900/20 rounded-lg sm:rounded-xl">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                  {t("stats.totalSpent.title")}
                </p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
                  {formatCurrency(totalSpent)}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {t("stats.totalSpent.description")}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl sm:rounded-3xl shadow-lg border border-border p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-3 bg-primary/10 rounded-lg sm:rounded-xl">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                  {t("stats.completed.title")}
                </p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
                  {completedTransactions}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {t("stats.completed.description")}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl sm:rounded-3xl shadow-lg border border-border p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg sm:rounded-xl">
                <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                  {t("stats.pending.title")}
                </p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
                  {pendingTransactions}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {t("stats.pending.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </MotionItem>

      {/* Transactions List */}
      <MotionItem>
        <div className="bg-card rounded-2xl sm:rounded-3xl shadow-lg border border-border p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
              {t("list.title")}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <UserTransactionList transactions={transactions} formatCurrency={formatCurrency} />
          </div>
        </div>
      </MotionItem>
    </MotionContainer>
  );
};

export default ManageTransactionsPage;
