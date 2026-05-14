import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { chatStorageService } from '@/services/chatStorage';
import { IChat } from '@/shared/type/index';
import askAI from '@/services/aiServise';
import { useQueryClient } from '@tanstack/react-query';
import { CHAT_HISTORY_QUERY_KEY } from '@/components/chatHistory/chatHistory';


export const useCreateChat = () => {

  const router = useRouter();
  const queryClient = useQueryClient();

  const startChat = async (firstMessage: string) => {
    const newChatId = uuidv4();
    const currentTime = format(new Date(), 'HH:mm');
    
    const userMessage = {
      id: uuidv4(),
      role: 'user' as const,
      name: "Mauro Sicard",
      time: currentTime,
      avatar: "/avatar.png",
      text: firstMessage
    };

    try {
      const gptReply = await askAI([{ role: 'user', content: firstMessage }]);
      
      const aiMessage = {
        id: uuidv4(),
        role: 'assistant' as const,
        name: "LanguageGUI",
        time: format(new Date(), 'HH:mm'),
        avatar: "/AI.png",
        text: gptReply
      };

      const newChat: IChat = {
        id: newChatId,
        title: firstMessage.slice(0, 30),
        messages: [userMessage, aiMessage] 
      };

      chatStorageService.addChat(newChat);
      queryClient.invalidateQueries({ queryKey: CHAT_HISTORY_QUERY_KEY });
      router.push(`/chats/${newChatId}`);
    } catch (error) {
      console.error("Ошибка при инициализации чата:", error);
    }
  };

  return { startChat };
}