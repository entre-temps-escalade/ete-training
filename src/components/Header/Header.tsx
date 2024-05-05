"use client";

import { usePathname } from "next/navigation";
import Icon from "../Icon/Icon";
import styles from "./Header.module.scss";
import DateInput from "../DateInput/DateInput";
import { useState } from "react";
import dayjs from "dayjs";
import weekdayPlugin from "dayjs/plugin/weekday";

dayjs.locale("fr");
dayjs.extend(weekdayPlugin);

export default function Header() {
  const [date, setDate] = useState(dayjs());
  const pathname = usePathname();

  const PageIcon = Icon.Home;
  const page_title = pathname.split("/")[1] || "Accueil";

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        {page_title} <PageIcon className={styles.page_icon} />
      </h1>
      <div>
        <DateInput value={date} onChange={setDate} />
      </div>
      <div></div>
    </header>
  );
}
