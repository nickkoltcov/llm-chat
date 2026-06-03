import styles from "@/app/(application)/chats/[chatsid]/chat-page.module.scss";
import ChatContainer from "@/components/chatContainer/chatContainer";

interface ChatPageProps {
  params: Promise<{ chatsid: string }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { chatsid } = await params;

  return (
    <section className={styles.chat}>
      <ChatContainer chatsid={chatsid} />
    </section>
  );
}
