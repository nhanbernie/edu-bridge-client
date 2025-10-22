import { useGetTutorTransactionsQuery } from "@/services/transactions";
import { useTutorId } from "@/hooks/useTutorId";
import { FlowType } from "@/common/enums";

export const useTutorTransactions = () => {
  const { tutorId, isLoading: tutorLoading } = useTutorId();

  const {
    data: transactionsResponse,
    isLoading: isLoadingTransactions,
    error: transactionsError,
    refetch: refetchTransactions,
  } = useGetTutorTransactionsQuery();

  const transactions = transactionsResponse?.data || [];
  const isLoading = tutorLoading || isLoadingTransactions;

  // Calculate summary stats based on new DTO
  const totalEarnings = transactions
    .filter((t) => t.flowType.toUpperCase() === FlowType.INCOMING)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalSpent = transactions
    .filter((t) => t.flowType.toUpperCase() === FlowType.OUTGOING)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const completedTransactions = transactions.filter(
    (t) => t.status.toLowerCase() === "thành công" || t.status.toLowerCase() === "completed"
  ).length;

  const pendingTransactions = transactions.filter(
    (t) => t.status.toLowerCase() === "đang chờ" || t.status.toLowerCase() === "pending"
  ).length;

  const failedTransactions = transactions.filter(
    (t) => t.status.toLowerCase() === "thất bại" || t.status.toLowerCase() === "failed"
  ).length;

  return {
    // Data
    transactions,
    tutorId,

    // Loading states
    isLoading,
    tutorLoading,
    isLoadingTransactions,

    // Error states
    transactionsError,

    // Actions
    refetchTransactions,

    // Stats
    totalEarnings,
    totalSpent,
    completedTransactions,
    pendingTransactions,
    failedTransactions,
  };
};
