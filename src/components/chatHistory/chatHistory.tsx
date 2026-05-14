"use client"

import ChatItem from "@/components/chatHistory/chatItem";
import styles from "@/components/chatHistory/chatHistory.module.scss";
import clsx from "clsx";
import { useParams } from 'next/navigation';
import { routes } from "@/shared/config/routes";
import { useQuery } from "@tanstack/react-query";
import { IChat } from '@/shared/type/index';
import { chatStorageService } from "@/services/chatStorage";


export const CHAT_HISTORY_QUERY_KEY = ['chat_history'];

export default function ChatHistory() {
    const params = useParams();
    const currentChatId = params?.chatsid;

    const { data: history = [] } = useQuery<IChat[]>({
        queryKey: CHAT_HISTORY_QUERY_KEY,
        queryFn: () => chatStorageService.getAll(),
        refetchOnWindowFocus: false,
    });

    return (
        <div className={styles.chat_history}>
            <h2 className={clsx(styles.chat_history__title, 'd-2')}>Chat History</h2>
            <nav className={styles.chat_history__nav}>
                <ul className={styles.chat_history__list}>
                    {history.length > 0 ? (
                        history.map((chat) => (
                            <ChatItem 
                                key={chat.id} 
                                title={chat.title} 
                                href={routes.chat({ chatId: chat.id })}
                                isActive={currentChatId === chat.id}
                            />
                        ))
                    ) : (
                        <p className={styles.empty}>No chats</p>
                    )}
                </ul>
            </nav>
        </div>
    );
}
