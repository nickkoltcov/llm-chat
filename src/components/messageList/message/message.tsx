"use client";

import Image from "next/image";
import styles from "@/components/messageList/message/message.module.scss";
import clsx from "clsx";
import MediaMessage from "@/components/messageList/mediaMessage/mediaMessage";

interface MessageProps {
  name: string;
  time?: string;
  text: string | any[];
  avatar: string;
  isAI?: boolean;
}

export default function Message({
  name,
  time,
  text,
  avatar,
  isAI,
}: MessageProps) {
  const formattedBlocks =
    typeof text === "string" ? [{ type: "text", text }] : text;

  return (
    <div className={clsx(styles.messege, isAI && styles.isAI)}>
      <Image
        src={avatar}
        alt={name}
        width={32}
        height={32}
        className={styles.logo}
      />
      <div className={styles.messege__content}>
        <div className={styles.messege__header}>
          <span className={clsx(styles.messege__name, "d-1")}>{name}</span>
          <span className={clsx(styles.messege__time, "d-2")}>{time}</span>
        </div>

        <MediaMessage blocks={formattedBlocks} />
      </div>
    </div>
  );
}
