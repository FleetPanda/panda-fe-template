import { generateModuleScaffold } from "@/ai/generators/module-scaffold-generator";

export function buildModuleScaffoldPrompt(moduleName: string): string {
  const scaffold = generateModuleScaffold(moduleName);

  return [
    "Generate code for a new module in the frontend template.",
    `Module: ${scaffold.moduleName}`,
    "Required files and responsibilities:",
    ...scaffold.files.map((file) => `- ${file.path}: ${file.responsibility}`),
    "Rules:",
    "- Keep UI free of business logic.",
    "- Register all actions in src/engine/actions.ts.",
    "- Use Zod schemas as the single source of truth.",
  ].join("\n");
}
