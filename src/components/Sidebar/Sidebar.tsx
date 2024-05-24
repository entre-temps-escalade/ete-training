"use client";

import Link from "next/link";
import styles from "./Sidebar.module.scss";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Icon from "../Icon/Icon";
import { useLayoutEffect, useRef, useState } from "react";
import ProfileMenu from "./ProfileMenu";
import Menu from "../Menu/Menu";
import Button from "../Button/Button";

export default function Sidebar() {
  const [expanded, setExpanded] = useState<boolean | undefined>(undefined);
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (window.innerWidth < 640) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  }, []);

  useLayoutEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (!e.target || !sidebarRef.current || !expanded) return;

      if (!sidebarRef.current.contains(e.target as Node)) {
        setExpanded(false);
      }
    }

    if (window.innerWidth < 640) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [sidebarRef.current, expanded]);

  function handleExpand() {
    setExpanded((expanded) => !expanded);
  }

  function SidebarLink({
    path,
    children,
  }: React.PropsWithChildren<{ path: string }>) {
    return (
      <Link
        href={path}
        className={`${styles.sidebar_link} ${pathname === path && styles.sidebar_link__selected}`}
        scroll={false}
      >
        {children}
      </Link>
    );
  }

  // TODO: gesture on mobile
  // TODO: better animation
  return (
    <nav
      className={`${styles.sidebar} ${expanded !== undefined ? (expanded ? styles.expanded_sidebar : styles.reduced_sidebar) : null}`}
      ref={sidebarRef}
    >
      <div>
        <Link href="/" className={styles.header} scroll={false}>
          <Image alt="logo" src="/ete.webp" height={80} width={80} priority />
          <h1 className={styles.title}>ETE Training</h1>
        </Link>
        <button
          aria-label="expand sidebar"
          className={styles.expand_button}
          onClick={handleExpand}
        >
          <Icon.AngleLeft />
        </button>
      </div>
      <div className={styles.sidebar_links}>
        <SidebarLink path="/">
          <Icon.Home />
          <span>Tableau de bord</span>
        </SidebarLink>
      </div>
      <div className={styles.footer}>
        <Menu>
          <Menu.Target>
            <Button className={styles.profile_button}>
              <Icon.User />
              <span>Mon profil</span>
            </Button>
          </Menu.Target>
          <Menu.Dropdown position="top">
            <ProfileMenu />
          </Menu.Dropdown>
        </Menu>
      </div>
    </nav>
  );
}
