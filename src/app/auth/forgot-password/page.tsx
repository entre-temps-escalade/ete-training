import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import Image from "next/image";
import ThemeSwitcher from "@/components/ThemeSwitcher/ThemeSwitcher";
import styles from "./ForgotPassword.module.scss";
import Link from "next/link";

export default function ForgotPassword() {
  return (
    <section className={styles.section}>
      <ThemeSwitcher className={styles.theme_switcher} />
      <div className={styles.header}>
        <Image alt="logo" src="/ete.webp" height={32} width={32} priority />
        ETE Training
      </div>
      <div className={styles.card}>
        <h1 className={styles.card__title}>Mot de passe oublié</h1>
        <form className={styles.form}>
          <div>
            <Input
              label="Email"
              name="email"
              id="email"
              placeholder="Entrez votre email"
              required
            />
          </div>
          <Button type="submit" className={styles.button}>
            Envoyer un lien de récupération
          </Button>
          <Link href="/auth/login" className={styles.backlink}>
            Se connecter
          </Link>
        </form>
      </div>
    </section>
  );
}
