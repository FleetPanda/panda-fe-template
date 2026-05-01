import { z } from "zod";

export type ActionKind = "query" | "mutation";

export type RegisteredAction<
  TInput extends Record<string, unknown>,
  TOutput,
> = {
  key: string;
  kind: ActionKind;
  description: string;
  inputSchema: z.ZodType<TInput>;
  outputSchema: z.ZodType<TOutput>;
  execute: (input: TInput) => Promise<TOutput>;
};

export type ActionRegistry = Record<
  string,
  RegisteredAction<Record<string, unknown>, unknown>
>;

export const listActionResultSchema = z.object({
  items: z.array(z.record(z.string(), z.unknown())),
  total: z.number().int().nonnegative(),
});

export type ListActionResult = z.infer<typeof listActionResultSchema>;
