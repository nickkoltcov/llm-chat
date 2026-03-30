import Image from "next/image"
import styles from './sidebar.module.scss'
import Button from '@/shared/ui/button/button'
import ChatHistory from '@/components/chatHistory/chatHistory'

export default function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <header className={styles.sidebar__header}>
                <div className={styles.sidebar__profile}>
                    <Image 
                        src='/avatar.png' 
                        alt="Аватар пользователя" 
                        width={32} 
                        height={32} 
                        className={styles.sidebar__logo}
                    />
                    <span className={styles.sidebar__name}>Mauro Sicard</span>
                </div>
                <div className={styles.sidebar__actions}>
                    <button className={styles.sidebar__action_btn} type="button">
                        <Image src="/setting-icon.svg" alt="Настройки" width={16} height={16} />
                    </button>
                    <button className={styles.sidebar__action_btn} type="button">
                        <Image src="/sidebar-left.svg" alt="Скрыть сайдбар" width={16} height={16} />
                    </button>
                </div>
            </header>

            <ChatHistory />
            
            <footer className={styles.sidebar__footer}>
                <Button icon="/plus.svg" size="md">
                    Start new chat
                </Button>
            </footer>
        </aside>
    )
}
