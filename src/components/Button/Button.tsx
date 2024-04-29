import { forwardRef } from "react";
import styles from "./Button.module.scss";

interface Props extends React.ComponentProps<"button"> {
  className?: string;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className, children, ...props },
  ref,
) {
  return (
    <button ref={ref} className={`${styles.button} ${className}`} {...props}>
      {children}
    </button>
  );
});

export default Button;
