"use client";

import Button from "@/shared/ui/button/button";
import styles from "./loginpage.module.scss";
import {
  createSHA256CodeChallenge,
  generateCodeVerifier,
} from "@/services/helpers/auth-helpers";
import { authStorageService } from "@/services/storege/authStorage";

export default function LoginPage() {
  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const verifierCode = generateCodeVerifier();
    authStorageService.saveVerifier(verifierCode);
    const result = await createSHA256CodeChallenge(verifierCode);
    const openRouter = `https://openrouter.ai/auth?callback_url=http://localhost:3000/callback&code_challenge=${result}&code_challenge_method=S256`;
    window.location.href = openRouter;
  };

  return (
    <section className={styles.login}>
      <form className={styles.form}>
        <Button size="login" onClick={handleLogin}>
          Login
        </Button>
      </form>
    </section>
  );
}
