import { IMessage, IChat } from '@/shared/type/index';


const STORAGE_KEY = 'chat_history';

export const chatStorageService = {

  getAll(): IChat[] {

    if (typeof window === 'undefined') return [];
    
    try {

      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];

    } catch (error) {

      console.error('Ошибка парсинга chat_history из localStorage, сброс хранилища:', error);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      return [];
    }
  },

  getById(id: string): IChat | undefined {
    return this.getAll().find(chat => chat.id === id);
  },

  saveAll(history: IChat[]): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Не удалось сохранить историю чатов в localStorage:', error);  
    }
  },

  addChat(newChat: IChat): void {
    const history = this.getAll();
    this.saveAll([newChat, ...history]);
  },

  updateChatMessages(chatId: string, updatedMessages: IMessage[]): void {
    const history = this.getAll();
    const updatedHistory = history.map(chat =>
      chat.id === chatId ? { ...chat, messages: updatedMessages } : chat
    );
    this.saveAll(updatedHistory);
  }
};
