"use client";

import { useRouter } from "next/navigation";

import Image from "next/image";
import Heading from "./Heading";

interface Props {
  iconOnly?: boolean;
}

function Logo({ iconOnly }: Props) {
  const router = useRouter();
  return (
    <div
      className="flex justify-between items-center gap-3 cursor-default"
      onClick={() => router.push("/links")}
    >
      <Image src="/images/logo.png" alt="logo" width={33} height={33} />
      <div className={`${iconOnly ? "hidden sm:block" : "block"}`}>
        <Heading type="medium">devlinks</Heading>
      </div>
    </div>
  );
}

export default Logo;
