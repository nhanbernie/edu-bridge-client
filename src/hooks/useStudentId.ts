import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import { setUser } from "@/redux/slices/auth.slice";
import { StorageService } from "@/services/storage/secureStorage.service";

export function useStudentId(): { studentId: string | null; isLoading: boolean } {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [studentId, setStudentId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;

    const initializeStudentId = async () => {
      try {
        // First check Redux store
        if (user?.userId) {
          if (mounted) {
            setStudentId(user.userId);
            setLoading(false);
          }
          return;
        }

        // If not in store, try to get from storage
        const storedUser = await StorageService.getUserData();
        if (storedUser?.student?.studentId && mounted) {
          dispatch(setUser(storedUser));
          setStudentId(storedUser.student.studentId);
        }
      } catch (error) {
        console.error("Error initializing student ID:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeStudentId();

    return () => {
      mounted = false;
    };
  }, [dispatch, user?.userId]);

  return {
    studentId,
    isLoading: loading,
  };
}
