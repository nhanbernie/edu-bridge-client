import { useMemo } from "react";
import { useGetSubjectsQuery } from "@/services/user/user.service";

export function useSubjects(tutorId: string | null) {
  const { data, isLoading, error } = useGetSubjectsQuery(
    tutorId ? { tutorId } : ({} as any),
    { skip: !tutorId }
  );

  const options = useMemo(() => {
    const raw = data?.data ?? [];
    const flattened = raw.flatMap((s: string) => s.split(",").map((x) => x.trim()).filter(Boolean));
    const unique = Array.from(new Set(flattened));
    return unique.map((name: string) => ({ value: name, label: name }));
  }, [data]);

  return { options, isLoading, error } as const;
}


