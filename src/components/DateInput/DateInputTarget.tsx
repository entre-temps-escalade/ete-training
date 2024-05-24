import { useContext } from "react";
import { DateInputContext } from "./DateInputContext";
import styles from "./DateInput.module.scss";
import Icon from "../Icon/Icon";

export default function DateInputTarget() {
  const ctx = useContext(DateInputContext)!;

  function onClick() {
    ctx.opened ? ctx.close() : ctx.open();
  }

  return (
    <span className={styles.input} ref={ctx.setTargetRef} onClick={onClick}>
      <Icon.CalendarDays />
      <span>{ctx.value.format("DD/MM/YYYY")}</span>
    </span>
  );
}
