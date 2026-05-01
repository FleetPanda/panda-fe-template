"use client";

import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store/app-store";

export function ShellTelemetry() {
  const activeScreenId = useAppStore((state) => state.activeScreenId);
  const lastCompletedActionKey = useAppStore(
    (state) => state.lastCompletedActionKey,
  );

  return (
    <div className="flex flex-wrap gap-3">
      <Badge variant="outline">Active screen: {activeScreenId ?? "idle"}</Badge>
      <Badge variant="outline">
        Last action: {lastCompletedActionKey ?? "none"}
      </Badge>
    </div>
  );
}
