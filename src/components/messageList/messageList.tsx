'use client'

import MessageDate from '@/components/messageList/data/date'
import Message from '@/components/messageList/message/message'
import styles from '@/components/messageList/messageList.module.scss'
import { IMessage } from '@/shared/type/index'
import { useRef, useEffect } from 'react'


interface MessageListProps {
  messages: IMessage[];
  startTime?:string
}


export default function MessageList({ messages,startTime }:MessageListProps) {

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); 

  return (
    <div className={styles.messages}>

      {startTime && <MessageDate time={startTime} />}
      {messages.map((massage) => (
        <Message 
          key={massage.id}
          name={massage.name}
          time={massage.time}
          text={massage.text}
          avatar={massage.avatar}
          isAI={massage.role === 'assistant'}
        />
      ))}

      <div ref={messagesEndRef} style={{ height: '1px' }} />

    </div>
  )
}
