import { getLinks } from "@/services/linkApi";
import { useQuery } from "@tanstack/react-query";

export function useLinks() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["links"],
    queryFn: getLinks,
  });

  return { data, isLoading, error };
}
