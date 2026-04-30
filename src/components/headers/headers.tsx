"use client"

import styles from '@/components/headers/headers.module.scss' 
import Button from '@/shared/ui/button/button'
import clsx from 'clsx';
import IconOpenSidebar from '@/shared/assets/icons/sidebar-left.svg'
import Plus from '@/shared/assets/icons/plus.svg'
import { useBreakpoint } from '@/shared/hook/usebreakpoint';
import { useCreateChat } from '@/shared/hook/usecreatechat';

export default function HeaderChat() {

  const { isMobile } = useBreakpoint();
  const { createChat } = useCreateChat();

  const handleOpenSidebar = () => {
    window.dispatchEvent(new Event('open-sidebar'));
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__left}>
        {isMobile ? (
          <button 
            className={styles.header__btn} 
            onClick={handleOpenSidebar}
            type="button"
          >
            <IconOpenSidebar width={24} height={24} />
          </button>
        ) : (<h1 className={clsx(styles.header__title, 'd-3')}>Chats</h1>)}
      </div>
      <Button 
        Icon={Plus} 
        size={isMobile ? "lg" : "sm"} 
        className='d-2' 
        onClick={() => createChat()}
      >
        {!isMobile && "New chat"}
      </Button>
    </header>
  )
}
