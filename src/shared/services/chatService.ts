import {
  IChat,
  IGetChatsResponse,
  ICreateChatResponse,
  IDataMessage,
  ISendMessageResponse,
  SendMessageAttachment,
} from "@/shared/type/index";
import { apiClient } from "../api/api-client";

export const chatService = {
  async getChats({ limit, cursor }: { limit: number; cursor: string | null }) {
    const response = await apiClient.get<IGetChatsResponse>("/chats", {
      params: {
        limit: limit,
        cursor: cursor || undefined,
      },
    });
    return response.data;
  },

  async getChat(chatId: string) {
    const response = await apiClient.get<IChat>(`chats/${chatId}`);
    return response.data;
  },

  async createChat(title: string | null) {
    const response = await apiClient.post<ICreateChatResponse>("chats/create", {
      title,
    });
    return response.data;
  },

  async sendMessage({
    chatId,
    content,
    clientMessageId,
    attachments,
  }: {
    chatId: string;
    content: string;
    clientMessageId: string;
    attachments?: SendMessageAttachment[];
  }) {
    const response = await apiClient.post<ISendMessageResponse>(
      `chats/${chatId}/sendMessage`,
      { content, clientMessageId, model: "openrouter/free", attachments },
    );
    return response.data;
  },

  async getChatMessages(chatId: string) {
    const response = await apiClient.get<IDataMessage>(
      `chats/${chatId}/messages`,
      {
        params: {
          limit: 100,
          order: "asc",
        },
      },
    );

    return response.data;
  },
};
