"use client";

import { toast } from "@/components/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";

import { useLogin } from "../useLogin";
import { LoginInputs } from "../types";

import FormInput from "@/components/FormInput";
import Heading from "@/components/Heading";
import Button from "@/components/Button";

function Login() {
  const [isActive, setIsActive] = useState<string>("");
  const { loginUser, isLoading } = useLogin();
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginInputs>();

  async function onSubmit(data: LoginInputs) {
    loginUser(data, {
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
          description: `Login Successful`,
          variant: "success",
          duration: 3000,
        });
        router.replace("/links");
      },
    });
  }

  return (
    <form
      className="self-start w-full sm:bg-primary rounded-xl flex gap-10 p-10 flex-col justify-between items-start"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Heading type="medium">Login</Heading>
        <p className="text-md font-normal leading-2 text-secondary-foreground ">
          Add your details below to get back into the app
        </p>
      </div>

      <div className="flex flex-col justify-between items-start gap-6 w-full">
        <FormInput
          id="email"
          name="email"
          type="email"
          placeholder="e.g. alex@gmail.com"
          error={errors?.email?.message}
          Icon={Mail}
          label="Email Address"
          isActive={isActive}
          setIsActive={setIsActive}
          register={{
            ...register("email", {
              required: "Provide a valid email",
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
          placeholder="Enter your password"
          error={errors?.password?.message}
          Icon={Lock}
          label="Password"
          isActive={isActive}
          setIsActive={setIsActive}
          register={{
            ...register("password", {
              required: "Enter your password",
              minLength: {
                value: 8,
                message: "Minimum Password length is 8",
              },
              onBlur: () => setIsActive(""),
            }),
          }}
        />

        <Button variant="primary" type="full" disabled={isLoading}>
          Login
        </Button>

        <p className="w-full text-tertiary text-center leading-2 font-normal text-md">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-primary-foreground hover:underline hover:cursor-default"
          >
            Create account
          </Link>
        </p>
      </div>
    </form>
  );
}

export default Login;
