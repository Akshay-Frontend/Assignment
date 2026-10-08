import styles from "./Checkbox.module.css";

export type CheckboxProps = {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  onBlur?: () => void;
  label: string;
  invalid?: boolean;
  describedBy?: string;
};

export function Checkbox(props: CheckboxProps) {
  const { id, checked, onChange, onBlur, label, invalid, describedBy } = props;

  const labelClasses = invalid ? `${styles.label} ${styles.invalid}` : styles.label;

  return (
    <label className={labelClasses} htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onChange={(e) => onChange(e.target.checked)}
        onBlur={onBlur}
        className={styles.input}
      />
      <span className={styles.box} aria-hidden="true">
        <span className={styles.tick} />
      </span>
      <span className={styles.text}>{label}</span>
    </label>
  );
}
