import {
  IMessage,
  IFileMeta,
  SendMessageAttachment,
  IMessageToApi,
} from "@/shared/type/index";
import { format } from "date-fns";

export function stripDataUrlPrefix(value: string) {
  return value.includes(",") ? value.split(",")[1] : value;
}

export function mapApiMessageToClient(message: IMessageToApi): IMessage {
  return {
    id: message.id,
    role: message.role as "user" | "assistant",
    status: (message.status || "ok") as "ok" | "pending" | "failed",
    text: message.content || "",
    time: format(new Date(message.createdAt), "HH:mm"),
    files: (message.attachments || []).map((att) => ({
      name: att.type === "image" ? "Image" : "Document",
      size: 0,
      type: att.mimeType,
      base64: `data:${att.mimeType};base64,${att.data}`,
    })),
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

export function mapFilesToAttachments(
  files: IFileMeta[] = [],
): SendMessageAttachment[] {
  return files.map(
    (file) =>
      ({
        type: file.type.startsWith("image/") ? "image" : "file",
        mimeType: file.type,
        data: stripDataUrlPrefix(file.base64),
      }) as SendMessageAttachment,
  );
}
