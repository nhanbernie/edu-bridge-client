"use client";

import React from "react";
import { useStudentTransactions } from "./hooks/useStudentTransactions";
import {
  TransactionStatsCard,
  UserTransactionList,
  TransactionHeader,
  EBPageLoading,
} from "@/components/common";
import { CreditCard, TrendingDown, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { PAGE_CONTAINER, CONTENT_WRAPPER } from "@/common/constants/className.constant";
import { useTranslations } from "next-intl";

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
    return <EBPageLoading message={t("loading")} />;
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <TransactionStatsCard
            title={t("stats.totalSpent.title")}
            value={formatCurrency(totalSpent)}
            description={t("stats.totalSpent.description")}
            icon={CreditCard}
          />
          <TransactionStatsCard
            title={t("stats.totalReceived.title")}
            value={formatCurrency(totalReceived)}
            description={t("stats.totalReceived.description")}
            icon={TrendingDown}
          />
          <TransactionStatsCard
            title={t("stats.completed.title")}
            value={completedTransactions}
            description={t("stats.completed.description")}
            icon={CheckCircle}
          />
          <TransactionStatsCard
            title={t("stats.pending.title")}
            value={pendingTransactions}
            description={t("stats.pending.description")}
            icon={Clock}
          />
        </div>

        {/* Transactions List */}
        <UserTransactionList transactions={transactions} formatCurrency={formatCurrency} />
      </div>
    </div>
  );
};

export default ManageTransactionsPage;
