import askAI from "@/shared/api/aiService";
import { IMessage } from "@/shared/type/index";
import {
  mapMessagesToApiHistory,
  mapApiReplyToAssistantMessage,
} from "@/shared/utils/chatMappers";

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
};
