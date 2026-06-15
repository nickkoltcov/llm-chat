"use client";

import Button from "@/shared/ui/button/button";
import styles from "./loginpage.module.scss";

export default function LoginPage() {
  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = "http://localhost:3000/auth/start";
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:5171"
    window.location.href = `${baseUrl}/auth/start`
  };

  return (
    <section className={styles.login}>
      <form className={styles.login__form}>
        <Button size="login" onClick={handleLogin}>
          Login
        </Button>
      </form>
    </section>
  );
}
