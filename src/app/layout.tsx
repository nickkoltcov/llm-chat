import { Inter } from "next/font/google";
import "./globals.css";
import "./variables.css";
import "./typography.css";
import Providers from "@/app/providers";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
