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
    <div className="bg-background">
      <Header
        isLoggedIn={data?.data?.isLoggedIn}
        setDisplayUpdateMessage={setDisplayUpdateMessage}
      />
      <div className="sm:absolute sm:left-[50%] sm:top-[100%] sm:translate-x-[-50%] sm:translate-y-[-60%] sm:shadow-[0px_0px_32px_0px_#0000001A] flex justify-center items-center sm:py-[48px] sm:px-[56px] sm:bg-primary sm:rounded-3xl">
        <ProfilePreview
          user={data?.data?.user || {}}
          links={data?.data?.links || []}
          isLoading={{ isLoadingUser: isLoading, isLoadingLinks: isLoading }}
          error={{ userError: error, linksError: error }}
        />

        {displayUpdateMessage && (
          <OnScreenMessage
            Icon={Link}
            message="Profile Link Copied to Clipboard"
            setDisplayUpdateMessage={setDisplayUpdateMessage}
            timeout={2000}
          />
        )}
      </div>
    </div>
  );
}

export default Preview;
