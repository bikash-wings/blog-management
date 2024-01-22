import { useDispatch, useSelector } from "react-redux";
import "./navbar.css";
import { removeUser } from "../../store/userSlice";
import { Link, useLocation } from "react-router-dom";
import { host } from "../../utills/apiRoutes";
import userImg from "../../assets/profile.png";
import { useEffect, useState } from "react";

const Navbar = () => {
  const path = useLocation().pathname;

  const { user } = useSelector((state) => state.user);

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
            <div
              className="row flex-fill align-items-center"
            >
              <div
                className="col"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <ul className="navbar-nav" >
                  {/* Home page link is below */}
                  <li className={`nav-item ${path === "/" ? "active" : ""}`} >
                    <Link to="/" className="nav-link"
              style={{ minHeight: "3.5rem" }}>
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
                          (user?.avatar && `url(${host}${user?.avatar})`) ||
                          `url(${userImg})`,
                      }}
                    />
                    <div className="d-none d-xl-block ps-2">
                      <div>{user?.fullName ? user?.fullName : "User Name"}</div>
                      <div class="mt-1 small text-secondary">UI Developer</div>
                    </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
