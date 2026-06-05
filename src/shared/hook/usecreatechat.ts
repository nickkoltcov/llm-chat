import { useRouter } from "next/navigation";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { chatService } from "@/shared/services/chatService";

export const useCreateChat = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate: startChat, isPending } = useMutation({
    mutationFn: async (title: string | null) => {

      const createChat = await chatService.createChat(title);
      
      return { response: createChat, title };
    },
    onSuccess: ({ response, title }) => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
      const messageParam = title ? `?message=${encodeURIComponent(title)}` : '';
      router.push(`/chats/${response.data.id}${messageParam}`);
    },
    onError: (error) => {
      console.error("Ошибка при инициализации чата:", error);
    },
  });
  return { startChat, isPending };
};