"use client";

import Link from "next/link";
import styles from "./Sidebar.module.scss";
import Logo from "../Logo/Logo";
import { usePathname } from "next/navigation";
import Button from "../Button/Button";
import Menu from "../Menu/Menu";
import Icon from "../Icon/Icon";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  if (!mounted) {
    return null;
  }

  function SidebarLink({
    path,
    children,
  }: React.PropsWithChildren<{ path: string }>) {
    return (
      <Link
        href={path}
        className={`${styles.sidebar_link} ${pathname === path && styles.sidebar_link__selected}`}
      >
        {children}
      </Link>
    );
  }

  // FIXME: move sidebar menu to it's own component because the
  // mounted check renders a black zone before rendering the proper sidebar.
  return (
    <nav className={styles.sidebar}>
      <Link href="/" className={styles.header}>
        <Logo width={80} height={80} />
        <h1 className={styles.title}>ETE Training</h1>
      </Link>
      <div className={styles.sidebar_links}>
        <SidebarLink path="/">Tableau de bord</SidebarLink>
      </div>
      <div className={styles.footer}>
        <Menu>
          <Menu.Target>
            <Button className={styles.profile_button}>
              <Icon.User />
              Mon profil
            </Button>
          </Menu.Target>
          <Menu.Dropdown position="top">
            <div className={styles.profile_dropdown}>
              <Button>Mon profil</Button>
              <hr />
              <h3>Theme</h3>
              <Button
                onClick={() => setTheme("dark")}
                className={`${styles.dropdown_button} ${theme == "dark" && styles.button__selected}`}
              >
                Sombre
              </Button>
              <Button
                onClick={() => setTheme("light")}
                className={`${styles.dropdown_button} ${theme != "dark" && styles.button__selected}`}
              >
                Clair
              </Button>
              <hr />
              <Button className={styles.logout_button}>Se déconnecter</Button>
            </div>
          </Menu.Dropdown>
        </Menu>
      </div>
    </nav>
  );
}
