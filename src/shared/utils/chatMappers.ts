import { IMessage } from "@/shared/type/index";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { buildFileBlocks } from "./fileHelpers";

export async function mapMessagesToApiHistory(messages: IMessage[]) {
  return Promise.all(
    messages.map(async (message) => {
      if (message.files && message.files.length > 0) {
        const contentBlocks: any[] = [];

        if (message.text.trim() !== "") {
          contentBlocks.push({ type: "text", text: message.text });
        }

        const fileBlocks = await buildFileBlocks(message.files);
        contentBlocks.push(...fileBlocks);

        return {
          role: message.role,
          content: contentBlocks,
        };
      }

      return {
        role: message.role,
        content: message.text,
      };
    }),
  );
}

export function mapApiReplyToAssistantMessage(gptReply: any): IMessage {
  return {
    id: uuidv4(),
    role: "assistant",
    name: "LanguageGUI",
    time: format(new Date(), "HH:mm"),
    avatar: "/AI.png",
    text: gptReply.reply || gptReply,
  };
}

export function createUserMessage(
  text: string,
  attachedFiles: File[],
): IMessage {
  return {
    id: uuidv4(),
    role: "user",
    name: "Mauro Sicard",
    time: format(new Date(), "HH:mm"),
    avatar: "/avatar.png",
    text: text,
    files: attachedFiles,
  };
}
