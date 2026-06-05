import { useState, useEffect } from "react";
import { IMessage,IFileMeta } from "@/shared/type/index";
import { chatStorageService } from "@/shared/storage/chatStorage";
import { useRouter, useSearchParams } from "next/navigation";
import { routes } from "@/shared/config/routes";
import { chatService } from "@/shared/services/chatService";
import {useQuery,useQueryClient} from '@tanstack/react-query'
import { createUserMessage } from "../utils/chatMappers";
import {v4 as uuidv4} from 'uuid'


export default function useChatSession(chatsid: string) {
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [retryingMessageId, setRetryingMessageId] = useState<string | null>(
    null,
  );

  const text = useSearchParams().get('message')

  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: chatData, isError } = useQuery({
    queryKey: ["chat", chatsid],
    queryFn: () => chatService.getChatMessages(chatsid),
    retry: false, 
  });


  const messages = chatData?.data || [];

  const onSendUserMessage = async (userMessage: string | IMessage, files?: IFileMeta[] ) => {
    if (isLoading) return;

    setErrorBanner(null);
    setIsLoading(true);
    const clientMessageId = uuidv4();
    

    try {
      
      const currentUserMessage = typeof userMessage === "string" 
        ? createUserMessage(userMessage, files || []) 
        : userMessage;



      const messageText = currentUserMessage.text;
      await chatService.sendMessage({ 
        chatId: chatsid, 
        content: messageText, 
        clientMessageId,
        files 
      });

      await queryClient.invalidateQueries({ queryKey: ["chat", chatsid] });
      await queryClient.invalidateQueries({ queryKey: ["chats"] });

    } catch (error: any) {
      console.error("Ошибка при отправке сообщения:", error);
      setErrorBanner(
        error?.message || "Selected model does not support this file type.",
      );
    } finally {
      setIsLoading(false);
    }
  };

   useEffect(() => {
  
    if (isError) {
      router.replace(routes.home());
      return;
    }

 
    if (chatData && messages?.length === 0 && text) {
      onSendUserMessage(text);
      window.history.replaceState({}, "", `/chats/${chatsid}`);
    }
  }, [isError, chatData, text, chatsid, router]);


  const onRetryMessage = async (assistantMessageId: string) => {
    if (isLoading) return;

    const assistantMessage = messages.findIndex(
      (m) => m.id === assistantMessageId,
    );
    const userMessage = assistantMessage - 1;

    if (userMessage < 0 || messages[userMessage].role !== "user") return;

    const truncatedMessages = messages.slice(0, userMessage + 1);

    setRetryingMessageId(assistantMessageId);
    setErrorBanner(null);
    setIsLoading(true);

    try {
      const aiMessage = await chatService.getAssistantReply(truncatedMessages);

      const updatedMessages = [...truncatedMessages, aiMessage]

      setMessages(updatedMessages);
      chatStorageService.updateChat(chatsid, (chat) => ({
        ...chat,
        messages: updatedMessages,
        updatedAt: new Date().toISOString(),
      }));
    } catch (error: any) {
      console.error("Ошибка при повторной отправке сообщения:", error);
      setErrorBanner(
        error?.message || "Selected model does not support this file type.",
      );
    } finally {
      setIsLoading(false);
      setRetryingMessageId(null);
    }
  };

  return {
    messages,
    isLoading,
    errorBanner,
    retryingMessageId,
    onSendUserMessage,
    onRetryMessage,
    clearError: () => setErrorBanner(null),
  };
}