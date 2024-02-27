import { useState } from "react";
import ReactDOM from "react-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { removeUser } from "../../store/userSlice";
import { host, logoutRoute } from "../../utills/apiRoutes";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import userImg from "../../assets/profile.png";
import "./navbar.css";

const Navbar = () => {
  const path = useLocation().pathname;
  let { user } = useAppSelector((state) => state);
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

      navigate("/login");
      dispatch(removeUser());
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <header
      className="navbar-expand-md sticky-top d-print-none"
      style={{ zIndex: 1000, backgroundColor: "#fff" }}
    >
      <div className="collapse navbar-collapse" id="navbar-menu">
        <div className="navbar">
          <div className="container-xl">
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
                  {/* Home page link is below */}
                  <li className={`nav-item ${path === "/" ? "active" : ""}`}>
                    <Link
                      to="/"
                      className="nav-link"
                      // style={{ minHeight: "3.5rem" }}
                    >
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
                  </li>

                  {/* Add new blog page is below */}
                  {
                    <li
                      className={`nav-item dropdown ${
                        path === "/blog/add" ? "active" : ""
                      }`}
                    >
                      <Link
                        to="/blog/add"
                        className="nav-link"
                        aria-expanded="false"
                      >
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
                        <span className="nav-link-title">Add New</span>
                      </Link>
                    </li>
                  }
                </ul>

                <div className="nav-item dropdown" data-bs-toggle="tooltip">
                  <a
                    href="#"
                    className="nav-link d-flex lh-1 text-reset p-0"
                    data-bs-toggle="dropdown"
                    aria-label="Open user menu"
                  >
                    <span
                      className="avatar avatar-sm"
                      style={{
                        backgroundImage:
                          loggedUser?.avatar !== "NULL"
                            ? `url(${host}/${loggedUser?.avatar})`
                            : `url(${userImg})`,
                      }}
                    />
                    <div className="d-none d-xl-block ps-2">
                      <div>
                        {loggedUser?.fullName
                          ? loggedUser?.fullName
                          : "User Name"}
                      </div>
                      <div className="mt-1 small text-secondary">
                        UI Developer
                      </div>
                    </div>
                  </a>
                  {loggedUser && (
                    <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                      <Link to="/profile" className="dropdown-item">
                        Profile
                      </Link>
                      <div className="dropdown-divider" />
                      <a
                        href="#"
                        className="dropdown-item"
                        onClick={() => setIsLogout(true)}
                      >
                        Logout
                      </a>

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
