"use client"

import ChatItem from "@/components/chatHistory/chatItem";
import styles from "@/components/chatHistory/chatHistory.module.scss";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';

export default function ChatHistory() {
    const [history, setHistory] = useState<any[]>([]);

    const params = useParams();
    const currentChatId = params?.chatsid;

    const loadHistory = () => {
        const chatData = localStorage.getItem('chat_history');
        if (chatData) {
            setHistory(JSON.parse(chatData));
        }
    };

    useEffect(() => {
        loadHistory();

        window.addEventListener('chatUpdated', loadHistory);
        window.addEventListener('storage', loadHistory);

        return () => {
            window.removeEventListener('chatUpdated', loadHistory);
            window.removeEventListener('storage', loadHistory);
        };
    }, []);

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
                                href={`/chats/${chat.id}`}
                                isActive={currentChatId === chat.id}
                            />
                        ))) : (<p className={styles.empty}>No chats</p>)}
                </ul>
            </nav>
        </div>
    );
}