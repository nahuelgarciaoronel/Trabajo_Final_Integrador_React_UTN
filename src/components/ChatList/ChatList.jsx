import styles from './ChatList.module.css';

export default function ChatList({ chats, activeChatId, onSelect, onAdd }) {
  return (
    <div className={styles.list}>
      {(
        chats.map((chat) => (
          <button
            key={chat.id}
            className={`${styles.item} ${chat.id === activeChatId ? styles.active : ''}`}
            onClick={() => onSelect(chat.id)}
          >
            <div className={styles.avatar}>
              {chat.name.charAt(0).toUpperCase()}
            </div>
            <div className={styles.info}>
              <div className={styles.nameRow}>
                <span className={styles.name}>{chat.name}</span>
                <span className={`${styles.status} ${styles[chat.status]}`}>
                  {chat.statusText}
                </span>
              </div>
              {chat.lastMessage && (
                <p className={styles.lastMessage}>{chat.lastMessage}</p>
              )}
            </div>
          </button>
        ))
      )}
      <button className={styles.addButton} onClick={onAdd}>
        + Nuevo chat
      </button>
    </div>
  );
}
