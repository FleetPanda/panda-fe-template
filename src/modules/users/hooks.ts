"use client";

import { useQuery } from "@tanstack/react-query";

import { usersContract } from "@/modules/users/contract";
import { listUsersAction } from "@/modules/users/actions";
import {
  type UserListQuery,
  userListQuerySchema,
} from "@/modules/users/schema";

export function useUsersQuery(query: Partial<UserListQuery> = {}) {
  const validatedQuery = userListQuerySchema.parse(query);

  return useQuery({
    queryKey: ["action", usersContract.actions.list.key, validatedQuery],
    queryFn: () => listUsersAction(validatedQuery),
  });
}

export function useUserDirectoryOverview() {
  const usersQuery = useUsersQuery();
  const items = usersQuery.data?.items ?? [];

  return {
    ...usersQuery,
    metrics: {
      totalUsers: items.length,
      activeUsers: items.filter((item) => item.status === "active").length,
      admins: items.filter((item) => item.role === "admin").length,
      invitedUsers: items.filter((item) => item.status === "invited").length,
    },
  };
}
