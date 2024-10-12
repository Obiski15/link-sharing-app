import { useQuery } from "@tanstack/react-query";

import { getUser } from "@/services/userApi";

export function useUser() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    refetchOnMount: false,
  });
  return { data, isLoading, error };
}
