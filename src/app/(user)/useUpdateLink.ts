import { updateLink } from "@/services/linkApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateLink() {
  const queryClient = useQueryClient();
  const {
    mutate,
    mutateAsync,
    isPending: isLoading,
  } = useMutation({
    mutationKey: ["links"],
    mutationFn: updateLink,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["links"],
      });
    },
  });
  return { mutateAsync, mutate, isLoading };
}
