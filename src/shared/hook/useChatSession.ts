import { useState, useEffect } from "react";
import { IMessage } from "@/shared/type/index";
import { chatStorageService } from "@/shared/storage/chatStorage";
import { useRouter } from "next/navigation";
import { routes } from "@/shared/config/routes";
import { chatService } from "@/shared/services/chatService";

export default function useChatSession(chatsid: string) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [retryingMessageId, setRetryingMessageId] = useState<string | null>(
    null,
  );

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
      const aiMessage = await chatService.getAssistantReply(newMessages);

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
