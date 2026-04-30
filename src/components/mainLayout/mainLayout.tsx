import Sidebar from '@/components/sidebar/sidebar'
import styles from '@/components/mainLayout/mainLayout.module.scss' 
import HeaderChat from '@/components/headers/headers'


export default function MainLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className={styles.layout}>
      <Sidebar/>
      <div className={styles.layout__container}>
        <HeaderChat/>
        <main className={styles.layout__content}>
          {children}
        </main>
      </div>
    </div>
  )
}


