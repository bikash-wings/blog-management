const SOCKET_EVENTS = {
  CONNECTION: "connection",
  JOIN_ROOM: "join-room",
  MESSAGE_SENT: "message-sent",
  MESSAGE_RECEIVE: "message-receive",
  ERROR: "error",
  DISCONNECTING: "disconnecting",
  DISCONNECT: "disconnect",
  USER_DISCONNECTED: "user-disconnected",
  CONNECT_ERROR: "connect-error",
};

const NOTIFICATIONS_TYPES = {
  CHAT_MESSAGE: "chat-message",
};

const NOTIFICATION_TITLES = {
  CHAT_MESSAGE: "chat-message",
};

module.exports = {
  SOCKET_EVENTS,
  NOTIFICATIONS_TYPES,
  NOTIFICATION_TITLES,
};
