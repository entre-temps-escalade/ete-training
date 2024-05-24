"use client";

import { usePathname } from "next/navigation";
import Icon from "../Icon/Icon";
import styles from "./Header.module.scss";
import DateInput from "../DateInput/DateInput";
import { useContext, useState } from "react";
import dayjs from "dayjs";
import weekdayPlugin from "dayjs/plugin/weekday";
import { SidebarContext } from "../Sidebar/SidebarContext";

dayjs.locale("fr");
dayjs.extend(weekdayPlugin);

export default function Header() {
  const ctx = useContext(SidebarContext)!;
  const [date, setDate] = useState(dayjs());
  const pathname = usePathname();

  const PageIcon = Icon.Home;
  const page_title = pathname.split("/")[1] || "Accueil";

  function handleExpandSidebar() {
    ctx.expanded ? ctx.reduce() : ctx.expand();
  }

  // TODO: calendar on mobile view

  return (
    <header className={styles.header}>
      <span onClick={handleExpandSidebar}>
        <Icon.Bars />
      </span>
      <h1 className={styles.title}>
        <span>{page_title}</span>
        <PageIcon className={styles.page_icon} />
      </h1>
      <div>
        <DateInput value={date} onChange={setDate} />
      </div>
      <div></div>
    </header>
  );
}
