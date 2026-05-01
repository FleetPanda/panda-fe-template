"use client";

import { Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useConfiguredFormScreen } from "@/engine/hooks";
import type { FormScreenConfig } from "@/engine/screen-config";

type ConfigFormScreenProps = {
  config: FormScreenConfig;
};

function getErrorMessage(error: unknown): string | undefined {
  if (!error || typeof error !== "object" || !("message" in error)) {
    return undefined;
  }

  return typeof error.message === "string" ? error.message : undefined;
}

export function ConfigFormScreen({ config }: ConfigFormScreenProps) {
  const { form, fields, submit, isSubmitting, errorMessage } =
    useConfiguredFormScreen(config);

  return (
    <Card className="border-border/70 bg-background/85 shadow-lg shadow-black/5 backdrop-blur">
      <CardHeader>
        <CardTitle>{config.title}</CardTitle>
        <CardDescription>{config.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-6" onSubmit={submit}>
          <FieldGroup>
            {fields.map((field) => {
              const error = form.formState.errors[field.name];
              const message = getErrorMessage(error);
              const isInvalid = Boolean(message);

              return (
                <Field
                  key={field.name}
                  data-invalid={isInvalid}
                  orientation="vertical"
                >
                  <FieldLabel htmlFor={field.name}>{field.label}</FieldLabel>
                  <FieldContent>
                    {field.type === "textarea" ? (
                      <Textarea
                        id={field.name}
                        aria-invalid={isInvalid}
                        placeholder={field.placeholder}
                        {...form.register(field.name)}
                      />
                    ) : null}
                    {field.type === "select" ? (
                      <Controller
                        control={form.control}
                        name={field.name}
                        render={({ field: controlledField }) => (
                          <Select
                            value={
                              typeof controlledField.value === "string"
                                ? controlledField.value
                                : undefined
                            }
                            onValueChange={controlledField.onChange}
                          >
                            <SelectTrigger
                              id={field.name}
                              aria-invalid={isInvalid}
                            >
                              <SelectValue
                                placeholder={
                                  field.placeholder ??
                                  `Select ${field.label.toLowerCase()}`
                                }
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {field.options?.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    ) : null}
                    {field.type === "text" || field.type === "email" ? (
                      <Input
                        id={field.name}
                        aria-invalid={isInvalid}
                        placeholder={field.placeholder}
                        type={field.type}
                        {...form.register(field.name)}
                      />
                    ) : null}
                    {field.description ? (
                      <FieldDescription>{field.description}</FieldDescription>
                    ) : null}
                    <FieldError errors={message ? [{ message }] : undefined} />
                  </FieldContent>
                </Field>
              );
            })}
          </FieldGroup>
          {errorMessage ? <FieldError>{errorMessage}</FieldError> : null}
          <CardFooter className="px-0 pb-0">
            <Button disabled={isSubmitting} type="submit">
              {config.submitLabel}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
