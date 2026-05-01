type ScaffoldFile = {
  path: string;
  responsibility: string;
};

export type ModuleScaffoldPlan = {
  moduleName: string;
  files: ScaffoldFile[];
};

export function generateModuleScaffold(moduleName: string): ModuleScaffoldPlan {
  const normalizedName = moduleName.trim().toLowerCase();
  const basePath = `src/modules/${normalizedName}`;

  return {
    moduleName: normalizedName,
    files: [
      {
        path: `${basePath}/schema.ts`,
        responsibility: "Zod schemas and inferred types",
      },
      {
        path: `${basePath}/contract.ts`,
        responsibility: "Endpoint and action metadata",
      },
      {
        path: `${basePath}/api.ts`,
        responsibility: "Raw API calls through the shared api client",
      },
      {
        path: `${basePath}/actions.ts`,
        responsibility: "Business logic and action definitions",
      },
      {
        path: `${basePath}/hooks.ts`,
        responsibility: "React Query and form orchestration hooks",
      },
      {
        path: `${basePath}/config.ts`,
        responsibility: "Declarative screen config for future renderers",
      },
      {
        path: `${basePath}/components`,
        responsibility: "Pure presentation components scoped to the module",
      },
    ],
  };
}
