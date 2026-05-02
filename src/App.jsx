import { useState } from 'react';
import styles from './App.module.css';
import SearchBar from './components/SearchBar/SearchBar';
import ChatList from './components/ChatList/ChatList';
import ChatWindow from './components/ChatWindow/ChatWindow';
import NewChatModal from './components/NewChatModal/NewChatModal';

const CONTESTACION_BOT = [
  '¡Interesante! Contame más.',
  'Entiendo, ¿y después qué pasó?',
  'Jaja, me hiciste reír.',
  'No sabía eso, gracias por compartirlo.',
  'Estoy de acuerdo con vos.',
  '¿Y qué pensás hacer al respecto?',
  'Dale, seguí contando.',
  'Uh, qué complicado.',
];

function getStatusText(status) {
  if (status === 'online') return 'En línea';
  if (status === 'offline') return 'Desconectado';
  return 'Ausente';
}

function createChat(name, status) {
  return {
    id: crypto.randomUUID(),
    name,
    status,
    statusText: getStatusText(status),
    messages: [],
    lastMessage: '',
  };
}

function createMessage(text, sender) {
  const now = new Date();
  const time = now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
  return {
    id: crypto.randomUUID(),
    text,
    sender,
    timestamp: time,
  };
}

const INITIAL_CHATS = [
  createChat('Charly', 'online'),
  createChat('Indio', 'away'),
  createChat('Pappo', 'offline'),
  createChat('Ricardo', 'away')
];

export default function App() {
  const [chats, setChats] = useState(() => INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState(() => INITIAL_CHATS[0].id);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showChatOnMobile, setShowChatOnMobile] = useState(false);

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeChat = chats.find((chat) => chat.id === activeChatId) || null;

  const handleSelectChat = (id) => {
    setActiveChatId(id);
    setShowChatOnMobile(true);
  };

  const handleBackToList = () => {
    setShowChatOnMobile(false);
  };

  const handleCreateChat = ({ name, status }) => {
    const newChat = createChat(name, status);
    setChats((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    setShowChatOnMobile(true);
  };

  const handleSendMessage = (text) => {
    if (!activeChatId) return;

    const userMsg = createMessage(text, 'user');

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChatId
          ? {
              ...chat,
              messages: [...chat.messages, userMsg],
              lastMessage: userMsg.text,
            }
          : chat
      )
    );

    setTimeout(() => {
      const reply = CONTESTACION_BOT[Math.floor(Math.random() * CONTESTACION_BOT.length)];
      const botMsg = createMessage(reply, 'bot');
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === activeChatId
            ? {
                ...chat,
                messages: [...chat.messages, botMsg],
                lastMessage: botMsg.text,
              }
            : chat
        )
      );
    }, 2000);
  };

  return (
    <div className={styles.app}>
      <aside
        className={`${styles.sidebar} ${showChatOnMobile ? styles.hideMobile : ''}`}
      >
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <ChatList
          chats={filteredChats}
          activeChatId={activeChatId}
          onSelect={handleSelectChat}
          onAdd={() => setIsModalOpen(true)}
        />
      </aside>

      <main
        className={`${styles.main} ${!showChatOnMobile ? styles.hideMobile : ''}`}
      >
        <ChatWindow
          chat={activeChat}
          onSend={handleSendMessage}
          onBack={handleBackToList}
        />
      </main>

      <NewChatModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateChat}
      />
    </div>
  );
}
