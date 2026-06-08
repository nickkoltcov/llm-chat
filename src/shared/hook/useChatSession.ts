import { IFileMeta } from "@/shared/type/index";
import { chatService } from "@/shared/services/chatService";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { chatQueryKeys } from "../config/queryKey";
import {
  mapApiMessageToClient,
  mapFilesToAttachments,
} from "../utils/chatMappers";
import { v4 as uuidv4 } from "uuid";

export default function useChatSession(chatsid: string) {
  const queryClient = useQueryClient();

  const { data: messages = [], isLoading: isHistoryLoading } = useQuery({
    queryKey: chatQueryKeys.messages(chatsid),
    queryFn: () => chatService.getChatMessages(chatsid),
    select: (response) => response.data.map(mapApiMessageToClient),
    retry: false,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async ({
      content,
      files,
    }: {
      content: string;
      files?: IFileMeta[];
    }) => {
      return chatService.sendMessage({
        chatId: chatsid,
        content,
        clientMessageId: uuidv4(),
        attachments: mapFilesToAttachments(files),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: chatQueryKeys.messages(chatsid),
      });
      queryClient.invalidateQueries({ queryKey: chatQueryKeys.lists() });
    },
  });

  // const onRetryMessage = async (assistantMessageId: string) => {
  //   if (isLoading) return;

  //   const assistantMessage = messages.findIndex(
  //     (m) => m.id === assistantMessageId,
  //   );
  //   const userMessage = assistantMessage - 1;

  //   if (userMessage < 0 || messages[userMessage].role !== "user") return;

  //   const truncatedMessages = messages.slice(0, userMessage + 1);

  //   setRetryingMessageId(assistantMessageId);
  //   setErrorBanner(null);
  //   setIsLoading(true);

  //   try {
  //     const aiMessage = await chatService.getAssistantReply(truncatedMessages);

  //     const updatedMessages = [...truncatedMessages, aiMessage]

  //     setMessages(updatedMessages);
  //   } catch (error: any) {
  //     console.error("Ошибка при повторной отправке сообщения:", error);
  //     setErrorBanner(
  //       error?.message || "Selected model does not support this file type.",
  //     );
  //   } finally {
  //     setIsLoading(false);
  //     setRetryingMessageId(null);
  //   }
  // };

  return {
    messages,
    // isLoading: isHistoryLoading, потом добавлю, что история грузится на странице
    isSending: sendMessageMutation.isPending,
    errorBanner: sendMessageMutation.error?.message || null,
    onSendUserMessage: (content: string, files?: IFileMeta[]) =>
      sendMessageMutation.mutate({ content, files }),
    clearError: () => sendMessageMutation.reset(),
  };
}
