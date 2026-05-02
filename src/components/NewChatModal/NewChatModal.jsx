import { useState } from 'react';
import styles from './NewChatModal.module.css';

export default function NewChatModal({ isOpen, onClose, onCreate }) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('online');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate({ name: name.trim(), status });
    setName('');
    setStatus('online');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>Nuevo chat</h3>
        <form onSubmit={handleSubmit}>
          <label className={styles.label}>
            Nombre
            <input
              type="text"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </label>
            <div className={styles.actions}>
            <button type="button" className={styles.cancel} onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className={styles.confirm}>
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
