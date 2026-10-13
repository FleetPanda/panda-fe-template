import { col, createTable } from "@fleetpanda/engines/table";

import type { UserRecord } from "@/modules/users/schema";

export const usersEngineTable = createTable<UserRecord>({
  id: "users",
  api: {
    type: "get-list",
    endpoint: "/api/users",
  },
  features: {
    search: true,
    sorting: true,
    pagination: true,
    columnVisibility: true,
    export: true,
  },
  columns: [
    col.text("name", { header: "Name", size: 200, sortable: true }),
    col.text("email", { header: "Email", size: 240 }),
    col.text("role", { header: "Role", size: 100 }),
    col.text("status", { header: "Status", size: 100 }),
    col.text("createdAt", { header: "Created", size: 160, sortable: true }),
  ],
});
