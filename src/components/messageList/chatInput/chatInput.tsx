'use client'

import styles from '@/components/messageList/chatInput/chatInput.module.scss';
import PaperPlane from '@/shared/assets/icons/paper-plane.svg';
import Button from '@/shared/ui/button/button';
import clsx from 'clsx';
import { useState } from 'react';
import { IMessage } from '@/shared/type/index';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

interface ChatInputProps {
  onAddMessage: (message: IMessage) => void;
  isLoading: boolean
}

export default function ChatInput({ onAddMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('')
  
  const handleSend = () => {
    
    if (!message.trim() || isLoading) return;

    const userMessage: IMessage = {
      id: uuidv4(),
      role: 'user',
      name: "Mauro Sicard",
      time: format(new Date(), 'HH:mm'),
      avatar: "/avatar.png",
      text: message
    };

    onAddMessage(userMessage);
    setMessage('');

  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  return (
    <form className={styles['chat-input']} onSubmit={(e) => {
      e.preventDefault();
      handleSend();
    }}>
      <textarea
        value={message}
        disabled={isLoading}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown} 
        className={styles['chat-input__field']} 
        placeholder="How can I help you?"
      />
      <Button
        onClick={handleSend}
        disabled={!message.trim() || isLoading}
        type='submit' 
        variant="primary" 
        Icon={PaperPlane} 
        size="send" 
        iconSize={11} 
        className={clsx(styles['chat-input__button'], 'd-2',(isLoading || !message.trim()) && styles['chat-input__button_disabled']
        )}
      >
        {isLoading ? "Thinking..." : "Send message"}
      </Button>
    </form>
  );
};
