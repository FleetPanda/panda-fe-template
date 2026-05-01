import { createUserInputSchema } from "@/modules/users/schema";
import { z } from "zod";

const formSchemaRegistry = {
  "users.create.input": createUserInputSchema,
} as const satisfies Record<string, z.ZodType<Record<string, unknown>>>;

export type FormSchemaKey = keyof typeof formSchemaRegistry;

export function getFormSchema(
  schemaKey: string,
): z.ZodType<Record<string, unknown>> {
  const schema = formSchemaRegistry[schemaKey as FormSchemaKey];

  if (!schema) {
    throw new Error(`Unknown schema key: ${schemaKey}`);
  }

  return schema;
}
