import { useQuery } from "@tanstack/react-query";

import { getPreview } from "@/services/linkApi";

export function usePreview(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["preview"],
    queryFn: () => getPreview(id),
  });

  return { data, isLoading, error };
}
