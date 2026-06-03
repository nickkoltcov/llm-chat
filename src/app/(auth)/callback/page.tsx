"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {useQueryClient} from '@tanstack/react-query'
import Button from "@/shared/ui/button/button";
import Link from "next/link";
import { routes } from "@/shared/config/routes";
import styles from "./callbackpage.module.scss";

export default function CallbackPage() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient()
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    const errorParam = searchParams.get("error");
  
    if (errorParam) {
      setError("Ошибка авторизации. Не удалось получить доступ.");
      return;
    }

    queryClient.invalidateQueries({ queryKey: ["auth-me"] });
    router.push(routes.home());
  }, [queryClient, router, searchParams]);

  return (
    <>
      {!error ? (
        <section className={styles.callback}>
          <div className={styles.callback__spinner} />
          <p className={styles.callback__text}>Авторизация...</p>
        </section>
      ) : (
        <section className={styles.callback}>
          <p className={styles.callback__text}>{error}</p>
          <Link href={routes.login()}>
            <Button>Login again</Button>
          </Link>
        </section>
      )}
    </>
  );
}
