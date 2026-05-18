"use client"

import { useEffect, useState } from 'react'
import ChatInput from '@/components/messageList/chatInput/chatInput'
import MessageList from '@/components/messageList/messageList'
import styles from '@/components/chatContainer/chatContainer.module.scss'
import askAI from '@/services/aiService'
import { chatStorageService } from '@/services/chatStorage'
import { IMessage } from '@/shared/type/index'
import { v4 as uuidv4 } from 'uuid'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation';
import { routes } from "@/shared/config/routes";

export default function ChatContainer({ chatsid }: { chatsid: string }) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const currentChat = chatStorageService.getById(chatsid);
    if (!currentChat) {
      router.replace(routes.home())
    } else {
      setMessages(currentChat.messages || []);
    }
  }, [chatsid]);

  const onSendUserMessage = async (userMessage: IMessage) => {
    if (isLoading) return;

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    chatStorageService.updateChat(chatsid, (chat) => ({
      ...chat,
      messages: newMessages,
      updatedAt: new Date().toISOString(),
    }));
    setIsLoading(true);
    
    try {
      const apiHistory = newMessages.map(message => ({ role: message.role, content: message.text }));
      const gptReply = await askAI(apiHistory);
      
      const aiMessage: IMessage = {
        id: uuidv4(),
        role: 'assistant',
        name: "LanguageGUI",
        time: format(new Date(), 'HH:mm'),
        avatar: "/AI.png",
        text: gptReply
      };

      const finalMessages = [...newMessages, aiMessage];
      setMessages(finalMessages);
      chatStorageService.updateChat(chatsid, (chat) => ({
        ...chat,
        messages: newMessages,
        updatedAt: new Date().toISOString(),
      }));
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles.chat__messages}>
        <MessageList messages={messages} startTime={messages[0]?.time} />
      </div>
      <div className={styles.chat__input}>
        <ChatInput onAddMessage={onSendUserMessage} isLoading={isLoading} />
      </div>
    </>
  );
}