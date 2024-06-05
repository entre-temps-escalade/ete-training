"use client";

import Sidebar from "@/components/Sidebar/Sidebar";
import styles from "./Layout.module.scss";
import Header from "@/components/Header/Header";
import { SidebarProvider } from "@/components/Sidebar/SidebarContext";
import Loading from "@/components/Loading/Loading";
import useLoading from "@/hooks/useLoading";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loading = useLoading();

  return (
    <div className={styles.layout}>
      {loading ? (
        <Loading />
      ) : (
        <SidebarProvider>
          <Sidebar />
          <section>
            <Header />
            {children}
          </section>
        </SidebarProvider>
      )}
    </div>
  );
}
