"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/Button";

const ErrorPage = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden">
      <div className="text-center flex justify-between items-center flex-col gap-4">
        <h1 className="text-6xl font-bold text-error">Oops!</h1>
        <p className="mt-4 text-lg text-secondary-foreground">
          Something went wrong!
        </p>
        <p className="mt-2 text-foreground">
          We couldn&apos;t process your request.
        </p>
        <Button
          variant="secondary"
          onClick={() => {
            router.replace("/links");
            // window.location.href = "/links";
          }}
        >
          Go to Home
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
