import type { SelectOption } from "../atoms/Select";

export type FieldType = "text" | "email" | "select" | "textarea" | "checkbox";

export type Validation =
  | { kind: "required" }
  | { kind: "email" }
  | { kind: "exactDigits"; count: number }
  | { kind: "maxLength"; max: number };

export type VisibleWhen = {
  field: string;
  equals: unknown;
};

export type FieldConfig = {
  name: string;
  type: FieldType;
  label: string;
  hint?: string;
  placeholder?: string;
  options?: SelectOption[];
  validations?: Validation[];
  visibleWhen?: VisibleWhen;
  fullWidth?: boolean;
};

export type FormValues = Record<string, unknown>;
export type FormErrors = Record<string, string | undefined>;
export type Validator = (config: FieldConfig[], values: FormValues) => FormErrors;
