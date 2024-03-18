import { useState } from "react";
import ReactDOM from "react-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { removeUser } from "../../store/userSlice";
import { host, logoutRoute } from "../../utills/apiRoutes";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import logo from "../../assets/logo.png";
import userImg from "../../assets/profile.png";
import "./navbar.css";

const Navbar = () => {
  const path = useLocation().pathname;
  const { user } = useAppSelector((state) => state);
  const token = user?.token;
  const loggedUser = user?.user;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const modalRoot = document.getElementById("modal-root")!;

  const [isLogout, setIsLogout] = useState<boolean>(false);

  const onLogOut = async () => {
    try {
      const { data } = await axios.post(logoutRoute, {
        token: token,
        userId: user?.user?.id,
      });

      if (data.success) {
        // navigate("/login");
        dispatch(removeUser());
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <header
      className="navbar-expand-md sticky-top d-print-none"
      style={{ zIndex: 1000, backgroundColor: "#fff", maxHeight: "58px" }}
    >
      <div className="collapse navbar-collapse" id="navbar-menu">
        <div className="navbar">
          <div className="container">
            <div className="row flex-fill align-items-center">
              <div
                className="col"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <ul className="navbar-nav">
                  <li className="navbar-brand navbar-brand-autodark">
                    <Link to="/">
                      <img
                        src={logo}
                        width={300}
                        height={40}
                        alt="BlogCraft"
                        className="navbar-brand-image"
                      />
                    </Link>
                  </li>
                </ul>

                <div
                  className="navbar-nav"
                  style={{ display: "flex", gap: "20px", fontWeight: "600" }}
                >
                  {/* Home page link is below */}
                  <div className={`nav-item ${path === "/" ? "active" : ""}`}>
                    <Link to="/" className="nav-link">
                      <span className="nav-link-icon d-md-none d-lg-inline-block">
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
                          <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                          <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                          <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                        </svg>
                      </span>
                      <span className="nav-link-title">Home</span>
                    </Link>
                  </div>

                  {/* Chat page link is below */}
                  <div
                    className={`nav-item ${path === "/chats" ? "active" : ""}`}
                  >
                    <Link to="/chats" className="nav-link">
                      <span className="nav-link-icon d-md-none d-lg-inline-block">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-message-chatbot"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
                          <path d="M9.5 9h.01" />
                          <path d="M14.5 9h.01" />
                          <path d="M9.5 13a3.5 3.5 0 0 0 5 0" />
                        </svg>
                      </span>
                      <span className="nav-link-title">Chats</span>
                    </Link>
                  </div>

                  {/* Add new blog page is below */}
                  {user?.user?.permissions.includes("add-blog") && (
                    <div
                      className={`nav-item dropdown ${
                        path === "/blogs/add" ? "active" : ""
                      }`}
                    >
                      <Link
                        to="/blogs/add"
                        className="nav-link"
                        aria-expanded="false"
                      >
                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-file-plus"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                            <path d="M12 11l0 6" />
                            <path d="M9 14l6 0" />
                          </svg>
                        </span>
                        <span className="nav-link-title">Add New</span>
                      </Link>
                    </div>
                  )}
                </div>

                <div className="nav-item dropdown" data-bs-toggle="tooltip">
                  <div
                    className="nav-link d-flex lh-1 text-reset p-0"
                    data-bs-toggle="dropdown"
                    aria-label="Open user menu"
                  >
                    <span
                      className="avatar avatar-sm"
                      style={{
                        backgroundImage:
                          !loggedUser || !loggedUser?.avatar
                            ? `url(${userImg})`
                            : loggedUser?.avatar.startsWith("https://")
                              ? `url(${loggedUser.avatar})`
                              : `url(${host}/avatar/${loggedUser?.avatar})`,
                        cursor: "pointer",
                      }}
                    />
                    <div className="d-none d-xl-block ps-2">
                      {loggedUser?.fullName ? (
                        <div style={{ cursor: "pointer" }}>
                          {loggedUser?.fullName}
                        </div>
                      ) : (
                        <Link
                          to={"/login"}
                          onClick={() => navigate("/login")}
                          style={{ textDecoration: "none" }}
                        >
                          login
                        </Link>
                      )}
                      <div className="mt-1 small text-secondary">
                        {loggedUser?.fullName ? "UI Developer" : ""}
                      </div>
                    </div>
                  </div>
                  {loggedUser && (
                    <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                      <Link to="/profile" className="dropdown-item">
                        Profile
                      </Link>
                      <div className="dropdown-divider" />
                      <div
                        className="dropdown-item"
                        onClick={() => setIsLogout(true)}
                      >
                        Logout
                      </div>

                      {/* Logout confirmation dialog box */}
                      {isLogout &&
                        ReactDOM.createPortal(
                          <div
                            className="modal modal-blur fade show"
                            id="modal-small"
                            tabIndex={-1}
                            role="dialog"
                            aria-modal="true"
                            style={{
                              display: "block",
                              backgroundColor: "rgba(5, 5, 5, 0.10)",
                            }}
                            onClick={() => setIsLogout(false)}
                          >
                            <div
                              className="modal-dialog modal-sm modal-dialog-centered"
                              role="document"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                            >
                              <div className="modal-content">
                                <div className="modal-body">
                                  <div className="modal-title">
                                    Do you really want to logout?
                                  </div>
                                </div>
                                <div
                                  className="modal-footer pt-3"
                                  style={{
                                    backgroundColor: "rgba(2, 2, 2, 0.030)",
                                    borderTop: "1px solid rgba(2, 2, 2, 0.055)",
                                  }}
                                >
                                  <button
                                    type="button"
                                    className="btn btn-link link-secondary me-auto"
                                    data-bs-dismiss="modal"
                                    onClick={() => setIsLogout(false)}
                                    style={{ backgroundColor: "#fff" }}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-bs-dismiss="modal"
                                    onClick={onLogOut}
                                  >
                                    Logout
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>,
                          modalRoot
                        )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
