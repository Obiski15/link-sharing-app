import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/hooks/use-toast";
import { logout } from "@/services/authApi";
import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutateAsync: logoutUser, isPending: isLoggingOut } = useMutation({
    mutationKey: ["user"],
    mutationFn: logout,

    onSuccess: () => {
      toast({
        variant: "success",
        title: "Success!",
        description: "Logged Out",
        duration: 2000,
      });
      queryClient.clear();
      router.push("/login");
    },

    onError: (error) => {
      toast({
        variant: "destructive",
        title: "An Error Occured",
        description: error.message,
        duration: 2000,
      });
    },
  });
  return { logoutUser, isLoggingOut };
}
