"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { type FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

import { generateFormConfigFromSchema } from "@/ai/generators/form-config-generator";
import { getActionDefinition } from "@/engine/actions";
import type {
  FormScreenConfig,
  ListScreenConfig,
} from "@/engine/screen-config";
import { getFormSchema } from "@/engine/schema-registry";
import { listActionResultSchema } from "@/engine/types";
import { useAppStore } from "@/store/app-store";

export function useConfiguredListScreen(config: ListScreenConfig) {
  const action = getActionDefinition(config.action);
  const setActiveScreenId = useAppStore((state) => state.setActiveScreenId);

  return useQuery({
    queryKey: ["action", action.key, config.queryInput],
    queryFn: async () => {
      setActiveScreenId(config.id);

      if (action.kind !== "query") {
        throw new Error(
          `Screen ${config.id} expected a query action but received ${action.kind}.`,
        );
      }

      const result = await action.execute(config.queryInput);
      return listActionResultSchema.parse(result);
    },
  });
}

export function useConfiguredFormScreen(config: FormScreenConfig) {
  const action = getActionDefinition(config.action);
  const schema = getFormSchema(config.schemaKey);
  const resolverSchema = schema as Parameters<typeof zodResolver>[0];
  const queryClient = useQueryClient();
  const setActiveScreenId = useAppStore((state) => state.setActiveScreenId);
  const setLastCompletedActionKey = useAppStore(
    (state) => state.setLastCompletedActionKey,
  );
  const form = useForm<FieldValues, undefined, unknown>({
    resolver: zodResolver(resolverSchema),
    defaultValues: config.defaultValues,
  });
  const fields = useMemo(
    () => config.fields ?? generateFormConfigFromSchema(schema),
    [config.fields, schema],
  );
  const mutation = useMutation({
    mutationKey: [action.key],
    mutationFn: async (values: FieldValues) => {
      setActiveScreenId(config.id);

      if (action.kind !== "mutation") {
        throw new Error(
          `Screen ${config.id} expected a mutation action but received ${action.kind}.`,
        );
      }

      return action.execute(values);
    },
    onSuccess: async () => {
      setLastCompletedActionKey(action.key);
      form.reset(config.defaultValues);

      await Promise.all(
        config.invalidateActions.map((actionKey) =>
          queryClient.invalidateQueries({
            queryKey: ["action", actionKey],
          }),
        ),
      );

      toast.success(config.successMessage ?? "Action completed successfully.");
    },
    onError: (error) => {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to complete the action.";
      toast.error(message);
    },
  });

  const submit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values as FieldValues);
  });

  return {
    form,
    fields,
    submit,
    isSubmitting: mutation.isPending,
    errorMessage:
      mutation.error instanceof Error ? mutation.error.message : null,
  };
}
