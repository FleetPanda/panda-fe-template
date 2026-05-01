import { Badge } from "@/components/ui/badge";

type UserRoleBadgeProps = {
  role: "admin" | "editor" | "viewer";
};

const roleLabels: Record<UserRoleBadgeProps["role"], string> = {
  admin: "Admin",
  editor: "Editor",
  viewer: "Viewer",
};

export function UserRoleBadge({ role }: UserRoleBadgeProps) {
  return <Badge variant="secondary">{roleLabels[role]}</Badge>;
}
