import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLink } from "@/services/linkApi";

export function useAddLink() {
  const queryClient = useQueryClient();

  const {
    mutate,
    mutateAsync,
    isPending: isLoading,
  } = useMutation({
    mutationKey: ["links"],
    mutationFn: addLink,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["links"],
      });
    },
  });

  return { mutate, mutateAsync, isLoading };
}
