"use client";

import styles from "@/components/messageList/attachmentMenu/attachmentMenu.module.scss";
import { useState, useRef } from "react";
import clsx from "clsx";

interface AttachmentMenuProps {
  onClose: () => void;
  onFilesSelect: (files: File[]) => void;
}

const MENU_ITEMS = [
  { id: "image", label: "Фотография", filter: "image/*" },
  {
    id: "audio",
    label: "Аудио",
    filter: "audio/mp3,audio/wav,audio/x-m4a,audio/*",
  },
  { id: "video", label: "Видео", filter: "video/mp4,video/webm,video/*" },
  { id: "pdf", label: "Документ (PDF)", filter: "application/pdf" },
];

export default function AttachmentMenu({
  onClose,
  onFilesSelect,
}: AttachmentMenuProps) {
  const [acceptType, setAcceptType] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFilePicker = (typeFilter: string) => {
    setAcceptType(typeFilter);

    setTimeout(() => {
      fileInputRef.current?.click();
    }, 50);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    onFilesSelect(Array.from(e.target.files));
    onClose();
    e.target.value = "";
  };

  return (
    <>
      <div className={styles["dropdown__overlay"]} onClick={onClose} />

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        accept={acceptType}
        style={{ display: "none" }}
      />

      <div className={styles["dropdown"]}>
        {MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => openFilePicker(item.filter)}
            className={clsx(styles["dropdown__item"], "d-3")}
          >
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
}
