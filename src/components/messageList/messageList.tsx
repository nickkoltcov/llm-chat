"use client";

import MessageDate from "@/components/messageList/data/date";
import Message from "@/components/messageList/message/message";
import styles from "@/components/messageList/messageList.module.scss";
import { IMessage } from "@/shared/type/index";
import { useRef, useEffect } from "react";
import { MESSAGE_AUTHOR } from "@/shared/constants/constants";

interface MessageListProps {
  messages: IMessage[];
  startTime?: string;
  // onRetry?: (id: string) => void;
  retryingId?: string | null;
}

export default function MessageList({
  messages,
  startTime,
  retryingId,
}: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={styles.messages}>
      {startTime && <MessageDate time={startTime} />}
      {messages.map((message) => {
        const author = MESSAGE_AUTHOR[message.role];

        return (
          <Message
            key={message.id}
            name={author.name}
            time={message.time}
            text={message.text}
            files={message.files}
            avatar={author.avatar}
            id={message.id}
            role={message.role}
            // onRetry={onRetry}
            isMessageLoading={message.id === retryingId}
          />
        );
      })}

      <div ref={messagesEndRef} style={{ height: "1px" }} />
    </div>
  );
}
