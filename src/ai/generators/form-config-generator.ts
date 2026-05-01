import { z } from "zod";

import type { FormFieldConfig } from "@/engine/screen-config";

function prettifyLabel(input: string): string {
  return input
    .replace(/([A-Z])/g, " $1")
    .replace(/[-_]/g, " ")
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function unwrapSchema(schema: z.ZodType<unknown>): z.ZodType<unknown> {
  if (
    schema instanceof z.ZodOptional ||
    schema instanceof z.ZodNullable ||
    schema instanceof z.ZodDefault
  ) {
    return unwrapSchema(schema.unwrap() as z.ZodType<unknown>);
  }

  return schema;
}

function inferFieldType(
  name: string,
  schema: z.ZodType<unknown>,
): FormFieldConfig["type"] {
  const normalizedName = name.toLowerCase();
  const baseSchema = unwrapSchema(schema);

  if (baseSchema instanceof z.ZodEnum) {
    return "select";
  }

  if (
    normalizedName.includes("bio") ||
    normalizedName.includes("description")
  ) {
    return "textarea";
  }

  if (normalizedName.includes("email")) {
    return "email";
  }

  return "text";
}

function buildOptions(schema: z.ZodType<unknown>): FormFieldConfig["options"] {
  const baseSchema = unwrapSchema(schema);

  if (baseSchema instanceof z.ZodEnum) {
    return baseSchema.options.map((option) => ({
      label: prettifyLabel(String(option)),
      value: String(option),
    }));
  }

  return undefined;
}

export function generateFormConfigFromSchema(
  schema: z.ZodType<Record<string, unknown>>,
): FormFieldConfig[] {
  if (!(schema instanceof z.ZodObject)) {
    throw new Error("Form config generation only supports object schemas.");
  }

  const shape = schema.shape as Record<string, z.ZodType<unknown>>;

  return Object.entries(shape).map(([name, fieldSchema]) => {
    const type = inferFieldType(name, fieldSchema);

    return {
      name,
      label: prettifyLabel(name),
      description:
        type === "select"
          ? `Choose a ${prettifyLabel(name).toLowerCase()} option defined by the module schema.`
          : `Provide the ${prettifyLabel(name).toLowerCase()} value required by the module contract.`,
      placeholder:
        type === "select"
          ? undefined
          : `Enter ${prettifyLabel(name).toLowerCase()}`,
      type,
      options: buildOptions(fieldSchema),
    };
  });
}
