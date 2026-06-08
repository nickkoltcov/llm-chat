"use client";

import ChatInput from "@/components/messageList/chatInput/chatInput";
import MessageList from "@/components/messageList/messageList";
import styles from "@/components/chatContainer/chatContainer.module.scss";
import clsx from "clsx";
import useChatSession from "@/shared/hook/useChatSession";

export default function ChatContainer({ chatsid }: { chatsid: string }) {
  const { messages, isSending, errorBanner, onSendUserMessage, clearError } =
    useChatSession(chatsid);

  return (
    <>
      <div className={styles.chat__messages}>
        <MessageList
          messages={messages}
          startTime={messages[0]?.time}
          // onRetry={null}
          retryingId={null}
        />
      </div>

      {errorBanner && (
        <div className={clsx(styles.chat__error, "d-2")}>{errorBanner}</div>
      )}

      <div className={styles.chat__input}>
        <ChatInput
          onAddMessage={onSendUserMessage}
          isLoading={isSending}
          clearError={clearError}
        />
      </div>
    </>
  );
}
