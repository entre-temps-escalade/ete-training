import Sidebar from "@/components/Sidebar/Sidebar";
import styles from "./Layout.module.scss";
import Header from "@/components/Header/Header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <section>
        <Header />
        {children}
      </section>
    </div>
  );
}
