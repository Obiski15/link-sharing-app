import { useMutation } from "@tanstack/react-query";
import { signup } from "@/services/authApi";
import { SignUpInputs } from "./types";

export function useSignUp() {
  const {
    mutate: signupUser,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationKey: ["user"],
    mutationFn: ({ email, password, confirmPassword }: SignUpInputs) =>
      signup({ email, password, confirmPassword }),
  });
  return { signupUser, isLoading, error };
}
