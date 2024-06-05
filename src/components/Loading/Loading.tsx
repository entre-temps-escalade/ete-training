import Image from "next/image";
import styles from "./Loading.module.scss";

export default function Loading() {
  return (
    <div className={styles.loading}>
      <Image alt="logo" src="/ete.webp" height={80} width={80} priority />
      <h1>ETE Training</h1>
    </div>
  );
}
