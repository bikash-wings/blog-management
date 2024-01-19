import { useDispatch, useSelector } from "react-redux";
import { RiLogoutCircleRLine } from "react-icons/ri";
import LoginModal from "../LoginModal/LoginModal";
import "./navbar.css";
import { removeUser } from "../../store/userSlice";
import { Link } from "react-router-dom";
import { host } from "../../utills/apiRoutes";
import { useEffect, useState } from "react";

const Navbar = ({ modal, setModal }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { user } = useSelector((state) => state.user);
  console.log(user);

  const dispatch = useDispatch();

  return (
    <div className="container-xl">
      <div className="navbar-nav flex-row order-md-last">
        <div className="nav-item d-none d-md-flex me-3">
          <div className="btn-list">
            <Link to="/blog/add" className="btn" rel="noreferrer">
              {/* Download SVG icon from http://tabler-icons.io/i/brand-github */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-article"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
                <path d="M7 8h10" />
                <path d="M7 12h10" />
                <path d="M7 16h10" />
              </svg>
              Add New Blog
            </Link>
            <a
              href="https://github.com/b0n21en5/blog-management"
              className="btn"
              target="_blank"
              rel="noreferrer"
            >
              {/* Download SVG icon from http://tabler-icons.io/i/brand-github */}
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
                <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
              </svg>
              Source code
            </a>
          </div>
        </div>
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
                  "url(./src/assets/profile.png)",
              }}
            />
            {user ? (
              <div className="d-none d-xl-block ps-2">
                <div>{user?.fullName}</div>
                <div class="mt-1 small text-secondary">UI Developer</div>
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

          {/* Login modal is below */}
          {modal.login && <LoginModal setModal={setModal} />}

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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
