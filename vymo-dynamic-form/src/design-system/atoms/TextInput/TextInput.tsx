import styles from "./TextInput.module.css";

export type TextInputProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  label?: string;
  type?: "text" | "email" | "tel";
  placeholder?: string;
  invalid?: boolean;
  autoComplete?: string;
  inputMode?: "text" | "email" | "numeric" | "tel";
  describedBy?: string;
};

export function TextInput(props: TextInputProps) {
  const {
    id,
    value,
    onChange,
    onBlur,
    label,
    type = "text",
    placeholder,
    invalid,
    autoComplete,
    inputMode,
    describedBy,
  } = props;

  const classes = invalid ? `${styles.input} ${styles.invalid}` : styles.input;

  return (
    <input
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      autoComplete={autoComplete}
      inputMode={inputMode}
      aria-label={label}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      className={classes}
    />
  );
}
