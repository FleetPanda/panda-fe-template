import {
  type CreateUserInput,
  type UserListQuery,
  type UserRecord,
  userRecordSchema,
} from "@/modules/users/schema";

const initialUsers: UserRecord[] = [
  userRecordSchema.parse({
    id: "dfe1bb84-7f03-4c2f-a71c-4f9c4670f4f1",
    name: "Ava Thompson",
    email: "ava@orbitsystems.dev",
    role: "admin",
    status: "active",
    bio: "Shapes platform conventions, access controls, and release guardrails.",
    createdAt: "2026-01-12T09:15:00.000Z",
  }),
  userRecordSchema.parse({
    id: "b9b8d6a2-22ff-41ec-b8fb-1e4b61ef7a48",
    name: "Leo Kim",
    email: "leo@orbitsystems.dev",
    role: "editor",
    status: "active",
    bio: "Owns editorial workflows and config-driven content operations.",
    createdAt: "2026-02-06T14:45:00.000Z",
  }),
  userRecordSchema.parse({
    id: "5a0be27e-0351-4f53-8ba5-60e7643bcf2d",
    name: "Mila Ortiz",
    email: "mila@orbitsystems.dev",
    role: "viewer",
    status: "invited",
    bio: "Joins new product spaces and validates onboarding assumptions.",
    createdAt: "2026-03-18T11:20:00.000Z",
  }),
];

declare global {
  var __templateUsers__: UserRecord[] | undefined;
}

function getStore(): UserRecord[] {
  if (!globalThis.__templateUsers__) {
    globalThis.__templateUsers__ = [...initialUsers];
  }

  return globalThis.__templateUsers__;
}

export function listUsersFromStore(query: UserListQuery): UserRecord[] {
  const normalizedSearch = query.search.trim().toLowerCase();

  return getStore().filter((user) => {
    if (!normalizedSearch) {
      return true;
    }

    return [user.name, user.email, user.role, user.status]
      .join(" ")
      .toLowerCase()
      .includes(normalizedSearch);
  });
}

export function createUserInStore(input: CreateUserInput): UserRecord {
  const nextUser = userRecordSchema.parse({
    id: crypto.randomUUID(),
    name: input.name,
    email: input.email,
    role: input.role,
    status: "active",
    bio: input.bio,
    createdAt: new Date().toISOString(),
  });

  const store = getStore();
  store.unshift(nextUser);

  return nextUser;
}
