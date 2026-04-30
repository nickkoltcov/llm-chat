import Link from "next/link"
import styles from "@/components/chatHistory/chatHistory.module.scss"
import clsx from "clsx";

interface ChatItemProps {
    title: string;
    href: string;
    isActive?:boolean
}

export default function ChatItem({ title, href, isActive }: ChatItemProps) {
    return (
        <li className={styles.chat_history__item}>
            <Link href={href} className={clsx(styles.chat_history__link, 'd-1', isActive && styles.chat_history__link_active)}>
                {title}
            </Link>
        </li>
    )
}

