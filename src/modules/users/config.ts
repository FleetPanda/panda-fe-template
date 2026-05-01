import { screenGroupConfigSchema } from "@/engine/screen-config";
import { usersContract } from "@/modules/users/contract";

export const userManagementScreenConfig = screenGroupConfigSchema.parse({
  id: "user-management",
  title: "User orchestration",
  description:
    "A config-driven example that renders a live directory list and a schema-backed create form from explicit contracts.",
  screens: [
    {
      id: "user-directory-list",
      type: "list",
      title: "User directory",
      description:
        "Server state is loaded through the action registry and rendered by declarative columns.",
      action: usersContract.actions.list.key,
      queryInput: {
        search: "",
      },
      columns: [
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "role", label: "Role", renderAs: "badge" },
        { key: "status", label: "Status", renderAs: "badge" },
        { key: "createdAt", label: "Created", renderAs: "date" },
      ],
      emptyTitle: "No users yet",
      emptyDescription:
        "Submit the create form to seed the directory through the same action registry used elsewhere.",
    },
    {
      id: "user-create-form",
      type: "form",
      title: "Create user",
      description:
        "The form fields are generated from the module schema unless config overrides them.",
      schemaKey: usersContract.schemas.createInput,
      action: usersContract.actions.create.key,
      submitLabel: "Create user",
      successMessage: "User created successfully.",
      invalidateActions: [usersContract.actions.list.key],
      defaultValues: {
        name: "",
        email: "",
        role: "viewer",
        bio: "",
      },
    },
  ],
});
