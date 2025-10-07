import { useGetTutorTransactionsQuery } from "@/services/transactions";
import { useTutorId } from "@/hooks/useTutorId";

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

  // Calculate summary stats
  const totalEarnings = transactions.reduce((sum, transaction) => {
    return sum + (transaction.amount - transaction.serviceFee);
  }, 0);

  const totalServiceFees = transactions.reduce((sum, transaction) => {
    return sum + transaction.serviceFee;
  }, 0);

  const completedTransactions = transactions.filter((t) => t.status === 1).length;
  const pendingTransactions = transactions.filter((t) => t.status === 0).length;
  const failedTransactions = transactions.filter((t) => t.status === 2).length;

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
    totalServiceFees,
    completedTransactions,
    pendingTransactions,
    failedTransactions,
  };
};
