import { IFileMeta } from "@/shared/type/index";
import { chatService } from "@/shared/api/chatService";
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

  const retryMessageMutation = useMutation({
    mutationFn: async (assistantMessageId: string) => {
      const assistantIndex = messages.findIndex(
        (m) => m.id === assistantMessageId,
      );
      if (assistantIndex === -1)
        throw new Error("Сообщение ассистента не найдено");

      const userMessage = messages[assistantIndex - 1];
      if (!userMessage || userMessage.role !== "user") {
        throw new Error("Сообщение пользователя не найдено");
      }

      return chatService.sendMessage({
        chatId: chatsid,
        content: userMessage.text,
        clientMessageId: uuidv4(),
        attachments: mapFilesToAttachments(userMessage.files),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: chatQueryKeys.messages(chatsid),
      });
      queryClient.invalidateQueries({ queryKey: chatQueryKeys.lists() });
    },
  });

  return {
    messages,
    isLoading: isHistoryLoading,
    isSending: sendMessageMutation.isPending,
    retryingMessageId: retryMessageMutation.isPending
      ? retryMessageMutation.variables
      : null,
    errorBanner:
      sendMessageMutation.error?.message ||
      retryMessageMutation.error?.message ||
      null,
    onSendUserMessage: (content: string, files?: IFileMeta[]) =>
      sendMessageMutation.mutate({ content, files }),
    onRetryMessage: (assistantMessageId: string) =>
      retryMessageMutation.mutate(assistantMessageId),
    clearError: () => {
      sendMessageMutation.reset();
      retryMessageMutation.reset();
    },
  };
}
