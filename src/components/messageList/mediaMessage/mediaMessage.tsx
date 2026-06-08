import styles from "./mediaMessage.module.scss";
import clsx from "clsx";
import IconFile from "@/shared/assets/icons/File.svg";
import { IMessageContentBlock, IFileMeta } from "@/shared/type/index";

interface MediaMessageProps {
  files?: IFileMeta[];
}

const FILE_CONFIG: Record<string, { label: string }> = {
  file: { label: "Document (PDF)" },
  video_url: { label: "Video" },
  input_audio: { label: "Audio" },
};

export default function MediaMessage({ files }: MediaMessageProps) {
  if (!files || !Array.isArray(files) || files.length === 0) return null;

  return (
    <div className={styles["media-message"]}>
      {files.map((file, index) => {
        // Проверяем, является ли файл изображением
        const isImage = file.type.startsWith("image/");

        if (isImage) {
          return (
            <div key={index} className={styles["media-message__image-wrap"]}>
              <img
                src={file.base64} // Берем данные напрямую из base64 строки
                alt={file.name || "Вложение"}
                className={styles["media-message__image"]}
                loading="lazy"
              />
            </div>
          );
        }

        // Если это документ (например, application/pdf)
        return (
          <div key={index} className={styles["media-message__file-block"]}>
            <div className={styles["media-message__file-info"]}>
              <span className={styles["media-message__file-icon"]}>
                <IconFile />
              </span>
              <span
                className={clsx(styles["media-message__file-label"], "d-3")}
              >
                {file.name || "Document"}
              </span>
            </div>
            {file.size > 0 && (
              <span className={clsx(styles["media-message__file-size"], "d-2")}>
                {(file.size / 1024).toFixed(1)} KB
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
