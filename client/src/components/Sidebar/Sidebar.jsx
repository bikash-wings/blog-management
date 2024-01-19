import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = ({ category, setCategory }) => {
  return (
    <div className="page">
      <aside
        className="navbar navbar-vertical navbar-expand-lg"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <h1 className="navbar-brand navbar-brand-autodark">
            <Link to="/">
              <img
                src="./static/logo.svg"
                width={110}
                height={32}
                alt="BlogCraft"
                className="navbar-brand-image"
              />
            </Link>
          </h1>
          <div className="navbar-nav flex-row d-lg-none">
            <div className="d-none d-lg-flex">
              <a
                href="?theme=dark"
                className="nav-link px-0 hide-theme-dark"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                aria-label="Enable dark mode"
                data-bs-original-title="Enable dark mode"
              >
                {/* Download SVG icon from http://tabler-icons.io/i/moon */}
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
                  <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
                </svg>
              </a>
              <a
                href="?theme=light"
                className="nav-link px-0 hide-theme-light"
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                aria-label="Enable light mode"
                data-bs-original-title="Enable light mode"
              >
                {/* Download SVG icon from http://tabler-icons.io/i/sun */}
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
                  <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                  <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
                </svg>
              </a>
              <div className="nav-item dropdown d-none d-md-flex me-3">
                <a
                  href="#"
                  className="nav-link px-0"
                  data-bs-toggle="dropdown"
                  tabIndex={-1}
                  aria-label="Show notifications"
                >
                  {/* Download SVG icon from http://tabler-icons.io/i/bell */}
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
                    <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                    <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                  </svg>
                  <span className="badge bg-red" />
                </a>
                <div className="dropdown-menu dropdown-menu-arrow dropdown-menu-end dropdown-menu-card">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Last updates</h3>
                    </div>
                    <div className="list-group list-group-flush list-group-hoverable">
                      <div className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <span className="status-dot status-dot-animated bg-red d-block" />
                          </div>
                          <div className="col text-truncate">
                            <a href="#" className="text-body d-block">
                              Example 1
                            </a>
                            <div className="d-block text-secondary text-truncate mt-n1">
                              Change deprecated html tags to text decoration
                              classes (#29604)
                            </div>
                          </div>
                          <div className="col-auto">
                            <a href="#" className="list-group-item-actions">
                              {/* Download SVG icon from http://tabler-icons.io/i/star */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon text-muted"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <span className="status-dot d-block" />
                          </div>
                          <div className="col text-truncate">
                            <a href="#" className="text-body d-block">
                              Example 2
                            </a>
                            <div className="d-block text-secondary text-truncate mt-n1">
                              justify-content:between ⇒
                              justify-content:space-between (#29734)
                            </div>
                          </div>
                          <div className="col-auto">
                            <a
                              href="#"
                              className="list-group-item-actions show"
                            >
                              {/* Download SVG icon from http://tabler-icons.io/i/star */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon text-yellow"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <span className="status-dot d-block" />
                          </div>
                          <div className="col text-truncate">
                            <a href="#" className="text-body d-block">
                              Example 3
                            </a>
                            <div className="d-block text-secondary text-truncate mt-n1">
                              Update change-version.js (#29736)
                            </div>
                          </div>
                          <div className="col-auto">
                            <a href="#" className="list-group-item-actions">
                              {/* Download SVG icon from http://tabler-icons.io/i/star */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon text-muted"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="list-group-item">
                        <div className="row align-items-center">
                          <div className="col-auto">
                            <span className="status-dot status-dot-animated bg-green d-block" />
                          </div>
                          <div className="col text-truncate">
                            <a href="#" className="text-body d-block">
                              Example 4
                            </a>
                            <div className="d-block text-secondary text-truncate mt-n1">
                              Regenerate package-lock.json (#29730)
                            </div>
                          </div>
                          <div className="col-auto">
                            <a href="#" className="list-group-item-actions">
                              {/* Download SVG icon from http://tabler-icons.io/i/star */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon text-muted"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="collapse navbar-collapse" id="sidebar-menu">
            <ul className="navbar-nav pt-lg-3">
              <li
                className={`nav-item ${category === "/" ? "catActive" : ""}`}
                onClick={() => setCategory("/")}
              >
                <Link
                  to="/"
                  className="nav-link"
                  // onClick={(e) => e.preventDefault()}
                >
                  <span className="nav-link-icon d-md-none d-lg-inline-block">
                    {/* Download SVG icon from http://tabler-icons.io/i/home */}
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
                  <span className="nav-link-title">Blogs</span>
                </Link>
              </li>
              <li
                className={`nav-item ${
                  category === "/users" ? "catActive" : ""
                }`}
                onClick={() => setCategory("/users")}
              >
                <Link
                  to="/users"
                  className="nav-link"
                  // onClick={(e) => e.preventDefault()}
                >
                  <span className="nav-link-icon d-md-none d-lg-inline-block">
                    {/* Download SVG icon from http://tabler-icons.io/i/home */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-user-circle"
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
                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                      <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                      <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                    </svg>
                  </span>
                  <span className="nav-link-title">Users</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
