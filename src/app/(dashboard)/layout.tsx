"use client";

import Sidebar from "@/components/Sidebar/Sidebar";
import styles from "./Layout.module.scss";
import Header from "@/components/Header/Header";
import { SidebarProvider } from "@/components/Sidebar/SidebarContext";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.layout}>
      <SidebarProvider>
        <Sidebar />
        <section>
          <Header />
          {children}
        </section>
      </SidebarProvider>
    </div>
  );
}
