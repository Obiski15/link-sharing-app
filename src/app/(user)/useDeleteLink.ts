import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteLink } from "@/services/linkApi";

export function useDeleteLink() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending: isDeleting } = useMutation({
    mutationKey: ["links"],
    mutationFn: deleteLink,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });
  return { mutateAsync, isDeleting };
}
