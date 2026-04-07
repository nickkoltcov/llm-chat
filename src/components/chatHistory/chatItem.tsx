import Link from "next/link"
import styles from "@/components/chatHistory/chatHistory.module.scss"
import clsx from "clsx";

interface ChatItemProps {
    title: string;
    href: string;
}

export default function ChatItem({ title, href }: ChatItemProps) {
    return (
        <li className={styles.chat_history__item}>
            <Link href={href} className={clsx(styles.chat_history__link, 'd-1')}>
                {title}
            </Link>
        </li>
    )
}

