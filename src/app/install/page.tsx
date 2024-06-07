"use client";

import Image from "next/image";
import styles from "./Install.module.scss";
import Button from "@/components/Button/Button";
import { useEffect, useMemo, useState } from "react";
import Icon from "@/components/Icon/Icon";
import useInstallPrompt from "@/hooks/useInstallPrompt";
import Modal from "@/components/Modal/Modal";
import { parseBrowser } from "@/utils/browserDetection";

export default function Install() {
  const [prompt, promptToInstall] = useInstallPrompt();
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);
  const [browser, setBrowser] = useState("chrome");

  const installProcess = useMemo(() => {
    switch (browser) {
      case "chrome":
        return (
          <>
            Ouvre le menu de chrome en haut à droite de l'écran puis choisis{" "}
            <b>"Installer l'application"</b>
          </>
        );
      case "brave":
        return (
          <>
            Ouvre le menu de brave en bas à droite de l'écran puis choisis{" "}
            <b>"Installer l'application"</b>
          </>
        );
      case "firefox":
        return (
          <>
            Ouvre le menu de firefox en haut à droite de l'écran puis choisis{" "}
            <b>"Ajouter à l'écran d'accueil"</b>
          </>
        );
      case "edge":
        return (
          <>
            Ouvre le menu de edge en bas à droite de l'écran puis choisis{" "}
            <b>"Ajouter au téléphone"</b>
          </>
        );
      case "opera":
        return (
          <>
            Ouvre le menu de opera en haut à droite de l'écran puis choisis{" "}
            <b>"Ajouter..."</b> puis <b>"Écran d'accueil"</b>
          </>
        );
      case "samsung internet":
        return (
          <>
            Ouvre le menu de samsung internet en bas à droite de l'écran puis
            choisis <b>"Ajouter la page à"</b> puis <b>"Écran d'accueil"</b>
          </>
        );
      case "safari":
        return (
          <>
            Ouvre le menu de partage de safari en bas de l'écran puis choisis{" "}
            <b>"Sur l'écran d'accueil"</b>
          </>
        );
    }
  }, [browser]);

  useEffect(() => {
    setBrowser(parseBrowser());
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js");
      setLoading(false);
    }
  }, []);

  function handleClick() {
    if (prompt) {
      promptToInstall();
    } else {
      setOpened((opened) => !opened);
    }
  }

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <Image
          alt="logo"
          src="/ete.webp"
          height={32}
          width={32}
          priority
          className={styles.logo}
        />
        ETE Training {browser}
      </div>
      <div className={styles.card}>
        <h1 className={styles.card__title}>Installation</h1>
        {loading ? (
          <div className={styles.spinner_container}>
            <Icon.Spinner className={styles.spinner} />
          </div>
        ) : (
          <>
            <p>
              Pour installer l'application, veuillez cliquer sur le bouton
              ci-dessous.
            </p>
            <div>
              <Button onClick={handleClick}>Installer</Button>
            </div>
          </>
        )}
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          className={styles.modal}
        >
          <h2>Installer l'application</h2>
          <p className={styles.modal_description}>{installProcess}</p>
          <Button onClick={() => setOpened(false)}>Compris</Button>
        </Modal>
      </div>
    </div>
  );
}
