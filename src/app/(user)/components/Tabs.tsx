"use client";

import { useRouter, usePathname } from "next/navigation";
import { CircleUserRound, Link } from "lucide-react";
import { useEffect, useState } from "react";

import Tab from "./Tab";

function Tabs() {
  const [activeTab, setActiveTab] = useState("");
  const router = useRouter();
  const path = usePathname();

  const urlTab = path.split("/").slice(1)[0];

  useEffect(() => {
    setActiveTab(urlTab);
  }, [urlTab]);

  function handleTabChange(currentTab: string) {
    if (currentTab.toLowerCase() === activeTab.toLowerCase()) return;
    router.push(`/${currentTab.toLowerCase()}`);
    setActiveTab(currentTab);
  }

  return (
    <div className="flex gap-4 justify-between items-center">
      <Tab
        onClick={() => handleTabChange("links")}
        Icon={Link}
        activeTab={activeTab}
        currentTab="links"
      >
        Links
      </Tab>
      <Tab
        onClick={() => handleTabChange("profile")}
        Icon={CircleUserRound}
        activeTab={activeTab}
        currentTab="profile"
      >
        Profile Details
      </Tab>
    </div>
  );
}

export default Tabs;
