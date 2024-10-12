"use client";

import { useIsFetching } from "@tanstack/react-query";
import { toast } from "@/components/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Eye, LogOut } from "lucide-react";
import { useEffect } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import Tabs from "./Tabs";

import { useLogout } from "../useLogout";
import { useUser } from "../useUser";

function Header() {
  const isFetching = useIsFetching({ queryKey: ["user"] });
  const { isLoggingOut, logoutUser } = useLogout();
  const router = useRouter();

  const { data: user, isLoading, error } = useUser();

  useEffect(() => {
    if (error) {
      toast({
        title: "An Error Occured",
        description: error.message,
      });
    }
  }, [error]);

  return (
    <div className="flex justify-between items-center bg-primary py-4 pr-4 pl-6 rounded-md">
      <div className="hidden min-[420px]:block">
        <Logo iconOnly={true} />
      </div>

      <Tabs />

      <div className="flex justify-between items-center gap-4">
        <AlertDialog>
          <AlertDialogTrigger className="text-center hover:text-primary-foreground active:text-primary-foreground text-secondary-foreground capitalize rounded-lg p-0 leading-2 text-md font-semibold border-none">
            <span className="flex justify-between items-center gap-1">
              <span className="sm:inline hidden">Logout</span>
              <LogOut />
            </span>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want you log out?
              </AlertDialogTitle>
              <AlertDialogDescription>
                You will have to log in again to gain access to the application
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isLoggingOut}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                disabled={isLoggingOut}
                onClick={async () => {
                  toast({
                    description: "Logging Out...",
                    duration: 2000,
                  });
                  await logoutUser();
                  router.replace("/login");
                }}
              >
                Log Out
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button
          onClick={() => router.push(`/preview/${user?.user?._id}`)}
          variant="secondary"
          disabled={!!isFetching || isLoading}
          Icon={Eye}
        >
          preview
        </Button>
      </div>
    </div>
  );
}

export default Header;
