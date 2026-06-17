import styles from "./mediaMessage.module.scss";
import clsx from "clsx";
import IconFile from "@/shared/assets/icons/File.svg";
import { IFileMeta } from "@/shared/type/index";

interface MediaMessageProps {
  files?: IFileMeta[];
}

export default function MediaMessage({ files }: MediaMessageProps) {
  if (!files || !Array.isArray(files) || files.length === 0) return null;

  return (
    <div className={styles["media-message"]}>
      {files.map((file, index) => {
        const fileName = file.name || "Attached file";

        return (
          <div key={index} className={styles["media-message__file-block"]}>
            <div className={styles["media-message__file-info"]}>
              <span className={styles["media-message__file-icon"]}>
                <IconFile />
              </span>
              <span
                className={clsx(styles["media-message__file-label"], "d-3")}
              >
                {fileName}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
