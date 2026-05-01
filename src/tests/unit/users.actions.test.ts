import { beforeEach, describe, expect, it, vi } from "vitest";

import { createUserAction, listUsersAction } from "@/modules/users/actions";
import { createUser, listUsers } from "@/modules/users/api";

vi.mock("@/modules/users/api", () => ({
  createUser: vi.fn(),
  listUsers: vi.fn(),
}));

describe("users actions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("normalizes create user input before sending it to the API layer", async () => {
    vi.mocked(createUser).mockResolvedValue({
      item: {
        id: "21d25f1a-2d5e-4b0e-9f04-b1d0b14d4c5d",
        name: "Ada Lovelace",
        email: "ada@example.com",
        role: "editor",
        status: "active",
        bio: "Builds analytical workflows.",
        createdAt: "2026-04-01T12:30:00.000Z",
      },
      message: "User created successfully.",
    });

    await createUserAction({
      name: "  Ada Lovelace  ",
      email: " ADA@EXAMPLE.COM ",
      role: "editor",
      bio: "  Builds analytical workflows.  ",
    });

    expect(createUser).toHaveBeenCalledWith({
      name: "Ada Lovelace",
      email: "ada@example.com",
      role: "editor",
      bio: "Builds analytical workflows.",
    });
  });

  it("sorts directory results alphabetically for predictable UI output", async () => {
    vi.mocked(listUsers).mockResolvedValue({
      items: [
        {
          id: "27fb7da6-ab80-4cd9-bca9-44079cb9553f",
          name: "Zuri West",
          email: "zuri@example.com",
          role: "viewer",
          status: "invited",
          bio: "",
          createdAt: "2026-04-02T12:30:00.000Z",
        },
        {
          id: "c7e98503-83aa-40b6-a1e4-ed7d92a8f951",
          name: "Amir Cole",
          email: "amir@example.com",
          role: "admin",
          status: "active",
          bio: "",
          createdAt: "2026-04-03T12:30:00.000Z",
        },
      ],
      total: 2,
    });

    const result = await listUsersAction({ search: "" });

    expect(result.items.map((item) => item.name)).toEqual([
      "Amir Cole",
      "Zuri West",
    ]);
  });
});
