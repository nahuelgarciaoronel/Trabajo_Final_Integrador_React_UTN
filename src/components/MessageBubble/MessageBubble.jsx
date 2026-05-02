import styles from './MessageBubble.module.css';

export default function MessageBubble({ text, sender, timestamp }) {
  const isUser = sender === 'user';

  return (
    <div className={`${styles.wrapper} ${isUser ? styles.user : styles.bot}`}>
      <div className={`${styles.bubble} ${isUser ? styles.userBubble : styles.botBubble}`}>
        <p className={styles.text}>{text}</p>
        <span className={styles.time}>{timestamp}</span>
      </div>
    </div>
  );
}
