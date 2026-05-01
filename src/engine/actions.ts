import type { RegisteredAction } from "@/engine/types";
import { userActionDefinitions } from "@/modules/users/actions";

export const actionRegistry = {
  ...userActionDefinitions,
} as const;

export type ActionKey = keyof typeof actionRegistry;

export function getActionDefinition(
  actionKey: string,
): RegisteredAction<Record<string, unknown>, unknown> {
  const action = actionRegistry[actionKey as ActionKey];

  if (!action) {
    throw new Error(`Unknown action key: ${actionKey}`);
  }

  return action as unknown as RegisteredAction<
    Record<string, unknown>,
    unknown
  >;
}
