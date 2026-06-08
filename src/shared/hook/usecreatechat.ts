import { useRouter } from "next/navigation";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { chatService } from "@/shared/services/chatService";
import { v4 as uuidv4 } from "uuid";
import { chatQueryKeys } from "../config/queryKey";
import { routes } from "../config/routes";

export const useCreateChat = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (firstMessage: string) => {
      const chat = await chatService.createChat(null);

      await chatService.sendMessage({
        chatId: chat.data.id,
        content: firstMessage,
        clientMessageId: uuidv4(),
      });

      return chat.data;
    },
    onSuccess: (chat) => {
      queryClient.invalidateQueries({ queryKey: chatQueryKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: chatQueryKeys.messages(chat.id),
      });
      router.push(routes.chat({ chatId: chat.id }));
    },
    onError: (error) => {
      console.error("Ошибка при инициализации чата:", error);
    },
  });
};
