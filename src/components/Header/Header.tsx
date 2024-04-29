"use client";

import { usePathname } from "next/navigation";
import Icon from "../Icon/Icon";
import styles from "./Header.module.scss";
import DateInput from "../DateInput/DateInput";

export default function Header() {
  const pathname = usePathname();

  const PageIcon = Icon.Home;
  const page_title = pathname.split("/")[1] || "Accueil";

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        {page_title} <PageIcon className={styles.page_icon} />
      </h1>
      <DateInput />
      <div></div>
    </header>
  );
}
