import Sidebar from '@/components/sidebar/sidebar'
import styles from '@/components/mainLayout/mainLayout.module.scss' 
import Button from '@/shared/ui/button/button'

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.layout__container}>
        <header className={styles.layout__header}>
          <h1 className={styles.layout__title}>Chats</h1>
          <Button icon="/plus.svg" size="sm">
            New chat
          </Button>
        </header>
        <main className={styles.layout__content}>
          {children}
        </main>
      </div>
    </div>
  )
}
