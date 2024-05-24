import { useTheme } from "next-themes";
import Button from "../Button/Button";
import styles from "./Sidebar.module.scss";
import { useEffect, useState } from "react";

export default function ProfileMenu() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  if (!mounted) {
    return null;
  }

  return (
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
  );
}
