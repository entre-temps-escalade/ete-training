import { forwardRef } from "react";

import styles from "./Input.module.scss";

interface Props extends React.ComponentProps<"input"> {
  className?: string;
  label?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { className, label, ...props },
  ref,
) {
  return (
    <>
      {label && (
        <label className={styles.label} htmlFor={props.id}>
          {label}
        </label>
      )}
      <input ref={ref} className={`${styles.input} ${className}`} {...props} />
    </>
  );
});

export default Input;
