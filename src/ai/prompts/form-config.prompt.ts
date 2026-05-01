import type { FormFieldConfig } from "@/engine/screen-config";

type BuildFormConfigPromptInput = {
  moduleName: string;
  schemaKey: string;
  actionKey: string;
  fields: FormFieldConfig[];
};

export function buildFormConfigPrompt({
  moduleName,
  schemaKey,
  actionKey,
  fields,
}: BuildFormConfigPromptInput): string {
  return [
    "Generate a JSON form config for the frontend template.",
    `Module: ${moduleName}`,
    `Schema key: ${schemaKey}`,
    `Action key: ${actionKey}`,
    "Constraints:",
    "- Output JSON only.",
    "- Keep labels clear and explicit.",
    "- Use the provided field names without renaming them.",
    "- Prefer discoverable descriptions over clever copy.",
    `Fields: ${JSON.stringify(fields)}`,
  ].join("\n");
}
