import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux/store";
import { selectTutorId } from "@/redux/selectors/auth.selectors";
import { setUser } from "@/redux/slices/auth.slice";
import { StorageService } from "@/services/storage/secureStorage.service";

export function useTutorId(): { tutorId: string | null; isLoading: boolean } {
  const dispatch = useDispatch();
  const tutorIdFromStore = useSelector((state: RootState) => selectTutorId(state) || null);
  const [tutorId, setTutorId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;

    const initializeTutorId = async () => {
      try {
        // First check Redux store
        if (tutorIdFromStore) {
          if (mounted) {
            setTutorId(tutorIdFromStore);
            setLoading(false);
          }
          return;
        }

        // If not in store, check localStorage and update Redux
        const userData = await StorageService.getUserData();
        const id = userData?.tutor?.tutorId || null;

        if (mounted) {
          setTutorId(id);

          // Update Redux store if we found data in localStorage
          if (userData && id) {
            dispatch(setUser(userData));
          }

          setLoading(false);
        }
      } catch (error) {
        console.error("Error initializing tutor ID:", error);
        if (mounted) {
          setTutorId(null);
          setLoading(false);
        }
      }
    };

    initializeTutorId();

    return () => {
      mounted = false;
    };
  }, [tutorIdFromStore, dispatch]);

  return { tutorId, isLoading: loading };
}
