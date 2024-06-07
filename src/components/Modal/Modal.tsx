import { PropsWithChildren } from "react";
import styles from "./Modal.module.scss";

interface Props {
  opened: boolean;
  onClose: () => void;
  className?: string;
}

export default function Modal({
  children,
  opened,
  onClose,
  className,
}: PropsWithChildren<Props>) {
  if (!opened) return null;

  return (
    <div className={styles.modal_container}>
      <div className={styles.background} onClick={onClose}></div>
      <div className={`${styles.modal} ${className}`}>{children}</div>
    </div>
  );
}
