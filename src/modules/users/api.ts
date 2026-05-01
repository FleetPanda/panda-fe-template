import { apiClient } from "@/lib/api-client";
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

export function listUsers(query: UserListQuery): Promise<UserListResponse> {
  return apiClient.get({
    path: usersContract.endpoints.list.path,
    input: query,
    inputSchema: userListQuerySchema,
    responseSchema: userListResponseSchema,
  });
}

export function createUser(
  input: CreateUserInput,
): Promise<CreateUserResponse> {
  return apiClient.post({
    path: usersContract.endpoints.create.path,
    input,
    inputSchema: createUserInputSchema,
    responseSchema: createUserResponseSchema,
  });
}
