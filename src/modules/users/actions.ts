import type { RegisteredAction } from "@/engine/types";
import { createUser, listUsers } from "@/modules/users/api";
import { usersContract } from "@/modules/users/contract";
import {
  createUserInputSchema,
  createUserResponseSchema,
  type CreateUserInput,
  type CreateUserResponse,
  userListQuerySchema,
  userListResponseSchema,
  type UserListQuery,
  type UserListResponse,
} from "@/modules/users/schema";

export function normalizeCreateUserInput(
  input: CreateUserInput,
): CreateUserInput {
  return createUserInputSchema.parse({
    ...input,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    bio: input.bio.trim(),
  });
}

export async function listUsersAction(
  input: UserListQuery,
): Promise<UserListResponse> {
  const validatedInput = userListQuerySchema.parse(input);
  const response = await listUsers(validatedInput);

  return {
    ...response,
    items: [...response.items].sort((left, right) =>
      left.name.localeCompare(right.name),
    ),
  };
}

export async function createUserAction(
  input: CreateUserInput,
): Promise<CreateUserResponse> {
  const normalizedInput = normalizeCreateUserInput(input);

  return createUser(normalizedInput);
}

export const userActionDefinitions = {
  [usersContract.actions.list.key]: {
    key: usersContract.actions.list.key,
    kind: "query",
    description: usersContract.actions.list.description,
    inputSchema: userListQuerySchema,
    outputSchema: userListResponseSchema,
    execute: listUsersAction,
  } satisfies RegisteredAction<UserListQuery, UserListResponse>,
  [usersContract.actions.create.key]: {
    key: usersContract.actions.create.key,
    kind: "mutation",
    description: usersContract.actions.create.description,
    inputSchema: createUserInputSchema,
    outputSchema: createUserResponseSchema,
    execute: createUserAction,
  } satisfies RegisteredAction<CreateUserInput, CreateUserResponse>,
};
