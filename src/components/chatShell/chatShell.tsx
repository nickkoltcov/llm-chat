"use client";

import { useState, useEffect } from "react";
import { useBreakpoint } from "@/shared/hook/usebreakpoint";
import Sidebar from "@/components/sidebar/sidebar";
import HeaderChat from "@/components/headers/headers";
import styles from "@/components/chatShell/chatShell.module.scss";
import { authStorageService } from "@/shared/storage/authStorage";

export default function ChatShell({ children }: { children: React.ReactNode }) {
  const { isMobile } = useBreakpoint();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    const savedKey = authStorageService.getAppKey();
    if (savedKey) return;
    const initializeKey = () => {
      const cookieRow = document.cookie
        .split("; ")
        .find((row) => row.startsWith("auth_token="));

      const userTokenFromCookies = cookieRow?.split("=")[1];
      if (!userTokenFromCookies || userTokenFromCookies === undefined) return;
      authStorageService.saveAppKey(userTokenFromCookies);
    };
    initializeKey();
  }, []);

  const handleToggle = () => setIsSidebarOpen((prev) => !prev);
  const handleOpen = () => setIsSidebarOpen(true);
  const handleClose = () => setIsSidebarOpen(false);

  return (
    <>
      <Sidebar
        isOpen={isSidebarOpen}
        isMobile={isMobile}
        onToggle={handleToggle}
        onClose={handleClose}
      />
      <div className={styles.container}>
        <HeaderChat onOpenSidebar={handleOpen} />
        <main className={styles.content}>{children}</main>
      </div>
    </>
  );
}
