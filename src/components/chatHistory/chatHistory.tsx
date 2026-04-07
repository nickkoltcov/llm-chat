import ChatItem from "@/components/chatHistory/chatItem";
import styles from "@/components/chatHistory/chatHistory.module.scss";
import clsx from "clsx";

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

export default function ChatHistory() {
    return (
        <div className={styles.chat_history}>
            <h2 className={clsx(styles.chat_history__title, 'd-2')}>Chat History</h2>
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