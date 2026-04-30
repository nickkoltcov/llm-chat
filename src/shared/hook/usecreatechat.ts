import { useRouter } from 'next/navigation';

export const useCreateChat = () => {
  const router = useRouter();

  const createChat = (firstMessage?: string) => {
    const newChatId = Date.now().toString();
    
    const newChat = {
      id: newChatId,
      title: firstMessage || "New Chat",
      messages: firstMessage ? [{
        id: Date.now(),
        role: 'user',
        name: "Mauro Sicard",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: "/avatar.png",
        text: firstMessage
      }] : []
    };

    const history = JSON.parse(localStorage.getItem('chat_history') || '[]');
    localStorage.setItem('chat_history', JSON.stringify([newChat, ...history]));

    window.dispatchEvent(new Event('chatUpdated'));

    router.push(`/chats/${newChatId}`);
  };

  return { createChat };
};
