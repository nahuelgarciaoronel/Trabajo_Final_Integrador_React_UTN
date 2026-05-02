import styles from './SearchBar.module.css';

export default function SearchBar({ value, onChange }) {
  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.input}
        placeholder="Buscar chat..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
