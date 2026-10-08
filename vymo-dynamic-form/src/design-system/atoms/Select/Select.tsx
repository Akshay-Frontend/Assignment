import styles from "./Select.module.css";

export type SelectOption = {
  label: string;
  value: string;
};

export type SelectProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  label?: string;
  options: SelectOption[];
  placeholder?: string;
  invalid?: boolean;
  describedBy?: string;
};

export function Select(props: SelectProps) {
  const {
    id,
    value,
    onChange,
    onBlur,
    label,
    options,
    placeholder = "Select an option",
    invalid,
    describedBy,
  } = props;

  const classes = invalid ? `${styles.select} ${styles.invalid}` : styles.select;

  return (
    <div className={styles.wrap}>
      <select
        id={id}
        value={value}
        aria-label={label}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={classes}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <span className={styles.caret} aria-hidden="true" />
    </div>
  );
}
