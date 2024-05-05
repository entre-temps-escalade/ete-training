import { forwardRef } from "react";

import styles from "./Input.module.scss";

interface Props extends React.ComponentProps<"input"> {
  className?: string;
  label?: string;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, label, leftSection, rightSection, ...props },
  ref,
) {
  return (
    <label className={`${styles.label_wrapper} ${className}`}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.input_wrapper}>
        {leftSection && (
          <div className={`${styles.section} ${styles.section__left}`}>
            {leftSection}
          </div>
        )}
        <input
          ref={ref}
          className={`${styles.input} ${leftSection ? styles.space__left : rightSection ? styles.space__right : null} ${className}`}
          {...props}
        />
        {rightSection && (
          <div className={`${styles.section} ${styles.section__right}`}>
            {rightSection}
          </div>
        )}
      </div>
    </label>
  );
});

export default Input;
