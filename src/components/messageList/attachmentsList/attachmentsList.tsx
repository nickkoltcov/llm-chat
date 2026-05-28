"use client";

import clsx from "clsx";
import styles from "./attachmentsList.module.scss";
import IconCross from "@/shared/assets/icons/cross.svg";

interface AttachmentsListProps {
  files: File[];
  onRemoveFile: (index: number) => void;
}

export default function AttachmentsList({
  files,
  onRemoveFile,
}: AttachmentsListProps) {
  if (files.length === 0) return null;

  return (
    <div className={styles["attachments"]}>
      {files.map((file, index) => {
        const isImage = file.type.startsWith("image/");

        return (
          <div key={index} className={styles["attachments__item"]}>
            {isImage ? (
              <div className={styles["attachments__preview-wrapper"]}>
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className={styles["attachments__image-preview"]}
                  onLoad={(e) =>
                    URL.revokeObjectURL((e.target as HTMLImageElement).src)
                  }
                />
              </div>
            ) : (
              <div className={styles["attachments__file-card"]}>
                <div className={styles["attachments__file-info"]}>
                  <span
                    className={clsx(styles["attachments__file-name"], "d-2")}
                  >
                    {file.name}
                  </span>
                  <span
                    className={clsx(styles["attachments__file-size"], "d-2")}
                  >
                    {(file.size / 1024 / 1024).toFixed(1)} MB
                  </span>
                </div>
              </div>
            )}
            <button
              type="button"
              onClick={() => onRemoveFile(index)}
              className={styles["attachments__item-remove"]}
            >
              <IconCross width={8} height={8} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
