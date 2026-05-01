import { z } from "zod";

export const userRoleSchema = z.enum(["admin", "editor", "viewer"]);
export const userStatusSchema = z.enum(["active", "invited"]);

export const userRecordSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  role: userRoleSchema,
  status: userStatusSchema,
  bio: z.string().max(280).default(""),
  createdAt: z.string().datetime(),
});

export const userListQuerySchema = z.object({
  search: z.string().trim().default(""),
});

export const userListResponseSchema = z.object({
  items: z.array(userRecordSchema),
  total: z.number().int().nonnegative(),
});

export const createUserInputSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  role: userRoleSchema.default("viewer"),
  bio: z.string().trim().max(280).default(""),
});

export const createUserResponseSchema = z.object({
  item: userRecordSchema,
  message: z.string().min(1),
});

export type UserRecord = z.infer<typeof userRecordSchema>;
export type UserListQuery = z.infer<typeof userListQuerySchema>;
export type UserListResponse = z.infer<typeof userListResponseSchema>;
export type CreateUserInput = z.infer<typeof createUserInputSchema>;
export type CreateUserResponse = z.infer<typeof createUserResponseSchema>;
