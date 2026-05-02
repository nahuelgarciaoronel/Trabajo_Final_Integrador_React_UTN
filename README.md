# Chat App Clone

Aplicación de chat clon desarrollada con **React** y **CSS nativo** utilizando **Vite**.

## Funcionalidades

- Panel lateral con lista de chats, avatar, nombre y estado.
- Búsqueda de chats por nombre.
- Creación dinámica de nuevos chats.
- Panel principal con ventana de conversación independiente por chat.
- Envío de mensajes con respuesta automática del bot tras 2 segundos.
- Burbujas diferenciadas: usuario a la derecha, bot a la izquierda.
- Animaciones CSS (fade in) en mensajes.
- Diseño responsive: en pantallas pequeñas se muestra un panel a la vez.

## Estructura del proyecto

- `src/App.jsx` — Estado global y lógica principal.
- `src/components/ChatList/` — Lista de chats.
- `src/components/ChatWindow/` — Ventana de conversación.
- `src/components/MessageBubble/` — Burbuja de mensaje.
- `src/components/SearchBar/` — Barra de búsqueda.
- `src/components/NewChatModal/` — Modal para crear chats.
- Estilos individuales con CSS Modules (`.module.css`).

## Instalación

```bash
npm install
```

## Uso

```bash
npm run dev
```

Abrir [http://localhost:5173] en el navegador.
