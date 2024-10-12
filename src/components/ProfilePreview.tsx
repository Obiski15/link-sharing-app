"use client";

import { MoveRight } from "lucide-react";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { toast } from "./hooks/use-toast";
import { icons } from "@/lib/constants";

import Heading from "@/components/Heading";
import { Skeleton } from "./ui/skeleton";

interface linkObject {
  url: string;
  platform: string;
  _id: string;
  userId: string;
}

interface Props {
  isLoading: { isLoadingUser: boolean; isLoadingLinks: boolean };
  error: { userError: Error | null; linksError: Error | null };
  links: linkObject[];
  user: {
    _id: string;
    email: string;
    image?: string;
    firstName?: string;
    lastName?: string;
  };
}

function ProfilePreview({ user, links, isLoading, error }: Props) {
  useEffect(() => {
    if (error.userError || error.linksError) {
      toast({
        variant: "destructive",
        title: "An error occured!",
        description: error.userError?.message || error.linksError?.message,
      });
    }
  }, [error]);

  return (
    <div className="flex flex-col justify-between items-center max-w-[237px] gap-[56px]">
      <div className="flex flex-col justify-between items-center gap-[25px]">
        <div className="relative w-[104px] h-[104px]">
          {isLoading.isLoadingUser ? (
            <Skeleton className="rounded-full bg-border w-full h-full" />
          ) : error.userError ? (
            <p className="rounded-full bg-border w-full h-full"></p>
          ) : user?.image ? (
            <Image
              src={`${process.cwd()}${user?.image}`}
              alt="user-profile"
              fill={true}
              className="rounded-full border-4 border-border-active object-cover"
            />
          ) : (
            <p className="rounded-full bg-border w-full h-full"></p>
          )}
        </div>

        <div className="flex flex-col items-center text-center justify-between gap-2">
          {isLoading.isLoadingUser ? (
            <>
              <Skeleton className="w-[160px] h-4 rounded-[104px] bg-border" />
              <Skeleton className="w-[72px] h-2 rounded-[104px] bg-border" />
            </>
          ) : error.userError ? (
            <>
              <p className="w-[160px] h-4 rounded-[104px] bg-border"></p>
              <p className="w-[160px] h-4 rounded-[104px] bg-border"></p>
            </>
          ) : (
            <>
              {user?.firstName && user?.lastName ? (
                <>
                  <Heading type="medium" className="break-all">
                    {user?.firstName}
                  </Heading>
                  <Heading type="medium" className="break-all">
                    {user?.lastName}
                  </Heading>
                </>
              ) : (
                <p className="w-[160px] h-4 rounded-[104px] bg-border"></p>
              )}
              {user?.email ? (
                <p className="text-secondary-foreground leading-[21px] text-[14px] font-normal">
                  {user?.email}
                </p>
              ) : (
                <p className="w-[72px] h-2 rounded-[104px] bg-border"></p>
              )}
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-[20px]">
        {isLoading.isLoadingLinks ? (
          Array.from({ length: 5 }, (_, i) => (
            <Skeleton
              key={i + 1}
              className={`bg-border h-[42px] w-[237px] rounded-lg`}
            />
          ))
        ) : error.linksError ? (
          Array.from({ length: 5 }, (_, i) => (
            <Skeleton
              key={i + 1}
              className={`bg-border h-[42px] w-[237px] rounded-lg`}
            />
          ))
        ) : (
          <>
            {links?.slice(0, 5).map((link: linkObject) => {
              return (
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  key={link._id}
                  className={`flex justify-between items-center gap-2 p-4 rounded-lg w-[237px]`}
                  style={{
                    backgroundColor: icons.find(
                      (icon) =>
                        icon.name.toLocaleLowerCase() ===
                        link.platform.toLowerCase()
                    )?.color.secondary,
                    border: `1px solid ${
                      icons.find(
                        (icon) =>
                          icon.name.toLocaleLowerCase() ===
                          link.platform.toLowerCase()
                      )?.color.border
                    }`,
                  }}
                >
                  <Image
                    alt={link?.platform}
                    src={`/icons/${link.platform
                      .toLowerCase()
                      .replace(".", "dot")
                      .replace(" ", "")}.svg`}
                    width={16}
                    height={18}
                  />
                  <p
                    className="flex-1 capitalize text-primary"
                    style={{
                      color: icons.find(
                        (icon) =>
                          icon.name.toLocaleLowerCase() ===
                          link.platform.toLowerCase()
                      )?.color.primary,
                    }}
                  >
                    {link?.platform}
                  </p>
                  <MoveRight className="text-primary" width={16} height={16} />
                </Link>
              );
            })}

            {links?.length < 5 ? (
              <div className="flex flex-col items-center justify-between gap-[20px]">
                {Array.from({ length: 5 - links.length }, (_, i) => (
                  <p
                    key={i + 1}
                    className={`bg-border h-[42px] w-[237px] rounded-lg`}
                  ></p>
                ))}
              </div>
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ProfilePreview;
