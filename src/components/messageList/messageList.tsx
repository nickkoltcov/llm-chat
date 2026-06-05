"use client";

import MessageDate from "@/components/messageList/data/date";
import Message from "@/components/messageList/message/message";
import styles from "@/components/messageList/messageList.module.scss";
import { IMessage } from "@/shared/type/index";
import { useRef, useEffect } from "react";
import { mapApiMessageToClient } from "@/shared/utils/chatMappers";

interface MessageListProps {
  messages: IMessage[];
  startTime?: string;
  onRetry?: (id: string) => void;
  retryingId?: string | null;
}

export default function MessageList({
  messages,
  startTime,
  onRetry,
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
        const AImessage = mapApiMessageToClient(message);
  
        return (
          <Message
            key={AImessage.id} 
            name={AImessage.name}
            time={AImessage.time}
            text={AImessage.text}
            files={AImessage.files}
            avatar={AImessage.avatar}
            id={AImessage.id}
            role={AImessage.role}
            onRetry={onRetry}
            isMessageLoading={AImessage.id === retryingId}
          />
        );
      })}

      <div ref={messagesEndRef} style={{ height: "1px" }} />
    </div>
  );
}
