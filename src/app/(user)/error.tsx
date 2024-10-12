"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/Button";

const Error = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-[579px] overflow-hidden col-span-3 md:col-span-2">
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
            router.refresh();
          }}
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default Error;
