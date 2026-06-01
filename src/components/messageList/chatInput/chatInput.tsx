"use client";

import styles from "@/components/messageList/chatInput/chatInput.module.scss";
import PaperPlane from "@/shared/assets/icons/paper-plane.svg";
import Button from "@/shared/ui/button/button";
import clsx from "clsx";
import { useState } from "react";
import { IMessage } from "@/shared/type/index";
import IconClip from "@/shared/assets/icons/clip.svg";
import AttachmentMenu from "@/components/messageList/attachmentMenu/attachmentMenu";
import AttachmentsList from "@/components/messageList/attachmentsList/attachmentsList";
import { createUserMessage } from "@/shared/utils/chatMappers";

interface ChatInputProps {
  onAddMessage: (message: IMessage) => void;
  isLoading: boolean;
  clearError: () => void;
}

export default function ChatInput({
  onAddMessage,
  isLoading,
  clearError,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  const handleSend = () => {
    const hasContent = message.trim() || attachedFiles.length > 0;
    if (!hasContent || isLoading) return;
    const userMessage = createUserMessage(message, attachedFiles);
    onAddMessage(userMessage);
    setMessage("");
    setAttachedFiles([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFilesSelect = (files: File[]) => {
    setAttachedFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setAttachedFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove),
    );
  };

  const isButtonDisabled =
    (!message.trim() && attachedFiles.length === 0) || isLoading;

  return (
    <form
      className={styles["chat-input"]}
      onSubmit={(e) => {
        e.preventDefault();
        handleSend();
        clearError();
      }}
    >
      <AttachmentsList files={attachedFiles} onRemoveFile={handleRemoveFile} />

      <textarea
        value={message}
        disabled={isLoading}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className={styles["chat-input__field"]}
        placeholder="How can I help you?"
      />

      <div className={styles["chat-input__controls"]}>
        <button
          className={styles["chat-input__clip"]}
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          disabled={isLoading}
        >
          <IconClip alt="Добавить файл" width={16} height={16}></IconClip>
        </button>

        {isMenuOpen && (
          <AttachmentMenu
            onClose={() => setIsMenuOpen(false)}
            onFilesSelect={handleFilesSelect}
          />
        )}

        <Button
          disabled={isButtonDisabled}
          type="submit"
          variant="primary"
          Icon={PaperPlane}
          size="send"
          iconSize={11}
          className={clsx(
            styles["chat-input__button"],
            "d-2",
            isButtonDisabled && styles["chat-input__button_disabled"],
          )}
        >
          {isLoading ? "Thinking..." : "Send message"}
        </Button>
      </div>
    </form>
  );
}
