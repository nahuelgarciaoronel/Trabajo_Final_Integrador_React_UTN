import { useState, useRef, useEffect } from 'react';
import styles from './ChatWindow.module.css';
import MessageBubble from '../MessageBubble/MessageBubble';

export default function ChatWindow({ chat, onSend, onBack }) {
  const [text, setText] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!chat) return;
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
  };

  

  return (
    <div className={styles.window}>
      <div className={styles.header}>
        <button type="button" className={styles.back} onClick={onBack}>
          ←
        </button>
        <div className={styles.avatar}>{chat.name.charAt(0).toUpperCase()}</div>
        <div className={styles.headerInfo}>
          <span className={styles.headerName}>{chat.name}</span>
          <span className={`${styles.headerStatus} ${styles[chat.status]}`}>
            {chat.statusText}
          </span>
        </div>
      </div>

      <div className={styles.messages}>
        {chat.messages.length === 0 ? (
          <p className={styles.noMessages}>Sin mensajes. ¡Escribí el primero!</p>
        ) : (
          chat.messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              text={msg.text}
              sender={msg.sender}
              timestamp={msg.timestamp}
            />
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.input}
          placeholder="Escribí un mensaje..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className={styles.send} disabled={!text.trim()}>
          Enviar
        </button>
      </form>
    </div>
  );
}
