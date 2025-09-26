import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import {
  useGetAvailabilityBlocksQuery,
  useCreateAvailabilityBlockMutation,
  useUpdateAvailabilityBlockMutation,
  useDeleteAvailabilityBlockMutation,
  type CreateAvailabilityBlockRequest,
  type UpdateAvailabilityBlockRequest,
} from "@/services/availability-block";
import { setAvailabilityBlocks, setLoading } from "@/redux/slices/availability-block.slice";

interface UseAvailabilityBlockProps {
  tutorId?: string;
  courseId?: string;
}

export const useAvailabilityBlock = ({ tutorId, courseId }: UseAvailabilityBlockProps = {}) => {
  const dispatch = useDispatch();

  // Queries
  const {
    data: availabilityBlocksResponse,
    isLoading: isLoadingBlocks,
    error: blocksError,
    refetch: refetchBlocks,
  } = useGetAvailabilityBlocksQuery({ tutorId, courseId }, { skip: !tutorId });

  // Mutations
  const [createBlock, { isLoading: isCreating }] = useCreateAvailabilityBlockMutation();
  const [updateBlock, { isLoading: isUpdating }] = useUpdateAvailabilityBlockMutation();
  const [deleteBlock, { isLoading: isDeleting }] = useDeleteAvailabilityBlockMutation();

  // Transform data
  const availabilityBlocks = availabilityBlocksResponse?.success
    ? availabilityBlocksResponse.data
    : [];

  // Sync with Redux store
  useEffect(() => {
    if (availabilityBlocksResponse?.success) {
      dispatch(setAvailabilityBlocks(availabilityBlocksResponse.data));
    }
    dispatch(setLoading(isLoadingBlocks));
  }, [availabilityBlocksResponse, isLoadingBlocks, dispatch]);

  // Create availability block
  const handleCreateBlock = useCallback(
    async (blockData: CreateAvailabilityBlockRequest) => {
      try {
        const response = await createBlock(blockData).unwrap();

        if (response.success) {
          toast.success(response.message || "Tạo khung thời gian thành công!");
          return response.data;
        } else {
          toast.error(response.message || "Có lỗi xảy ra khi tạo khung thời gian");
          return null;
        }
      } catch (error: any) {
        console.error("Create availability block error:", error);
        toast.error("Có lỗi xảy ra khi tạo khung thời gian");
        return null;
      }
    },
    [createBlock]
  );

  // Update availability block
  const handleUpdateBlock = useCallback(
    async (blockId: string, blockData: UpdateAvailabilityBlockRequest) => {
      try {
        const response = await updateBlock({ blockId, ...blockData }).unwrap();

        if (response.success) {
          toast.success(response.message || "Cập nhật khung thời gian thành công!");
          return response.data;
        } else {
          toast.error(response.message || "Có lỗi xảy ra khi cập nhật khung thời gian");
          return null;
        }
      } catch (error: any) {
        console.error("Update availability block error:", error);
        toast.error("Có lỗi xảy ra khi cập nhật khung thời gian");
        return null;
      }
    },
    [updateBlock]
  );

  // Delete availability block
  const handleDeleteBlock = useCallback(
    async (blockId: string) => {
      try {
        const response = await deleteBlock({ blockId }).unwrap();

        if (response.success) {
          toast.success(response.message || "Xóa khung thời gian thành công!");
          return true;
        } else {
          toast.error(response.message || "Có lỗi xảy ra khi xóa khung thời gian");
          return false;
        }
      } catch (error: any) {
        console.error("Delete availability block error:", error);
        toast.error("Có lỗi xảy ra khi xóa khung thời gian");
        return false;
      }
    },
    [deleteBlock]
  );

  // Memoize refetchBlocks to prevent unnecessary re-renders
  const memoizedRefetchBlocks = useCallback(() => {
    return refetchBlocks();
  }, [refetchBlocks]);

  return {
    // Data
    availabilityBlocks,

    // Loading states
    isLoadingBlocks,
    isCreating,
    isUpdating,
    isDeleting,

    // Error
    blocksError,

    // Actions
    handleCreateBlock,
    handleUpdateBlock,
    handleDeleteBlock,
    refetchBlocks: memoizedRefetchBlocks,
  };
};
