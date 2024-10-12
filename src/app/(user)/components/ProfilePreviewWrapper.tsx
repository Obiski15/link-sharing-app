import { useLinks } from "../useLinks";
import { useUser } from "../useUser";

import ProfilePreview from "@/components/ProfilePreview";

function ProfilePreviewWrapper() {
  "use client";
  const {
    data: links = {},
    isLoading: isLoadingLinks,
    error: linksError,
  } = useLinks();
  const { data: user, isLoading: isLoadingUser, error: userError } = useUser();

  return (
    <ProfilePreview
      user={user?.user}
      links={links?.data?.links}
      isLoading={{ isLoadingUser, isLoadingLinks }}
      error={{ userError, linksError }}
    />
  );
}

export default ProfilePreviewWrapper;
