import Link from "next/link"
import styles from "@/components/chatHistory/chatHistory.module.scss"

interface ChatItemProps {
    title: string;
    href: string;
}

export const ChatItem = ({ title, href }: ChatItemProps) => {
    return (
        <li className={styles.chat_history__item}>
            <Link href={href} className={styles.chat_history__link}>
                {title}
            </Link>
        </li>
    )
}