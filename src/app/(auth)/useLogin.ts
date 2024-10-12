import { useMutation } from "@tanstack/react-query";
import { login } from "@/services/authApi";
import { LoginInputs } from "./types";

export function useLogin() {
  const {
    mutateAsync: loginUser,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationKey: ["user"],
    mutationFn: ({ email, password }: LoginInputs) =>
      login({ email, password }),
  });

  return { loginUser, isLoading, error };
}
