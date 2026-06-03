import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { chatStorageService } from "@/shared/storage/chatStorage";
import { IChat } from "@/shared/type/index";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { CHAT_HISTORY_QUERY_KEY } from "@/shared/config/queryKeys";
import { createUserMessage } from "@/shared/utils/chatMappers";
import { chatService } from "@/shared/services/chatService";

export const useCreateChat = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: startChat, isPending } = useMutation({
    mutationFn: async (firstMessage: string) => {
      const newChatId = uuidv4();

      const userMessage = createUserMessage(firstMessage, []);

      const aiMessage = await chatService.getAssistantReply([userMessage]);

      const newChat: IChat = {
        id: newChatId,
        title: firstMessage.slice(0, 30),
        messages: [userMessage, aiMessage],
      };

      return { newChat, newChatId };
    },
    onSuccess: ({ newChat, newChatId }) => {
      chatStorageService.addChat(newChat);
      queryClient.invalidateQueries({ queryKey: [CHAT_HISTORY_QUERY_KEY] });
      router.push(`/chats/${newChatId}`);
    },
    onError: (error) => {
      console.error("Ошибка при инициализации чата:", error);
    },
  });
  return { startChat, isPending };
};
