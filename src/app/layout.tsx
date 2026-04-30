import { Inter } from 'next/font/google';
import MainLayout from '@/components/mainLayout/mainLayout';
import './globals.css';
import './variables.css'
import './typography.css'
import Providers from '@/app/providers';


const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Providers >
          <MainLayout>
            {children}
          </MainLayout>
        </Providers>
      </body>
    </html>
  );
}
