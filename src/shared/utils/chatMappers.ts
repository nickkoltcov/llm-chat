import { IMessage, IFileMeta, MessageContentBlock } from "@/shared/type/index";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { buildFileBlocks } from "./fileHelpers";



export async function mapMessagesToApiHistory(messages: IMessage[]) {
  return messages.map((message) => {
    if (message.files && message.files.length > 0) {
      const contentBlocks: MessageContentBlock[] = [];

      if (message.text.trim() !== "") {
        contentBlocks.push({ type: "text", text: message.text });
      }

      const fileBlocks = buildFileBlocks(message.files);
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
  });
}


export function mapApiMessageToClient(message: any): IMessage {
  const isAI = message.role === "assistant";

  return {
    id: message.id,
    role: message.role,
    status: message.status || "ok",
    text: message.content || "",
    name: isAI ? "AI Assistant" : "Mauro Sicard",
    time: message.createdAt 
      ? new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) 
      : "", 
    
    avatar: message.avatar || (isAI ? "/AI.png" : "/avatar.png"),
    files: (message.attachments || []).map((att: any) => ({
      name: att.type === "image" ? "Image" : "Document",
      size: 0,
      type: att.mimeType,
      base64: `data:${att.mimeType};base64,${att.data}`,
    })),
  };
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

export async function convertFileToMeta(file: File): Promise<IFileMeta> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve({
          name: file.name,
          size: file.size,
          type: file.type,
          base64: reader.result,
        });
      } else {
        reject(new Error("Не удалось прочитать файл"));
      }
    };
    reader.onerror = () => reject(reader.error || new Error("Ошибка чтения"));
    reader.readAsDataURL(file);
  });
}

export function createUserMessage(
  text: string,
   attachedFiles: IFileMeta[],
): IMessage {
  return {
    id: uuidv4(),
    role: "user",
    name: "Mauro Sicard",
    time: format(new Date(), "HH:mm"),
    avatar: "/avatar.png",
    text: text,
    files: attachedFiles,
    status: 'ok'
  };
}
