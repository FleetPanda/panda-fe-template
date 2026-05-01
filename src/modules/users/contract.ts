export const usersContract = {
  entity: "user",
  endpoints: {
    list: {
      method: "GET",
      path: "/api/users",
    },
    create: {
      method: "POST",
      path: "/api/users",
    },
  },
  actions: {
    list: {
      key: "users.list",
      description: "Fetch the user directory for list screens and dashboards.",
    },
    create: {
      key: "users.create",
      description:
        "Create a user record from a validated config-driven form submission.",
    },
  },
  schemas: {
    createInput: "users.create.input",
  },
} as const;
