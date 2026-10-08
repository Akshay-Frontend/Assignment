import { useMemo, useState } from "react";
import type { FormEvent } from "react";

import { Button } from "../atoms/Button";
import { Checkbox } from "../atoms/Checkbox";
import { Select } from "../atoms/Select";
import { TextInput } from "../atoms/TextInput";
import { Textarea } from "../atoms/Textarea";
import { Field } from "../molecules/Field";
import type { FieldConfig, FormValues, Validator } from "./types";

export type DynamicFormProps = {
  config: FieldConfig[];
  initialValues: FormValues;
  validate: Validator;
  onSubmit: (values: FormValues) => void;
  submitLabel?: string;
  className?: string;
};

export function DynamicForm(props: DynamicFormProps) {
  const {
    config,
    initialValues,
    validate,
    onSubmit,
    submitLabel = "Submit",
    className,
  } = props;

  const [values, setValues] = useState<FormValues>(initialValues);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const errors = useMemo(
    () => validate(config, values),
    [config, values, validate],
  );
  const hasErrors = Object.values(errors).some(Boolean);

  const setValue = (name: string, value: unknown) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };
  const markTouched = (name: string) => {
    setTouched((prev) => (prev[name] ? prev : { ...prev, [name]: true }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitAttempted(true);
    if (hasErrors) return;
    onSubmit(values);
  };

  return (
    <form noValidate className={className} onSubmit={handleSubmit}>
      {config.map((field) => {
        if (!isVisible(field, values)) return null;

        const err = errors[field.name];
        const shouldShowError =
          Boolean(err) && (touched[field.name] === true || submitAttempted);
        const hintId = field.hint ? `${field.name}-hint` : undefined;
        const errorId = shouldShowError ? `${field.name}-error` : undefined;
        const describedByParts = [hintId, errorId].filter(
          (x): x is string => Boolean(x),
        );
        const describedBy =
          describedByParts.length > 0 ? describedByParts.join(" ") : undefined;
        const required = hasValidation(field, "required");

        return (
          <div
            key={field.name}
            data-field-wrap=""
            data-field-name={field.name}
            data-full-width={field.fullWidth ? "true" : undefined}
          >
            <Field
              id={field.name}
              label={field.label}
              hint={field.hint}
              hintId={hintId}
              error={shouldShowError ? err : undefined}
              errorId={errorId}
              required={required}
              inlineLabel={field.type === "checkbox"}
            >
              {renderControl({
                field,
                values,
                setValue,
                onBlur: () => markTouched(field.name),
                invalid: shouldShowError,
                describedBy,
              })}
            </Field>
          </div>
        );
      })}
      <div data-submit-row="">
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}

function isVisible(field: FieldConfig, values: FormValues): boolean {
  if (!field.visibleWhen) return true;
  return values[field.visibleWhen.field] === field.visibleWhen.equals;
}

function hasValidation(field: FieldConfig, kind: string): boolean {
  return (field.validations ?? []).some((v) => v.kind === kind);
}

function asString(v: unknown): string {
  return typeof v === "string" ? v : "";
}

function asBool(v: unknown): boolean {
  return v === true;
}

type RenderArgs = {
  field: FieldConfig;
  values: FormValues;
  setValue: (name: string, value: unknown) => void;
  onBlur: () => void;
  invalid: boolean;
  describedBy: string | undefined;
};

function renderControl(args: RenderArgs) {
  const { field, values, setValue, onBlur, invalid, describedBy } = args;

  switch (field.type) {
    case "text":
      return (
        <TextInput
          id={field.name}
          type="text"
          value={asString(values[field.name])}
          onChange={(v) => setValue(field.name, v)}
          onBlur={onBlur}
          placeholder={field.placeholder}
          invalid={invalid}
          describedBy={describedBy}
        />
      );
    case "email":
      return (
        <TextInput
          id={field.name}
          type="email"
          inputMode="email"
          value={asString(values[field.name])}
          onChange={(v) => setValue(field.name, v)}
          onBlur={onBlur}
          placeholder={field.placeholder}
          invalid={invalid}
          describedBy={describedBy}
          autoComplete="email"
        />
      );
    case "textarea":
      return (
        <Textarea
          id={field.name}
          value={asString(values[field.name])}
          onChange={(v) => setValue(field.name, v)}
          onBlur={onBlur}
          placeholder={field.placeholder}
          invalid={invalid}
          describedBy={describedBy}
        />
      );
    case "select":
      return (
        <Select
          id={field.name}
          value={asString(values[field.name])}
          onChange={(v) => setValue(field.name, v)}
          onBlur={onBlur}
          options={field.options ?? []}
          placeholder={field.placeholder}
          invalid={invalid}
          describedBy={describedBy}
        />
      );
    case "checkbox":
      return (
        <Checkbox
          id={field.name}
          checked={asBool(values[field.name])}
          onChange={(v) => setValue(field.name, v)}
          onBlur={onBlur}
          label={field.label}
          invalid={invalid}
          describedBy={describedBy}
        />
      );
  }
}
