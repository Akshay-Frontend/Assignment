import type {
  FieldConfig,
  FormErrors,
  FormValues,
  Validation,
} from "../../design-system/form";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function isVisible(field: FieldConfig, values: FormValues): boolean {
  if (!field.visibleWhen) return true;
  return values[field.visibleWhen.field] === field.visibleWhen.equals;
}

function checkValidation(
  validation: Validation,
  value: unknown,
): string | undefined {
  switch (validation.kind) {
    case "required": {
      if (value === undefined || value === null) return "This field is required.";
      if (typeof value === "string" && value.trim() === "") {
        return "This field is required.";
      }
      if (typeof value === "boolean" && value === false) {
        return "This field is required.";
      }
      return undefined;
    }
    case "email": {
      const text = asString(value).trim();
      if (text === "") return undefined;
      return EMAIL_REGEX.test(text) ? undefined : "Enter a valid email address.";
    }
    case "exactDigits": {
      const text = asString(value);
      if (text === "") return undefined;
      if (!/^\d+$/.test(text)) {
        return `Enter ${validation.count} digits, numbers only.`;
      }
      if (text.length !== validation.count) {
        return `Enter exactly ${validation.count} digits.`;
      }
      return undefined;
    }
    case "maxLength": {
      const text = asString(value);
      if (text.length > validation.max) {
        return `Keep this under ${validation.max} characters (currently ${text.length}).`;
      }
      return undefined;
    }
  }
}

export function validateLead(
  config: FieldConfig[],
  values: FormValues,
): FormErrors {
  const errors: FormErrors = {};
  for (const field of config) {
    if (!isVisible(field, values)) continue;
    const validations = field.validations ?? [];
    for (const validation of validations) {
      const err = checkValidation(validation, values[field.name]);
      if (err) {
        errors[field.name] = err;
        break;
      }
    }
  }
  return errors;
}
