import { formatBytes } from "@/shared/utils/formatBytes";
import { IFileMeta, MessageContentBlock } from "../type";

export async function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Не удалось прочитать файл"));
      }
    };

    reader.onerror = () => {
      reject(reader.error || new Error("Ошибка при чтении файла"));
    };

    reader.readAsDataURL(file);
  });
}

export  function buildFileBlocks(files: IFileMeta[]): MessageContentBlock[] {
  const blocks: MessageContentBlock[] = [];

  for (const item of files) {
    const fileSize = formatBytes(item.size);
    const fileName = item.name;

    if (item.type.startsWith("image/")) {
      blocks.push({
        type: "image_url",
        image_url: {
          url: item.base64,
          name: fileName,
          size: fileSize,
        },
      });
    } else if (item.type === "application/pdf") {
      blocks.push({
        type: "file",
        name: fileName,
        size: fileSize,
        file: {
          filename: fileName,
          file_data: item.base64,
        },
      });
    } else if (item.type.startsWith("video/")) {
      blocks.push({
        type: "video_url",
        url: item.base64,
        name: fileName,
        size: fileSize,
      });
    } else if (item.type.startsWith("audio/")) {
      const commaIndex = item.base64.indexOf(",");
      const cleanBase64 = item.base64.slice(commaIndex + 1);
      const audioFormat = item.type.split("/")[1] || "mp3";

      blocks.push({
        type: "input_audio",
        name: fileName,
        size: fileSize,
        input_audio: {
          data: cleanBase64,
          format: audioFormat,
        },
      });
    }
  }

  return blocks;
}
