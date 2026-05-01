import { z } from "zod";

export const formFieldOptionSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

export const formFieldConfigSchema = z.object({
  name: z.string().min(1),
  label: z.string().min(1),
  description: z.string().optional(),
  placeholder: z.string().optional(),
  type: z.enum(["text", "email", "textarea", "select"]),
  options: z.array(formFieldOptionSchema).optional(),
});

export const formScreenConfigSchema = z.object({
  id: z.string().min(1),
  type: z.literal("form"),
  title: z.string().min(1),
  description: z.string().min(1),
  schemaKey: z.string().min(1),
  action: z.string().min(1),
  submitLabel: z.string().min(1),
  successMessage: z.string().min(1).optional(),
  invalidateActions: z.array(z.string().min(1)).default([]),
  defaultValues: z.record(z.string(), z.unknown()).default({}),
  fields: z.array(formFieldConfigSchema).optional(),
});

export const listColumnConfigSchema = z.object({
  key: z.string().min(1),
  label: z.string().min(1),
  renderAs: z.enum(["text", "badge", "date"]).default("text"),
  emptyValue: z.string().default("—"),
});

export const listScreenConfigSchema = z.object({
  id: z.string().min(1),
  type: z.literal("list"),
  title: z.string().min(1),
  description: z.string().min(1),
  action: z.string().min(1),
  queryInput: z.record(z.string(), z.unknown()).default({}),
  columns: z.array(listColumnConfigSchema).min(1),
  emptyTitle: z.string().min(1),
  emptyDescription: z.string().min(1),
});

export const screenConfigSchema = z.discriminatedUnion("type", [
  formScreenConfigSchema,
  listScreenConfigSchema,
]);

export const screenGroupConfigSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  screens: z.array(screenConfigSchema).min(1),
});

export type FormFieldConfig = z.infer<typeof formFieldConfigSchema>;
export type FormScreenConfig = z.infer<typeof formScreenConfigSchema>;
export type ListColumnConfig = z.infer<typeof listColumnConfigSchema>;
export type ListScreenConfig = z.infer<typeof listScreenConfigSchema>;
export type ScreenConfig = z.infer<typeof screenConfigSchema>;
export type ScreenGroupConfig = z.infer<typeof screenGroupConfigSchema>;
