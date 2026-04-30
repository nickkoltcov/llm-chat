"use client"

import { useEffect, useState, useRef } from 'react'
import ChatInput from '@/components/messageList/chatInput/chatInput'
import MessageList from '@/components/messageList/messageList'
import styles from '@/components/chatConteiner/chatContainer.module.scss'
import askAI from '@/services/aiServise'
import { IMessage } from '@/shared/type/index'

export default function ChatContainer({ chatsid }: {chatsid:string}) {
  
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false)

  const hasRequestedRef = useRef(false);

  useEffect(() => {
    const rawHistory = localStorage.getItem('chat_history');
    const history = JSON.parse(rawHistory || '[]');
    const currentChat = history.find((chat:any) => chat.id === chatsid);

    if (currentChat) {
      const chatMessages = currentChat.messages || [];
      setMessages(chatMessages);

      const hasAIResponse = chatMessages.some((m:IMessage) => m.role === 'assistant');

      if (chatMessages.length === 1 && chatMessages[0].role === 'user' && !hasAIResponse) {
        if (!hasRequestedRef.current) {
          generateAIResponse(chatMessages);
        }
      }
    }

    return () => { hasRequestedRef.current = false; };

  }, [chatsid]);

  const generateAIResponse = async (historyChat: IMessage[]) => {

    if(hasRequestedRef.current) return

    try {
      
      hasRequestedRef.current = true
      setIsLoading(true)
      
      
      const apiMessage = historyChat.map(messege => ({
        role: messege.role,
        content: messege.text
      }))

      const gptReply = await askAI(apiMessage);
      
      const aiMessage: IMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        name: "LanguageGUI",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: "/AI.png",
        text: gptReply
      };

      addMessage(aiMessage);

    } catch (error) {

      console.error("Ошибка при получении ответа ИИ:", error);

    } finally {

      setIsLoading(false)
      hasRequestedRef.current = false
    }
  };


  const addMessage = (newMessage: IMessage) => {
    setMessages((prev) => {
      const updatedMessages = [...prev, newMessage];
      
      const history = JSON.parse(localStorage.getItem('chat_history') || '[]');
      const updatedHistory = history.map((chat: any) => 
        chat.id === chatsid ? { ...chat, messages: updatedMessages } : chat
      );
      
      localStorage.setItem('chat_history', JSON.stringify(updatedHistory));
      return updatedMessages
      
    })
    
  };

  const onSendUserMessage = (userMessage: IMessage) => {
    if (isLoading || hasRequestedRef.current) return;

    addMessage(userMessage);

    const nextHistory = [...messages, userMessage];
    generateAIResponse(nextHistory);
  };

  return (
    <>
      <div className={styles.chat__messages}>
        <MessageList 
          messages={messages}
          startTime={messages[0]?.time} 
        />
      </div>

      <div className={styles.chat__input}>
        <ChatInput onAddMessage={onSendUserMessage} isLoading={isLoading} />
      </div>
    </>
  );
}
