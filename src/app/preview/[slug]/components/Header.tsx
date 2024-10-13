"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/Button";

function Header({
  isLoggedIn,
  setDisplayUpdateMessage,
}: {
  isLoggedIn: boolean;
  setDisplayUpdateMessage: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();

  return (
    <header className="w-full sm:bg-primary-foreground sm:rounded-b-[32px] h-auto sm:h-[357px]">
      <div className="p-6">
        {isLoggedIn ? (
          <div className="flex justify-between items-center py-4 pr-4 pl-6 gap-2 sm:bg-primary rounded-xl">
            <Button
              variant="secondary"
              disabled={false}
              onClick={() => router.push("/links")}
            >
              Back to editor
            </Button>
            <Button
              variant="primary"
              onClick={async () => {
                await navigator.clipboard.writeText(window.location.href);
                setDisplayUpdateMessage(true);
              }}
            >
              Share link
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
    </header>
  );
}

export default Header;
