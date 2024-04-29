"use client";

import { useTheme } from "next-themes";
import Icon from "../Icon/Icon";
import styles from "./ThemeSwitcher.module.scss";
import { useEffect, useState } from "react";

type Props = {
  className?: string;
};

export default function ThemeSwitcher({ className }: Props) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  if (!mounted) {
    return null;
  }

  function handleClick() {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`${styles.theme_switcher} ${className}`}
    >
      {theme === "dark" ? (
        <Icon.Sun className={styles.theme_icon} />
      ) : (
        <Icon.Moon className={styles.theme_icon} />
      )}
    </button>
  );
}
