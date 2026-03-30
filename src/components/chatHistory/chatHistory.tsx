import { ChatItem } from "@/components/chatHistory/chatItem";
import styles from "@/components/chatHistory/chatHistory.module.scss";

const CHAT_MOCKS = [
    "Quis ipsum suspendisse",
    "Ut tristique et egestas quis ipsum sus",
    "Sed viverra tellus inhac",
    "Eros in cursus turpis massa",
    "Dictum at tempor commodo ullamcorper",
    "Morbi tristique senectus et",
    "Dictum at tempor commodo ullamcorper",
    "Dictum at tempor commodo ullamcorper",
    "Dictum at tempor commodo ullamcorper",
    "Dictum at tempor commodo ullamcorper",
    "Dictum at tempor commodo ullamcorper",
    "Dictum at tempor commodo ullamcorper",
    "Dictum at tempor commodo ullamcorper",
    "Dictum at tempor commodo ullamcorper",
    "Dictum at tempor commodo ullamcorper",
    "Dictum at tempor commodo ullamcorper",
    "Dictum at tempor commodo ullamcorper",
    "Dictum at tempor commodo ullamcorper",
    "Dictum at tempor commodo ullamcorper",
    
]

export const ChatHistory = () => {
    return (
        <div className={styles.chat_history}>
            {/* Этот заголовок будет зафиксирован */}
            <h2 className={styles.chat_history__title}>Chat History</h2>
            
            {/* Этот блок будет скроллиться */}
            <nav className={styles.chat_history__nav}>
                <ul className={styles.chat_history__list}>
                    {CHAT_MOCKS.map((text, index) => (
                        <ChatItem key={index} title={text} href="/" />
                    ))}
                </ul>
            </nav>
        </div>
    )
}