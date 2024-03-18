const { createServer } = require("http");
const { instrument } = require("@socket.io/admin-ui");
const { Server } = require("socket.io");

const jwt = require("jsonwebtoken");
// const config = require("../config/config");

const app = require("../server");
const db = require("../models");
const { authenticateSocketUser } = require("../middlewares/socket");

console.log("Socket file imported $$$$$$$$$$$$$$$$$$$$$$$$ ");

// const { MESSAGES } = require("./messages");
// const { sendNotificationsToUsers } = require("./firebaseCommons");
// const { getComplaintPropertyUsers, getTaskPropertyUsers } = require("./propertyCommons");
const {
  SOCKET_EVENTS,
  NOTIFICATIONS_TYPES,
  NOTIFICATION_TITLES,
} = require("./constants");
// const { generateUsername } = require("./common");
const {
  CONNECTION,
  JOIN_ROOM,
  MESSAGE_SENT,
  MESSAGE_RECEIVE,
  ERROR,
  DISCONNECTING,
  DISCONNECT,
  USER_DISCONNECTED,
  CONNECT_ERROR,
} = SOCKET_EVENTS;
// const { getUserDetailsQuery } = require("../utils/dbCommons");
// const { sendNotifications } = require("../services/notifications");

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    // origin: ["https://rcapp.wtshub.com", "http://10.13.1.69:8080", "https://admin.socket.io", "http://localhost:5173"],
    origin: "*",
    // credentials: true,
  },
});

// const rooms = new Map();

// /**
//  * validate token on socket connection
//  * validateToken will token from io.use
//  * @param {String} token
//  * @return {string|Error}
//  */

// const validateToken = async (token) => {
//   // Perform JWT verification asynchronously
//   return new Promise((resolve, reject) => {
//     jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
//       if (err) {
//         reject(new Error("Invalid token"));
//       } else {
//         resolve(decoded);
//       }
//     });
//   });
// };

// /**
//  * function to check roomCode is valid or not
//  * @param socket
//  * @param {String} roomCode
//  * @returns {Boolean}
//  */

// const checkValidRoom = async (socket, roomCode) => {
//   try {
//     const q = {
//       where: {
//         room_id: roomCode,
//         is_deleted: false,
//       },
//     };

//     const checkRoom = await db.conversations.count(q);

//     if (checkRoom || checkRoom > 0) {
//       return true;
//     }
//     return false;
//   } catch (error) {
//     console.error("Error sending message:", error);
//     io.to(roomCode).emit(ERROR, error);
//     socket.emit(ERROR, error.message);
//   }
// };

// /**
//  * function to join room with room code
//  *
//  * @param socket
//  * @param {String} roomCode
//  *
//  */

// const joinRoom = async (socket, roomCode) => {
//   try {
//     // const checkRoom = await checkValidRoom(socket, roomCode);
//     // if (checkRoom) {
//     socket.join(roomCode);

//     if (!rooms.has(roomCode)) {
//       rooms.set(roomCode, new Set());
//     }

//     rooms.get(roomCode).add(socket.id);
//     // }
//   } catch (error) {
//     console.error("Error joining room:", error);
//     io.to(roomCode).emit(ERROR, error);
//     socket.emit(ERROR, error.message);
//   }
// };

// /**
//  * function to get message and send it to room
//  *
//  * @param socket
//  * @param {String} roomCode
//  * @param {Object} msg
//  *
//  */

// const sendMessage = async (socket, roomCode, msg) => {
//   const {
//     conversation_type: conversationType,
//     chat_type: chatType,
//     message,
//     status,
//     sender_id: senderId,
//   } = msg;
//   try {
//     // const checkUser = {
//     //   where: {
//     //     id: senderId,
//     //     status: true,
//     //   },
//     //   include: [{ ...getUserDetailsQuery({ attributes: ["fcm_token"] }) }],
//     //   raw: true,
//     // };

//     // const getUser = await db.users.findOne(checkUser);

//     // if (!getUser) {
//     //   throw new Error(MESSAGES.noUserFound);
//     // }

//     // const checkRoom = await checkValidRoom(socket, roomCode);
//     const checkRoom = true;
//     let newConversation = {};
//     if (checkRoom) {
//       const conversationData = {
//         conversation_type: conversationType,
//         chat_type: chatType,
//         room_id: roomCode,
//         message,
//         status: status || "",
//         added_by: senderId,
//       };
//       newConversation = await db.conversations.create(conversationData);

//       const messageObj = msg;
//       messageObj.user = getUser;
//       messageObj.message_id = newConversation.dataValues.id;
//       messageObj.created_at = newConversation.dataValues.created_at;

//       io.to(roomCode).emit(MESSAGE_RECEIVE, messageObj);
//     } else {
//       io.emit(MESSAGE_RECEIVE, "Invalid room");
//     }
//     let tokensToSend = [],
//       notificationUsers = [],
//       complaintId,
//       taskId;

//     if (conversationType === "complaint") {
//       //complaint
//       //   let complaintUsers = await getComplaintPropertyUsers(roomCode, senderId);
//       //   notificationUsers = complaintUsers.notificationUsers;
//       //   tokensToSend = complaintUsers.tokensToSend;
//       //   complaintId = complaintUsers.id;
//     } else {
//       //task
//       //   let taskUsers = await getTaskPropertyUsers(roomCode, senderId);
//       //   notificationUsers = taskUsers.notificationUsers;
//       //   tokensToSend = taskUsers.tokensToSend;
//       //   taskId = taskUsers.id;
//     }

//     if (tokensToSend && tokensToSend.length > 0) {
//       if (getUser && getUser["user_details.fcm_token"]) {
//         let screen_data = {
//           conversation_type: conversationType,
//           chat_type: chatType,
//           room_id: roomCode,
//           task_id: taskId && taskId,
//           complaint_id: complaintId && complaintId,
//           created_at: newConversation.created_at,
//           id: senderId,
//           first_name: getUser.first_name,
//           last_name: getUser.last_name,
//         };

//         // let message = `${generateUsername(
//         //   getUser.first_name,
//         //   getUser.last_name
//         // )} has message you.`;

//         // await sendNotifications(
//         //   tokensToSend,
//         //   notificationUsers,
//         //   screen_data,
//         //   screen_data,
//         //   NOTIFICATIONS_TYPES.CHAT_MESSAGE,
//         //   message,
//         //   getUser.id,
//         //   "chat",
//         //   NOTIFICATION_TITLES.CHAT_MESSAGE
//         // );
//       }
//     }
//   } catch (error) {
//     console.error("Error sending message:", error);
//     io.to(roomCode).emit(ERROR, error);
//     socket.emit(ERROR, error.message);
//   }
// };

// io.use(async (socket, next) => {
//   const { token } = socket.handshake.query;
//   console.log("🚀 ~ file: socket.js:31 ~ io.use ~ token:", token);

//   validateToken(token)
//     .then((res) => {
//       next();
//     })
//     .catch((err) => {
//       next(new Error(err));
//     });
// });

// io.on(CONNECTION, async (socket) => {
//   socket.conn.once("upgrade", () => {
//     // called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)
//     console.log("upgraded transport", socket.conn.transport.name); // prints "websocket"
//   });

//   socket.conn.on("packet", ({ type, data }) => {
//     // called for each packet received
//   });

//   socket.on(JOIN_ROOM, (roomCode) => {
//     joinRoom(socket, roomCode);
//   });

//   socket.on(MESSAGE_SENT, async (roomCode, msg) => {
//     sendMessage(socket, roomCode, msg);
//   });

//   socket.on(DISCONNECTING, () => {
//     const roomsToLeave = Array.from(socket.rooms.values());
//     roomsToLeave.forEach((roomCode) => {
//       socket.to(roomCode).emit("user_left_room", socket.clientId);
//       socket.leave(roomCode);

//       const clientsInRoom = rooms.get(roomCode);
//       if (clientsInRoom) {
//         clientsInRoom.delete(socket.clientId);

//         if (clientsInRoom.size === 0) {
//           rooms.delete(roomCode);
//         }
//       }
//     });

//     socket.rooms.forEach((room) => {
//       if (room !== socket.id) {
//         socket.to(room).emit("user has left", socket.id);
//       }
//     });
//   });

//   socket.on(DISCONNECT, (reason) => {
//     socket.emit(USER_DISCONNECTED);
//   });

//   socket.conn.on("close", (reason) => {
//     // called when the underlying connection is closed
//   });
// });

// io.on(CONNECT_ERROR, (err) => {
//   console.log(err.req); // the request object
//   console.log(err.code); // the error code, for example 1
//   console.log(err.message); // the error message, for example "Session ID unknown"
//   console.log(err.context); // some additional error context
// });

// io.on(ERROR, (error) => {
//   console.error("Socket error:", error);
// });

// // Handle disconnections
// io.on(DISCONNECT, (socket) => {
//   rooms.forEach((sockets, roomCode) => {
//     if (sockets.delete(socket.id) && sockets.size === 0) {
//       rooms.delete(roomCode);
//     }
//   });
// });

// instrument(io, { auth: false });

httpServer.listen(2000, () => {
  console.log("Socket Server listening on port 2000");
});

/* Socket initialization */
global.room = new Map();

const CHAT_BOT = "ChatBot";

let allUsers = [];

/* Socket connections */
io.on("connection", (socket) => {
  /**
   * listening join-room
   * param: room: string, username: string
   */
  socket.on("join-room", async (data) => {
    const { room, username } = data;
    await authenticateSocketUser(socket);
    socket.join(room);

    allUsers.push({ id: socket.id, username, room });

    io.to(room).emit("rcv-msg", {
      id: Date.now(),
      Sender: {
        id: Date.now(),
        fullName: CHAT_BOT,
      },
      content: `${username} has joined the chat!`,
    });

    io.to(room)
      .to(socket.id)
      .emit("room-joined", { users: allUsers, room: room });
  });

  /**
   * listening send-msg
   * param: room: string
   */
  socket.on("send-msg", (data) => {
    io.to(data.room).emit("rcv-msg", data);
  });

  /**
   * listening leave-room
   * param: username:string, room: string
   */
  socket.on("leave-room", (data) => {
    const { username, room } = data;
    socket.leave(room);
    allUsers = allUsers.filter((usr) => socket.id !== usr.id);
    socket.to(room).emit("room-leaved", allUsers);
    socket.to(room).emit("rcv-msg", {
      id: Date.now(),
      Sender: {
        id: Date.now(),
        fullName: CHAT_BOT,
      },
      content: `${username} has left the chat!`,
    });
  });

  /**
   * lstening typing
   * param: room: string, username:string
   */
  socket.on("typing", (data) => {
    const { room, username } = data;

    socket.to(room).emit("user-typing", {
      id: Date.now(),
      content: `${username} is typing...`,
      Sender: {
        id: Date.now(),
        fullName: CHAT_BOT,
      },
    });
  });

  /**
   * listening stop-typing
   * param: room: string
   */
  socket.on("stop-typing", (data) => {
    socket.to(data.room).emit("user-typing-stopped", {
      id: Date.now(),
      content: "",
      Sender: {
        id: Date.now(),
        fullName: CHAT_BOT,
      },
    });
  });
});

module.exports = io;
