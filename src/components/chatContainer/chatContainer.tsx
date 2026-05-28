"use client";

import { useEffect, useState } from "react";
import ChatInput from "@/components/messageList/chatInput/chatInput";
import MessageList from "@/components/messageList/messageList";
import styles from "@/components/chatContainer/chatContainer.module.scss";
import askAI from "@/services/aiService";
import { chatStorageService } from "@/services/storege/chatStorage";
import { IMessage } from "@/shared/type/index";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { routes } from "@/shared/config/routes";
import clsx from "clsx";

export default function ChatContainer({ chatsid }: { chatsid: string }) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const currentChat = chatStorageService.getById(chatsid);
    if (!currentChat) {
      router.replace(routes.home());
    } else {
      setMessages(currentChat.messages || []);
      setErrorBanner(null);
    }
  }, [chatsid, router]);

  const onSendUserMessage = async (userMessage: IMessage) => {
    if (isLoading) return;

    setErrorBanner(null);
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const apiHistory = newMessages.map((message) => ({
        role: message.role,
        content: message.text,
      }));

      const gptReply = await askAI(apiHistory);

      if (gptReply && gptReply.error) {
        setErrorBanner(gptReply.message);
        return;
      }

      const aiMessage: IMessage = {
        id: uuidv4(),
        role: "assistant",
        name: "LanguageGUI",
        time: format(new Date(), "HH:mm"),
        avatar: "/AI.png",
        text: gptReply.reply || gptReply,
      };

      const finalMessages = [...newMessages, aiMessage];
      setMessages(finalMessages);
      chatStorageService.updateChat(chatsid, (chat) => ({
        ...chat,
        messages: finalMessages,
        updatedAt: new Date().toISOString(),
      }));
    } catch (error: any) {
      console.error("Ошибка при отправке сообщения:", error);
      setErrorBanner(
        error?.message || "Selected model does not support this file type.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles.chat__messages}>
        <MessageList messages={messages} startTime={messages[0]?.time} />
      </div>

      {errorBanner && (
        <div className={clsx(styles.chat__error, "d-2")}>{errorBanner}</div>
      )}

      <div className={styles.chat__input}>
        <ChatInput
          onAddMessage={onSendUserMessage}
          isLoading={isLoading}
          clearError={() => setErrorBanner(null)}
        />
      </div>
    </>
  );
}
