import styles from "./mediaMessage.module.scss";
import clsx from "clsx";
import IconFile from "@/shared/assets/icons/File.svg";
import { MessageContentBlock } from '@/shared/type/index'

interface MediaMessageProps {
  blocks: MessageContentBlock[];
}

const FILE_CONFIG: Record<string, { label: string }> = {
  file: { label: "Document (PDF)" },
  video_url: { label: "Video" },
  input_audio: { label: "Audio" },
};

export default function MediaMessage({ blocks }: MediaMessageProps) {
  if (!blocks || !Array.isArray(blocks)) return null;

  return (
    <div className={styles["media-message"]}>
      {blocks.map((block, index) => {
        if (block.type === "text") {
          return (
            <div
              key={index}
              className={clsx(styles["media-message__text"], "d-5")}
            >
              {block.text}
            </div>
          );
        }

        if (block.type === "image_url") {
          return (
            <div key={index} className={styles["media-message__image-wrap"]}>
              <img
                src={block.image_url?.url}
                alt="Вложение"
                className={styles["media-message__image"]}
              />
            </div>
          );
        }

        if (FILE_CONFIG[block.type]) {

          
          const originalFileName =
            block.name ||
            block.file?.filename ||
            FILE_CONFIG[block.type].label;

          return (
            <div key={index} className={styles["media-message__file-block"]}>
              <div className={styles["media-message__file-info"]}>
                <span className={styles["media-message__file-icon"]}>
                  <IconFile />
                </span>
                <span
                  className={clsx(styles["media-message__file-label"], "d-3")}
                >
                  {originalFileName}
                </span>
              </div>
              <span className={clsx(styles["media-message__file-size"], "d-2")}>
                {block.size}
              </span>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
