"use client";

import styles from "@/components/formMainPage/formMainPage.module.scss";
import clsx from "clsx";
import Button from "@/shared/ui/button/button";
import PaperPlane from "@/shared/assets/icons/paper-plane.svg";
import { useState } from "react";
import { useCreateChat } from "@/shared/hook/usecreatechat";

export default function FormMainPage() {
  const [text, setText] = useState("");
  const { startChat, isPending } = useCreateChat();

  const isDisabled = !text.trim() || isPending;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim() || isPending) return;

    startChat(text);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={clsx(styles.form__input, "d-5")}
        placeholder="How can I help you?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isPending}
      />
      <Button
        type="submit"
        variant="icon"
        Icon={PaperPlane}
        size="lg"
        iconSize={18}
        className={clsx(
          styles.form__send_btn,
          isDisabled && styles.form__send_btn_disabled,
        )}
        disabled={isDisabled}
      />
    </form>
  );
}
