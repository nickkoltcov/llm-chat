"use client";

import ChatItem from "@/components/chatHistory/chatItem";
import styles from "@/components/chatHistory/chatHistory.module.scss";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { routes } from "@/shared/config/routes";
import useChatsList from "@/shared/hook/useChatsList";
import Button from "@/shared/ui/button/button";

export default function ChatHistory() {
  const params = useParams();
  const currentChatId = params?.chatsid;

  const { chats, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useChatsList();

  return (
    <div className={styles.chat_history}>
      <h2 className={clsx(styles.chat_history__title, "d-2")}>Chat History</h2>
      <nav className={styles.chat_history__nav}>
        {chats.length > 0 ? (
          <ul className={styles.chat_history__list}>
            {chats.map((chat) => (
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
        {hasNextPage && (
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className={styles.chat_history__load_more}
          >
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </Button>
        )}
      </nav>
    </div>
  );
}
