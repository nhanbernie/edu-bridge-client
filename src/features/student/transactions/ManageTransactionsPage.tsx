"use client";

import React from "react";
import { useStudentTransactions } from "./hooks/useStudentTransactions";
import { UserTransactionList, TransactionHeader } from "@/components/common";
import { CreditCard, TrendingDown, Clock, CheckCircle } from "lucide-react";
import { PAGE_CONTAINER, CONTENT_WRAPPER } from "@/common/constants/className.constant";
import { useTranslations } from "next-intl";
import { TransactionPageSkeleton } from "./skeletons";
import { EBMotionCard } from "@/components/motion";

const ManageTransactionsPage: React.FC = () => {
  const t = useTranslations("student.transactions");
  const {
    transactions,
    isLoading,
    totalSpent,
    totalReceived,
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
    return <TransactionPageSkeleton />;
  }

  return (
    <div className={PAGE_CONTAINER}>
      <div className={CONTENT_WRAPPER}>
        <TransactionHeader
          title={t("header.title")}
          description={t("header.description")}
          onRefresh={refetchTransactions}
          isLoading={isLoading}
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <EBMotionCard variant="base" className="bg-card rounded-2xl sm:rounded-3xl shadow-lg border border-border p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-3 bg-red-100 dark:bg-red-900/20 rounded-lg sm:rounded-xl">
                <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 dark:text-red-400" />
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
          </EBMotionCard>

          {/* Total Received */}
          <EBMotionCard variant="base" className="bg-card rounded-2xl sm:rounded-3xl shadow-lg border border-border p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg sm:rounded-xl">
                <TrendingDown className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm text-muted-foreground truncate">
                  {t("stats.totalReceived.title")}
                </p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
                  {formatCurrency(totalReceived)}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {t("stats.totalReceived.description")}
                </p>
              </div>
            </div>
          </EBMotionCard>

          {/* Completed */}
          <EBMotionCard variant="base" className="bg-card rounded-2xl sm:rounded-3xl shadow-lg border border-border p-4 sm:p-6">
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
          </EBMotionCard>

          {/* Pending */}
          <EBMotionCard variant="base" className="bg-card rounded-2xl sm:rounded-3xl shadow-lg border border-border p-4 sm:p-6">
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
          </EBMotionCard>
        </div>

        {/* Transactions List */}
        <UserTransactionList transactions={transactions} formatCurrency={formatCurrency} />
      </div>
    </div>
  );
};

export default ManageTransactionsPage;
