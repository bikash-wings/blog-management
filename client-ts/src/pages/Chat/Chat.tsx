/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../../components/Navbar/Navbar";
import JoinRoom from "../../components/JoinRoom/JoinRoom";

import {
  addNewMessageRoute,
  allMessagesRoute,
  host,
  roomMessageCountRoute,
} from "../../utills/apiRoutes";
import { useAppSelector } from "../../store/hooks";
import { MessageType } from "../../components/Types/messages";

import userImg from "../../assets/profile.png";

const Chat = () => {
  const { user } = useAppSelector((state) => state);
  const socketRef: MutableRefObject<Socket | null> = useRef(null);
  const messRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const chatContainerRef: MutableRefObject<HTMLDivElement | null> =
    useRef(null);
  const navigate = useNavigate();

  const [allMessages, setAllMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [room, setRoom] = useState<string>("node");
  const [isRoomJoined, setIsRoomJoined] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<{ fetched: number; messages: number }>({
    fetched: 0,
    messages: 1,
  });

  const fetchRoomMessages = async () => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) {
      return;
    }

    if (total.fetched >= total.messages) {
      return;
    }

    try {
      const prevScrollPosition = chatContainer.scrollTop;

      const { data } = await axios.get(
        `${allMessagesRoute}/${room}?page=${page}&order=DESC`,
        {
          headers: {
            authorization: user?.token,
          },
        }
      );
      setAllMessages((p) => [...data.data, ...p]);
      setTotal((p) => ({ ...p, fetched: p.fetched + data.data.length }));

      chatContainer.scrollTop = prevScrollPosition + 900;
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const getRoomMessageCount = async () => {
    try {
      const { data } = await axios.get(`${roomMessageCountRoute}/${room}`, {
        headers: { authorization: user?.token },
      });
      setTotal((p) => ({ ...p, messages: data.data }));
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const handleMessageSend = async () => {
    try {
      const { data } = await axios.post(
        addNewMessageRoute,
        { content: newMessage, room: room },
        { headers: { authorization: user?.token } }
      );

      socketRef.current?.emit("send-msg", { ...data.data, room: room });
      setNewMessage("");
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const handleJoinRoom = (roomId: string) => {
    try {
      socketRef.current?.emit("join-room", {
        room: roomId,
        username: user.user?.fullName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLeaveRoom = async () => {
    const username = user.user?.fullName;
    socketRef.current?.emit("leave-room", { username, room });
    localStorage.removeItem("room");
    navigate("/");
  };

  const handleTyping = () => {
    const username = user.user?.fullName;
    socketRef.current?.emit("typing", { username, room });
    const timeout = setTimeout(() => {
      socketRef.current?.emit("stop-typing", { room: room });
    }, 3000);
    return () => clearTimeout(timeout);
  };

  const handleStopTyping = () => {
    socketRef.current?.emit("stop-typing", { room: room });
  };

  const handleScroll = () => {
    if (total.fetched >= total.messages) {
      return;
    }

    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      const { scrollTop } = chatContainer;
      if (scrollTop === 0) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    socketRef.current = io(`${host}?token=${user?.token}`, {
      auth: { token: user?.token },
    });

    const room = localStorage.getItem("room");
    if (room) {
      setRoom(room);
      handleJoinRoom(room);
    }

    socketRef.current.on("room-joined", (data: any) => {
      setIsRoomJoined(true);
      localStorage.setItem("room", data.room);
    });

    socketRef.current.on("rcv-msg", (mess: MessageType) => {
      setAllMessages((p) => [...p, mess]);
      messRef.current?.scrollIntoView({ behavior: "smooth" });
    });

    socketRef.current.on("user-typing", (mess: MessageType) => {
      setIsTyping(mess.content);
    });

    socketRef.current.on("user-typing-stopped", (mess: MessageType) => {
      setIsTyping(mess.content);
    });

    // getRoomMessageCount();

    return () => {
      socketRef.current?.off("room-joined");
      socketRef.current?.off("rcv-msg");
      socketRef.current?.off("user-typing");
      socketRef.current?.off("user-typing-stopped");

      socketRef.current?.emit("leave-room", {
        username: [user.user?.fullName],
        room,
      });
      localStorage.removeItem("room");
    };
  }, []);

  useEffect(() => {
    if (messRef.current && page === 1) {
      messRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isRoomJoined, allMessages, page]);

  useEffect(() => {
    if (!user.token) {
      navigate("/");
      toast.error("Please login to join chats");
    }
  }, [user]);

  useEffect(() => {
    if (isRoomJoined) {
      fetchRoomMessages();

      if (page === 1) {
        getRoomMessageCount();
      }
    }
  }, [page, chatContainerRef.current, isRoomJoined]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [chatContainerRef.current]);

  return (
    <>
      {isRoomJoined ? (
        <div>
          <Navbar />

          <div className="card">
            <div className="row g-0">
              <div className="col-xl-2 border-end d-flex gap-5 flex-column justify-content-center align-items-center">
                <h3 className="">Room: {room}</h3>
                <div className="btn btn-danger" onClick={handleLeaveRoom}>
                  Leave Room
                </div>
              </div>

              {/* Chats section */}
              <div
                className="col-12 col-lg-7 col-xl-10 d-flex flex-column"
                style={{ maxHeight: "90vh" }}
              >
                <div
                  className="card-body scrollable"
                  style={{ height: "30rem" }}
                  ref={chatContainerRef}
                >
                  <div className="chat">
                    <div className="chat-bubbles d-flex flex-column gap-3">
                      {allMessages.map((mess) =>
                        mess.Sender.fullName === "ChatBot" ? (
                          //   {/* Bot user messages */}
                          <div className="chat-item" ref={messRef}>
                            <div className="row align-items-center justify-content-center">
                              <div
                                className="col col-lg-3"
                                style={{
                                  backgroundColor: "#a4d4f8",
                                  borderRadius: "0.5rem",
                                  padding: "0.5rem",
                                  fontSize: "0.8rem",
                                }}
                              >
                                <div className="chat-bubble">
                                  <div className="chat-bubble-body">
                                    <div>{mess.content}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : mess.Sender.id === user?.user?.id ? (
                          //   {/* logged user messages */}
                          <div className="chat-item" ref={messRef}>
                            <div className="row align-items-end justify-content-end">
                              <div
                                className="col col-lg-6"
                                style={{
                                  backgroundColor: "#e9f0f9",
                                  borderRadius: "0.5rem",
                                  padding: "1rem",
                                }}
                              >
                                <div className="chat-bubble chat-bubble-me">
                                  <div className="chat-bubble-body">
                                    <p>{mess.content}</p>
                                  </div>
                                  <div className="chat-bubble-title">
                                    <div className="row">
                                      <div className="col chat-bubble-author">
                                        {/* {user.user.fullName} */}
                                      </div>
                                      <div className="col-auto chat-bubble-date">
                                        {moment(mess.createdAt).format(
                                          "HH:mm a"
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-auto">
                                <span
                                  className="avatar"
                                  style={{
                                    backgroundImage: user?.user.avatar
                                      ? user?.user.avatar.startsWith("https://")
                                        ? `url(${user.user.avatar})`
                                        : `url(${host}/avatar/${user?.user.avatar})`
                                      : `url(${userImg})`,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          //   {/* Other user messages */}
                          <div className="chat-item" ref={messRef}>
                            <div className="row align-items-end">
                              <div className="col-auto">
                                <span
                                  className="avatar"
                                  style={{
                                    backgroundImage: mess.Sender.avatar
                                      ? mess.Sender.avatar.startsWith(
                                          "https://"
                                        )
                                        ? `url(${mess.Sender.avatar})`
                                        : `url(${host}/avatar/${mess.Sender.avatar})`
                                      : `url(${userImg})`,
                                  }}
                                />
                              </div>
                              <div
                                className="col col-lg-6"
                                style={{
                                  backgroundColor: "beige",
                                  borderRadius: "0.5rem",
                                  padding: "1rem",
                                }}
                              >
                                <div className="chat-bubble">
                                  <div className="chat-bubble-body">
                                    <p>{mess.content}</p>
                                  </div>
                                  <div className="chat-bubble-title">
                                    <div className="row">
                                      <div
                                        className="col chat-bubble-author"
                                        style={{ fontSize: "0.8rem" }}
                                      >
                                        {mess.Sender.fullName}
                                      </div>
                                      <div className="col-auto chat-bubble-date">
                                        {moment(mess.createdAt).format(
                                          "HH:mm a"
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Typing status message */}
                {isTyping && <div className="p-3 ">{isTyping}</div>}

                {/* Messages bottom section */}
                <div className="card-footer">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleMessageSend();
                      handleStopTyping();
                    }}
                    className="input-group input-group-flat"
                  >
                    <input
                      type="text"
                      className="form-control"
                      autoComplete="off"
                      placeholder="Type message"
                      value={newMessage}
                      onChange={(e) => {
                        setNewMessage(e.target.value);
                        if (!isTyping) {
                          handleTyping();
                        }
                      }}
                      onClick={handleTyping}
                    />
                    <span className="input-group-text">
                      <div
                        className="link-secondary cursor-pointer"
                        data-bs-toggle="tooltip"
                        aria-label="Clear search"
                        data-bs-original-title="Clear search"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                          <path d="M9 10l.01 0" />
                          <path d="M15 10l.01 0" />
                          <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
                        </svg>
                      </div>
                      <div
                        className="link-secondary ms-2 cursor-pointer"
                        data-bs-toggle="tooltip"
                        aria-label="Add notification"
                        data-bs-original-title="Add notification"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5" />
                        </svg>
                      </div>
                    </span>
                    <button
                      className="d-flex align-items-center justify-content-center"
                      style={{ width: "40px" }}
                      type="submit"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-send-2 cursor-pointer"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" />
                        <path d="M6.5 12h14.5" />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <JoinRoom
          setIsRoomJoined={setIsRoomJoined}
          socketRef={socketRef}
          room={room}
          setRoom={setRoom}
          handleJoinRoom={handleJoinRoom}
        />
      )}
    </>
  );
};

export default Chat;
