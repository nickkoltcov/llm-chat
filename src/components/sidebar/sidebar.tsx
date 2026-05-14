"use client"

import Image from "next/image"
import styles from './sidebar.module.scss'
import Button from '@/shared/ui/button/button'
import ChatHistory from '@/components/chatHistory/chatHistory'
import clsx from 'clsx'
import IconSetting from '@/shared/assets/icons/setting-icon.svg'
import IconOpenSidebar from '@/shared/assets/icons/sidebar-left.svg'
import Plus from '@/shared/assets/icons/plus.svg'
import {useBreakpoint} from '@/shared/hook/usebreakpoint';
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
import { routes } from '@/shared/config/routes';



interface SidebarProps {
  isOpen: boolean
  isMobile: boolean
  onToggle: () => void
  onClose: () => void
}

export default function Sidebar({ isOpen, isMobile, onToggle, onClose }: SidebarProps) {

    const router = useRouter()

    const handleNewChat = () => {
        if (isMobile) onClose()
        router.push(routes.home())
    }
    

    return (
        <>
            <div 
                className={clsx(styles.sidebar__overlay, isOpen && styles['sidebar__overlay--visible'])} 
                onClick={onToggle} 
            />

            <aside className={clsx(styles.sidebar, !isOpen && styles.sidebar__collapsed)}>
                <header className={styles.sidebar__header}>
                    <div className={styles.sidebar__profile}>
                        <Image 
                            src='/avatar.png' 
                            alt="Аватар" 
                            width={32} 
                            height={32} 
                            className={styles.sidebar__logo}
                        />
                        <span className={clsx(styles.sidebar__name, 'd-1')}>Mauro Sicard</span>
                    </div>
                    
                    <div className={styles.sidebar__actions}>
                        <button className={styles.sidebar__action_btn} type="button">
                            <IconSetting alt="Настройки" width={16} hight={16}></IconSetting>
                        </button>
                        <button className={styles.sidebar__action_btn}
                            type="button" onClick={onToggle}>
                            <IconOpenSidebar alt="Открыть сайдбар" width={16} height={16}></IconOpenSidebar>  
                        </button>
                    </div>
                </header>
                <div className={styles.sidebar__content}>
                    <ChatHistory />
                </div>
                <footer className={styles.sidebar__footer}>
                    <Button Icon={Plus} size={isOpen ? "md" : "lg"} className="d-1" onClick={handleNewChat}>
                        {isOpen && "Start new chat"} 
                    </Button>
                </footer>
            </aside>
        </>
    )
}
