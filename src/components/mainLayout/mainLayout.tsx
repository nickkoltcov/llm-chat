"use client"

import { useEffect, useState } from 'react';
import Sidebar from '@/components/sidebar/sidebar'
import styles from '@/components/mainLayout/mainLayout.module.scss' 
import Button from '@/shared/ui/button/button'
import clsx from 'clsx';
import IconOpenSidebar from '@/shared/assets/icons/sidebar-left.svg'
import Plus from '@/shared/assets/icons/plus.svg'


export default function MainLayout({ children }: { children: React.ReactNode }) {


  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // //Пока оставил так для проверки на разных разрешениях, а так можно будет по итогу оставить вот так 
  // useEffect(() => {
  //   const mobile = window.innerWidth <= 425;
  //     setIsMobile(mobile);
  //     if (mobile) {
  //       setIsOpen(false);
  //     } else {
  //       setIsOpen(true);
  //     }
  // }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 425;
      setIsMobile(mobile);
      if (mobile) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div className={styles.layout}>
      <Sidebar  isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
      <div className={styles.layout__container}>
        <header className={styles.layout__header}>
          {isMobile ? (
            <button className={styles.layout__btn} onClick={() => setIsOpen(true)}>
              <IconOpenSidebar alt="Open Sidebar" width={24} height={24}></IconOpenSidebar>
            </button>
          ) : (
            <h1 className={clsx(styles.layout__title,'d-3')}>Chats</h1>
          )}
          <Button Icon={Plus} iconSize={isMobile ? 14 : 14} size={isMobile ? "lg" : "sm"} className='d-2' >
            {!isMobile && "New chat"}
          </Button>
        </header>
        <main className={styles.layout__content}>
          {children}
        </main>
      </div>
    </div>
  )
}


