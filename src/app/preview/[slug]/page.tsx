"use client";

import { usePathname } from "next/navigation";
import { Link } from "lucide-react";
import { useState } from "react";

import { usePreview } from "../usePreview";

import ProfilePreview from "@/components/ProfilePreview";
import OnScreenMessage from "@/components/OnScreenMessage";
import Header from "./components/Header";

function Preview() {
  const [displayUpdateMessage, setDisplayUpdateMessage] =
    useState<boolean>(false);
  const pathname = usePathname();

  const userId = pathname.split("/")[2];

  const { data = {}, isLoading, error } = usePreview(userId);

  return (
    <div className="min-h-screen bg-background flex-col flex justify-start items-center gap-2">
      <Header
        isLoggedIn={data?.data?.isLoggedIn}
        setDisplayUpdateMessage={setDisplayUpdateMessage}
      />

      <div className="relative sm:-top-[100px] top-0 sm:py-[48px] sm:bg-primary sm:rounded-3xl sm:px-[56px] sm:shadow-[0px_0px_32px_0px_#0000001A]">
        <ProfilePreview
          user={data?.data?.user || {}}
          links={data?.data?.links || []}
          isLoading={{ isLoadingUser: isLoading, isLoadingLinks: isLoading }}
          error={{ userError: error, linksError: error }}
        />
      </div>

      {displayUpdateMessage && (
        <OnScreenMessage
          Icon={Link}
          message="Profile Link Copied to Clipboard"
          setDisplayUpdateMessage={setDisplayUpdateMessage}
          timeout={2000}
        />
      )}
    </div>
  );
}

export default Preview;
