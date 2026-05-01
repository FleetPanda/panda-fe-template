import type { ComponentType } from "react";

import { ConfigFormScreen } from "@/components/renderers/config-form-screen";
import { ConfigListScreen } from "@/components/renderers/config-list-screen";
import type {
  FormScreenConfig,
  ListScreenConfig,
} from "@/engine/screen-config";

export const screenComponentRegistry = {
  form: ConfigFormScreen,
  list: ConfigListScreen,
} satisfies {
  form: ComponentType<{ config: FormScreenConfig }>;
  list: ComponentType<{ config: ListScreenConfig }>;
};
