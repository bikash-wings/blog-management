import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import axios from "axios";

import Navbar from "../../components/Navbar/Navbar";

import { allUsersRoute, host } from "../../utills/apiRoutes";
import { useAppSelector } from "../../store/hooks";
import { UserType } from "../../components/Types/User";

import userImg from "../../assets/profile.png";

const Chat = () => {
  const { user } = useAppSelector((state) => state);
  const socketRef: MutableRefObject<Socket | null> = useRef(null);

  const [allUsers, setAllUsers] = useState<UserType[]>([]);
  const [searchTxt, setSearchTxt] = useState("");

  const fetchAllUsers = async () => {
    try {
      const { data } = await axios.get(allUsersRoute, {
        headers: { authorization: user?.token },
      });
      console.log(data);
      setAllUsers(data.data);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchAllUsers();

    socketRef.current = io(host);

    socketRef.current.emit("add-user", user.user?.id);

    socketRef.current.on("rcv-msg", (mess: any) => {
      console.log("Received Message: ", mess);
    });

    socketRef.current.on("online-users", (onlineUsers) => {
      console.log("Online Users: ", onlineUsers);
    });

    // socket.current.emit("send-msg", "hello socket.io-client");
  }, []);

  return (
    <div>
      <Navbar />

      <div className="card">
        <div className="row g-0">
          <div className="col-12 col-lg-5 col-xl-3 border-end">
            {/* Top search bar */}
            <div className="card-header d-none d-md-block">
              <div className="input-icon">
                <span className="input-icon-addon">
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
                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                    <path d="M21 21l-6 -6" />
                  </svg>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search…"
                  aria-label="Search"
                  value={searchTxt}
                  onChange={(e) => setSearchTxt(e.target.value.toLowerCase())}
                />
              </div>
            </div>

            {/* Contacts / users list */}
            <div
              className="card-body p-0 scrollable"
              style={{ maxHeight: "78vh" }}
            >
              {allUsers
                .filter((usr) => usr.fullName.toLowerCase().includes(searchTxt))
                .map((usr) => (
                  <div className="nav flex-column nav-pills" role="tablist">
                    <a
                      href="#chat-1"
                      className="nav-link text-start mw-100 p-3 active"
                      id="chat-1-tab"
                      data-bs-toggle="pill"
                      role="tab"
                      aria-selected="true"
                    >
                      <div className="row align-items-center flex-fill">
                        <div className="col-auto">
                          <span
                            className="avatar"
                            style={{
                              backgroundImage: !usr.avatar
                                ? `url(${userImg})`
                                : `url(${host}/avatar/${usr.avatar})`,
                            }}
                          />
                        </div>
                        <div className="col text-body">
                          <div>{usr.fullName}</div>
                          <div className="text-secondary text-truncate w-100">
                            recent message
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
            </div>
          </div>

          {/* Chats section */}
          <div
            className="col-12 col-lg-7 col-xl-9 d-flex flex-column"
            style={{ maxHeight: "90vh" }}
          >
            <div className="card-body scrollable" style={{ height: "30rem" }}>
              <div className="chat">
                <div className="chat-bubbles">
                  {/* logged user message */}
                  <div className="chat-item">
                    <div className="row align-items-end justify-content-end">
                      <div className="col col-lg-6">
                        <div className="chat-bubble chat-bubble-me">
                          <div className="chat-bubble-title">
                            <div className="row">
                              <div className="col chat-bubble-author">
                                Paweł Kuna
                              </div>
                              <div className="col-auto chat-bubble-date">
                                09:32
                              </div>
                            </div>
                          </div>
                          <div className="chat-bubble-body">
                            <p>
                              Hey guys, I just pushed a new commit on the{" "}
                              <code>dev</code> branch. Can you have a look and
                              tell me what you think?
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-auto">
                        <span
                          className="avatar"
                          style={{
                            backgroundImage: "url(./static/avatars/000m.jpg)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Selected user message */}
                  <div className="chat-item">
                    <div className="row align-items-end">
                      <div className="col-auto">
                        <span
                          className="avatar"
                          style={{
                            backgroundImage: "url(./static/avatars/002m.jpg)",
                          }}
                        />
                      </div>
                      <div className="col col-lg-6">
                        <div className="chat-bubble">
                          <div className="chat-bubble-title">
                            <div className="row">
                              <div className="col chat-bubble-author">
                                Mallory Hulme
                              </div>
                              <div className="col-auto chat-bubble-date">
                                09:34
                              </div>
                            </div>
                          </div>
                          <div className="chat-bubble-body">
                            <p>Sure Paweł, let me pull the latest updates.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <div className="input-group input-group-flat">
                <input
                  type="text"
                  className="form-control"
                  autoComplete="off"
                  placeholder="Type message"
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
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ width: "40px" }}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
