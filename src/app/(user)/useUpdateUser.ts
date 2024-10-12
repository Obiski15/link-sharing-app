import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/hooks/use-toast";

import { updateUser } from "@/services/userApi";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateData, isPending: isUpdating } = useMutation({
    mutationKey: ["user"],
    mutationFn: ({
      firstName,
      lastName,
      image,
    }: {
      firstName: string;
      lastName: string;
      image: File | null;
    }) => updateUser({ firstName, lastName, image }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },

    onError: (error) => {
      toast({
        variant: "destructive",
        title: "An error occured!",
        description: error.message,
      });
    },
  });
  return { isUpdating, updateData };
}
