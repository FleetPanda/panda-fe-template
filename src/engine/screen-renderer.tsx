import { screenComponentRegistry } from "@/engine/component-registry";
import type { ScreenConfig } from "@/engine/screen-config";

type ScreenRendererProps = {
  config: ScreenConfig;
};

export function ScreenRenderer({ config }: ScreenRendererProps) {
  if (config.type === "form") {
    const FormComponent = screenComponentRegistry.form;

    return <FormComponent config={config} />;
  }

  const ListComponent = screenComponentRegistry.list;

  return <ListComponent config={config} />;
}
