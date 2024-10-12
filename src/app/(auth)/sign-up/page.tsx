"use client";

import { toast } from "@/components/hooks/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Lock, Mail } from "lucide-react";
import { SignUpInputs } from "../types";
import Link from "next/link";

import { useSignUp } from "../useSignUp";

import FormInput from "@/components/FormInput";
import Heading from "@/components/Heading";
import Button from "@/components/Button";

function SignUp() {
  const [isActive, setIsActive] = useState<string>("");
  const { signupUser, isLoading } = useSignUp();
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpInputs>({});

  async function onSubmit(data: SignUpInputs) {
    await signupUser(data, {
      onError: (error) => {
        toast({
          title: "An Error Occurred",
          description: error.message,
          variant: "destructive",
          duration: 3000,
        });
      },
      onSuccess: () => {
        toast({
          title: "Success!",
          description: `Account Created Successfully`,
          variant: "success",
          duration: 3000,
        });
      },
    });
    router.replace("/profile");
  }

  return (
    <form
      className="sm:bg-primary rounded-xl self-start w-full flex gap-10 p-10 flex-col justify-between items-start"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Heading type="medium">Create account</Heading>
        <p className="text-md font-normal leading-2 text-secondary-foreground ">
          Let&apos;s get you started sharing your links!
        </p>
      </div>

      <div className="flex flex-col justify-between items-start gap-6 w-full">
        <FormInput
          id="email"
          name="email"
          type="email"
          placeholder="e.g alex@gmail.com"
          error={errors?.email?.message}
          Icon={Mail}
          label="Email Address"
          isActive={isActive}
          setIsActive={setIsActive}
          register={{
            ...register("email", {
              required: "A valid email address is required",
              onBlur: () => setIsActive(""),
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid Email address",
              },
            }),
          }}
        />

        <FormInput
          id="password"
          name="password"
          type="password"
          placeholder="At least 8 characters"
          error={errors?.password?.message}
          Icon={Lock}
          label="Password"
          isActive={isActive}
          setIsActive={setIsActive}
          register={{
            ...register("password", {
              required: "Enter your password",
              onBlur: () => setIsActive("password"),
              minLength: {
                value: 8,
                message: "minimum required length is 8",
              },
            }),
          }}
        />

        <FormInput
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="At least 8 characters"
          error={errors?.confirmPassword?.message}
          Icon={Lock}
          label="Confirm password"
          isActive={isActive}
          setIsActive={setIsActive}
          register={{
            ...register("confirmPassword", {
              required: "Confirm your password",
              onBlur: () => setIsActive(""),
              validate: (value, formValues) =>
                value === formValues.password || "password doesn't match",
              minLength: {
                value: 8,
                message: "minimum required length is 8",
              },
            }),
          }}
        />

        <p className="text-sm leading-3 font-normal text-secondary-foreground">
          Password must contain at least 8 characters
        </p>

        <Button variant="primary" type="full" disabled={isLoading}>
          Create an account
        </Button>

        <p className="w-full text-tertiary text-center leading-2 font-normal text-md">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary-foreground hover:underline hover:cursor-default"
          >
            Login
          </Link>
        </p>
      </div>
    </form>
  );
}

export default SignUp;
