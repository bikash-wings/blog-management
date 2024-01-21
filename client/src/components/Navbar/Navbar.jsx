import { useDispatch, useSelector } from "react-redux";
import { RiLogoutCircleRLine } from "react-icons/ri";
import LoginModal from "../LoginModal/LoginModal";
import "./navbar.css";
import { removeUser } from "../../store/userSlice";
import { Link, useLocation } from "react-router-dom";
import { host } from "../../utills/apiRoutes";
import userImg from "../../assets/profile.png";
import { useEffect, useState } from "react";

const Navbar = ({ modal, setModal }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const path = useLocation().pathname;
  console.log(path);

  const { user } = useSelector((state) => state.user);
  console.log(user);

  const dispatch = useDispatch();

  return (
    <header className="navbar-expand-md">
      <div className="collapse navbar-collapse" id="navbar-menu">
        <div className="navbar">
          <div
            className={
              path === "/" || path === "/users" ? "container-xl" : "container"
            }
          >
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
                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="icon icon-tabler icon-tabler-align-box-center-stretch"
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
                            <path d="M3 19v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                            <path d="M11 17h2" />
                            <path d="M9 12h6" />
                            <path d="M10 7h4" />
                          </svg>
                        </span>
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
                          (user?.avatar && `url(${host}${user?.avatar})`) ||
                          `url(${userImg})`,
                      }}
                    />
                    {user ? (
                      <div className="d-none d-xl-block ps-2">
                        <div>{user?.fullName}</div>
                        <div class="mt-1 small text-secondary">
                          UI Developer
                        </div>
                      </div>
                    ) : (
                      <div
                        className="d-none d-xl-block ps-2"
                        onClick={() => setModal((p) => ({ ...p, login: true }))}
                      >
                        Login
                      </div>
                    )}
                  </a>
                  {user && (
                    <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                      <Link to="/profile" href="#" className="dropdown-item">
                        Profile
                      </Link>
                      <div className="dropdown-divider" />
                      <a
                        href="#"
                        className="dropdown-item"
                        onClick={() => {
                          dispatch(removeUser());
                        }}
                      >
                        Logout
                      </a>
                    </div>
                  )}
                </div>

                {modal.login && <LoginModal setModal={setModal} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
