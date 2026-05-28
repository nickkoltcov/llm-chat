"use client";

import Image from "next/image";
import styles from "@/components/messageList/message/message.module.scss";
import clsx from "clsx";
import MediaMessage from "@/components/messageList/mediaMessage/mediaMessage";
import { useState } from "react";
import IconCope from '@/shared/assets/icons/cope.svg'
import IconRetry from '@/shared/assets/icons/retry.svg'

interface MessageProps {
  id:string;
  name: string;
  time?: string;
  text: string | any[];
  avatar: string;
  role: "user" | "assistant";
  onRetry?: (id: string) => void;
}

export default function Message({ id, name, time, text, avatar, role, onRetry }: MessageProps) {

  const [isCopied, setIsCopied] = useState(false);

  const formattedBlocks = typeof text === "string" 
    ? [{ type: "text", text }] 
    : text;

  const isAI = role === "assistant"

  
  const getCleanText = (): string => {
    const blocks = Array.isArray(text) ? text : [{ type: "text", text }];
    return blocks.filter((block) => block?.type === "text").map((block) => block.text).join("\n");
  };

  const handleCopy = async () => {
    const copyText = getCleanText()

    if(copyText === '') return 

    try {
      await navigator.clipboard.writeText(copyText);
    } catch(error) {
        const textarea = document.createElement("textarea");
        textarea.value = copyText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
  }

  return (
    <div className={clsx(styles.messege, isAI && styles.isAI)}>
      <Image src={avatar} alt={name} width={32} height={32} className={styles.logo} />
      <div className={styles.messege__content}>
        <div className={styles.messege__header}>
          <span className={clsx(styles.messege__name, "d-1")}>{name}</span>
          <span className={clsx(styles.messege__time, "d-2")}>{time}</span>
          {isAI && (
          <div className={styles.messege__button_conteiner}>
            <button className={styles.messege__button} onClick={handleCopy}>
              <IconCope alt="Открыть сайдбар" width={16} height={16}></IconCope>
            </button>
            <button className={styles.messege__button} onClick={() => onRetry?.(id)}>
              <IconRetry alt="Открыть сайдбар" width={16} height={16}></IconRetry>
            </button>
          </div>
        )}
        </div>
        
        <MediaMessage blocks={formattedBlocks} />
      </div>
    </div>
  );
}