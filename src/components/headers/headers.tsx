import styles from '@/components/headers/headers.module.scss' 
import Button from '@/shared/ui/button/button'
import clsx from 'clsx'
import IconOpenSidebar from '@/shared/assets/icons/sidebar-left.svg'
import Plus from '@/shared/assets/icons/plus.svg'
import { useBreakpoint } from '@/shared/hook/usebreakpoint'
import { useRouter } from 'next/navigation'
import { routes } from '@/shared/config/routes'

interface HeaderChatProps {
  onOpenSidebar: () => void
}

export default function HeaderChat({ onOpenSidebar }: HeaderChatProps) {
  const { isMobile } = useBreakpoint()
  const router = useRouter()

  return (
    <header className={styles.header}>
      <div className={styles.header__left}>
        {isMobile ? (
          <button 
            className={styles.header__btn} 
            onClick={onOpenSidebar}
            type="button"
            aria-label="Открыть сайдбар"
          >
            <IconOpenSidebar width={24} height={24} />
          </button>
        ) : (
          <h1 className={clsx(styles.header__title, 'd-3')}>Chats</h1>
        )}
      </div>
      <Button 
        Icon={Plus} 
        size={isMobile ? "lg" : "sm"} 
        className='d-2' 
        onClick={() => router.push(routes.home())}
      >
        {!isMobile && "New chat"}
      </Button>
    </header>
  )
}