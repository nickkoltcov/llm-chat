import askAI from "@/shared/api/aiService";
import { IMessage, IChat, IFileMeta } from "@/shared/type/index";
import {
  mapMessagesToApiHistory,
  mapApiReplyToAssistantMessage,
} from "@/shared/utils/chatMappers";
import { apiFetch } from "../api/api-client";

export const chatService = {
  async getAssistantReply(messages: IMessage[]): Promise<IMessage> {
    const apiHistory = await mapMessagesToApiHistory(messages);
    const gptReply = await askAI(apiHistory);

    if (gptReply && gptReply.error) {
      throw new Error(
        gptReply.message || "Selected model does not support this file type.",
      );
    }

    return mapApiReplyToAssistantMessage(gptReply);
  },


  async getChats({ limit, cursor }: { limit: number; cursor: string | null }) {
    const url = `chats?limit=${limit}${cursor ? `&cursor=${cursor}` : ""}`;
    const response = await apiFetch(url);
    return await response.json();
  },

  async getChat(chatId:string): Promise<IChat> {
    const response = await apiFetch(`chats/${chatId}`)
    return await response.json()
  },

  async createChat(title: string | null) {
     const response = await apiFetch('chats/create', {method: 'POST', body: JSON.stringify({ title })} )
     return await response.json()
  },

  async getChatMessages(chatId: string): Promise<{ data: IMessage[]; nextCursor: string | null }> {
    const response = await apiFetch(`chats/${chatId}/messages?limit=100&order=asc`);
    return await response.json();
  },

  async sendMessage({ chatId, content, clientMessageId, files }: { chatId: string; content: string; clientMessageId: string; files?:IFileMeta[] }) {
    const attachments = (files || []).map((file) => {
      const cleanBase64 = file.base64.split(",")[1] || file.base64;
      return {
        type: file.type.startsWith("image/") ? "image" : "file",
        mimeType: file.type,
        data: cleanBase64
      };
     })
    const response = await apiFetch(`chats/${chatId}/sendMessage`, {method: 'POST', body: JSON.stringify({ content, clientMessageId, model: "openrouter/free", attachments }) })
    return await response.json()
  }


};
