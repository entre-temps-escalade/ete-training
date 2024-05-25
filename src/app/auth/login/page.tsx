import ThemeSwitcher from "@/components/ThemeSwitcher/ThemeSwitcher";
import styles from "./Login.module.scss";
import Image from "next/image";
import Input from "@/components/Input/Input";
import Link from "next/link";
import Button from "@/components/Button/Button";

export default function Login() {
  return (
    <section className={styles.section}>
      <ThemeSwitcher className={styles.theme_switcher} />
      <div className={styles.header}>
        <Image alt="logo" src="/ete.webp" height={32} width={32} priority />
        ETE Training
      </div>
      <div className={styles.card}>
        <h1 className={styles.card__title}>Connexion à ton compte</h1>
        <form className={styles.login_form}>
          <div>
            <Input
              label="Email"
              name="email"
              id="email"
              placeholder="Entrez votre email"
              required
            />
          </div>
          <div>
            <Input
              label="Mot de passe"
              name="password"
              id="password"
              placeholder="Entrez votre mot de passe"
              required
              type="password"
            />
            <Link href="/forgot-password" className={styles.forgot_password}>
              Mot de passe oublié?
            </Link>
          </div>
          <Button type="submit" className={styles.button}>
            Se connecter
          </Button>
        </form>
      </div>
    </section>
  );
}
