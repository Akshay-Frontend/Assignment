import type { ReactNode } from "react";

import styles from "./Field.module.css";

export type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  hintId?: string;
  error?: string;
  errorId?: string;
  required?: boolean;
  inlineLabel?: boolean;
  children: ReactNode;
};

export function Field(props: FieldProps) {
  const {
    id,
    label,
    hint,
    hintId,
    error,
    errorId,
    required,
    inlineLabel,
    children,
  } = props;

  return (
    <div className={styles.field}>
      {!inlineLabel && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && (
            <span className={styles.required} aria-hidden="true">
              {" *"}
            </span>
          )}
        </label>
      )}
      <div className={styles.control}>{children}</div>
      {hint && !error && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
