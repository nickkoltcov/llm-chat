"use client";

import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { usePathname } from 'next/navigation'
import {getMe} from '@/shared/api/authService'

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthGate>{children}</AuthGate>
    </QueryClientProvider>
  );
}



function AuthGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Если мы на странице логина или колбэка, проверять авторизацию не нужно
  if (pathname === "/loginpage" || pathname === "/callback") {
    return <>{children}</>;
  }

  // Запускаем проверку для всех остальных страниц
  const { isLoading } = useQuery({
    queryKey: ["auth-me"],
    queryFn: getMe,
    retry: false, // чтобы не спамить бэкенд при 401 ошибке
  });

  if (isLoading) {
    return <div>Загрузка...</div>; // или твой спиннер
  }

  return <>{children}</>;
}