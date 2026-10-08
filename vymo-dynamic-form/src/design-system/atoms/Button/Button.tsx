import type { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./Button.module.css";

export type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "type">;

export function Button(props: ButtonProps) {
  const { children, variant = "primary", type = "button", className, ...rest } = props;

  const base = variant === "primary" ? styles.primary : styles.secondary;
  const merged = className ? `${styles.button} ${base} ${className}` : `${styles.button} ${base}`;

  return (
    <button type={type} className={merged} {...rest}>
      {children}
    </button>
  );
}
