"use client";

import { EngineTable, EngineTableProvider } from "@fleetpanda/engines/table";

import { usersEngineTable } from "@/modules/users/engine-table.config";

export function UserEngineTable() {
  return (
    <EngineTableProvider id={usersEngineTable.id}>
      <EngineTable config={usersEngineTable} />
    </EngineTableProvider>
  );
}
