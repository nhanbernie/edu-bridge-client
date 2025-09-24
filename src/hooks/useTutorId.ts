import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { selectTutorId } from "@/redux/selectors/auth.selectors";
import { StorageService } from "@/services/storage/secureStorage.service";

export function useTutorId(): { tutorId: string | null; isLoading: boolean } {
  const tutorIdFromStore = useSelector((state: RootState) => selectTutorId(state) || null);
  const [tutorId, setTutorId] = useState<string | null>(tutorIdFromStore);
  const [loading, setLoading] = useState<boolean>(!Boolean(tutorIdFromStore));

  useEffect(() => {
    if (tutorIdFromStore) {
      setTutorId(tutorIdFromStore);
      setLoading(false);
      return;
    }

    let mounted = true;
    (async () => {
      try {
        const userData = await StorageService.getUserData();
        const id = userData?.tutor?.tutorId || null;
        if (mounted) setTutorId(id);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [tutorIdFromStore]);

  return { tutorId, isLoading: loading };
}


