import { useContext } from "react";
import { DateInputContext } from "./DateInputContext";
import Input from "../Input/Input";
import styles from "./DateInput.module.scss";
import Icon from "../Icon/Icon";

export default function DateInputTarget() {
  const ctx = useContext(DateInputContext)!;

  function onClick() {
    ctx.opened ? ctx.close() : ctx.open();
  }

  return (
    <Input
      leftSection={<Icon.CalendarDays />}
      onClick={onClick}
      ref={ctx.setTargetRef}
      className={styles.input}
      defaultValue={ctx.value.format("DD/MM/YYYY")}
    />
  );
}
