import styles from './mainLayout.module.scss'
import  ChatShell  from '@/components/chatShell/chatShell'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <ChatShell>{children}</ChatShell>
    </div>
  )
}