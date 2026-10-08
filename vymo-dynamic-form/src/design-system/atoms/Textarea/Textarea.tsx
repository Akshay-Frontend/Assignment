import styles from "./Textarea.module.css";

export type TextareaProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  /**
   * Accessible label for the control. Set this only when the atom is used
   * standalone; inside a Field molecule the <label htmlFor> element supplies
   * the name, so passing label here would duplicate (and override) it.
   */
  label?: string;
  placeholder?: string;
  invalid?: boolean;
  rows?: number;
  describedBy?: string;
};

export function Textarea(props: TextareaProps) {
  const {
    id,
    value,
    onChange,
    onBlur,
    label,
    placeholder,
    invalid,
    rows = 4,
    describedBy,
  } = props;

  const classes = invalid ? `${styles.textarea} ${styles.invalid}` : styles.textarea;

  return (
    <textarea
      id={id}
      value={value}
      rows={rows}
      placeholder={placeholder}
      aria-label={label}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      className={classes}
    />
  );
}
