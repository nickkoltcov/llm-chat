"use client";

import Image from "next/image";
import styles from "@/components/messageList/message/message.module.scss";
import clsx from "clsx";
import MediaMessage from "@/components/messageList/mediaMessage/mediaMessage";
import IconCope from "@/shared/assets/icons/cope.svg";
import IconRetry from "@/shared/assets/icons/retry.svg";
import IconCheckMark from "@/shared/assets/icons/checkmark.svg";
import { copyText } from "@/shared/utils/messageUtils";
import { useState } from "react";
import { IFileMeta } from "@/shared/type";

interface MessageProps {
  id: string;
  name: string;
  time?: string;
  text: string;
  files?: IFileMeta[];
  avatar: string;
  role: "user" | "assistant";
  onRetry?: (id: string) => void;
  isMessageLoading?: boolean;
}

export default function Message({
  id,
  name,
  time,
  text,
  files,
  avatar,
  role,
  onRetry,
  isMessageLoading,
}: MessageProps) {
  const [isCopied, setIsCopied] = useState(false);
  const isAI = role === "assistant";

  const onCopyClick = async () => {
    await copyText(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <div className={clsx(styles.message, isAI && styles.isAI)}>
      <Image
        src={avatar || (role === "user" ? "/avatar.png" : "/AI.png")}
        alt={"ава"}
        width={32}
        height={32}
        className={styles.logo}
      />
      <div className={styles.message__content}>
        <div className={styles.message__header}>
          <span className={clsx(styles.message__name, "d-1")}>{name}</span>
          <span className={clsx(styles.message__time, "d-2")}>{time}</span>
          {isAI && (
            <div className={styles.message__button_conteiner}>
              <button
                className={styles.message__button}
                onClick={onCopyClick}
                disabled={isMessageLoading}
              >
                {isCopied ? (
                  <IconCheckMark
                    alt="Скопировано"
                    width={16}
                    height={16}
                  ></IconCheckMark>
                ) : (
                  <IconCope alt="Копировать" width={16} height={16}></IconCope>
                )}
              </button>
              <button
                className={styles.message__button}
                onClick={() => onRetry?.(id)}
              >
                <IconRetry
                  alt="Повторить запрос "
                  width={16}
                  height={16}
                ></IconRetry>
              </button>
            </div>
          )}
        </div>

        {isMessageLoading ? (
          <div className={styles.message__loader} />
        ) : (
          <>
            {text && text.trim() !== "" && (
              <div className={clsx(styles.message__text, "d-5")}>{text}</div>
            )}
            <MediaMessage files={files} />
          </>
        )}
      </div>
    </div>
  );
}
