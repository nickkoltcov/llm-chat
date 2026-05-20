"use client";

import ChatItem from "@/components/chatHistory/chatItem";
import styles from "@/components/chatHistory/chatHistory.module.scss";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { routes } from "@/shared/config/routes";
import { useQuery } from "@tanstack/react-query";
import { IChat } from "@/shared/type/index";
import { chatStorageService } from "@/services/chatStorage";
import { CHAT_HISTORY_QUERY_KEY } from "@/shared/config/queryKeys";

export default function ChatHistory() {
  const params = useParams();
  const currentChatId = params?.chatsid;

  const { data: history = [] } = useQuery<IChat[]>({
    queryKey: [CHAT_HISTORY_QUERY_KEY],
    queryFn: () => chatStorageService.getAll(),
    refetchOnWindowFocus: false,
  });

  return (
    <div className={styles.chat_history}>
      <h2 className={clsx(styles.chat_history__title, "d-2")}>Chat History</h2>
      <nav className={styles.chat_history__nav}>
        {history.length > 0 ? (
          <ul className={styles.chat_history__list}>
            {history.map((chat) => (
              <ChatItem
                key={chat.id}
                title={chat.title}
                href={routes.chat({ chatId: chat.id })}
                isActive={currentChatId === chat.id}
              />
            ))}
          </ul>
        ) : (
          <p className={styles.chat_history__empty}>No chats</p>
        )}
      </nav>
    </div>
  );
}
