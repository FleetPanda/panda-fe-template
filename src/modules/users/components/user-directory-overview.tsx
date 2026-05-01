"use client";

import { UserStatGrid } from "@/modules/users/components/user-stat-grid";
import { useUserDirectoryOverview } from "@/modules/users/hooks";

export function UserDirectoryOverview() {
  const { metrics } = useUserDirectoryOverview();

  return <UserStatGrid metrics={metrics} />;
}
