import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import logo from "../../assets/logo.png";
import "./sidebar.css";

type SidebarProps = {
  category?: string;
  setCategory?: React.Dispatch<React.SetStateAction<string>>;
};

const Sidebar = ({ category, setCategory = () => {} }: SidebarProps) => {
  const { user } = useSelector((state: any) => state.user.user);

  return (
    <div className="page">
      <aside
        className="navbar navbar-vertical navbar-expand-lg"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          {/* Side bar logo is below */}
          <h1 className="navbar-brand navbar-brand-autodark">
            <Link to="/">
              <img
                src={logo}
                width={300}
                height={50}
                alt="BlogCraft"
                className="navbar-brand-image"
              />
            </Link>
          </h1>

          <div className="collapse navbar-collapse" id="sidebar-menu">
            <ul className="navbar-nav pt-lg-3">
              <li
                className={`nav-item ${
                  category === "/dashboard" ? "catActive" : ""
                }`}
                onClick={() => setCategory("/dashboard")}
              >
                <Link to="/dashboard" className="nav-link">
                  <span
                    className="nav-link-icon d-md-none d-lg-inline-block"
                    style={{ color: "#ffffffa5" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-layout-dashboard"
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
                      <path d="M4 4h6v8h-6z" />
                      <path d="M4 16h6v4h-6z" />
                      <path d="M14 12h6v8h-6z" />
                      <path d="M14 4h6v4h-6z" />
                    </svg>
                  </span>
                  <span
                    className="nav-link-title"
                    style={{ color: "#ffffffa5" }}
                  >
                    Dashboard
                  </span>
                </Link>
              </li>
              <li
                className={`nav-item ${category === "/" ? "catActive" : ""}`}
                onClick={() => setCategory("/")}
              >
                <Link to="/" className="nav-link">
                  <span
                    className="nav-link-icon d-md-none d-lg-inline-block"
                    style={{ color: "#ffffffa5" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-align-box-center-stretch"
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
                  <span
                    className="nav-link-title"
                    style={{ color: "#ffffffa5" }}
                  >
                    Blogs
                  </span>
                </Link>
              </li>
              {user?.role === "admin" && (
                <li
                  className={`nav-item ${
                    category === "/users" ? "catActive" : ""
                  }`}
                  onClick={() => setCategory("/users")}
                >
                  <Link to="/users" className="nav-link">
                    <span
                      className="nav-link-icon d-md-none d-lg-inline-block"
                      style={{ color: "#ffffffa5" }}
                    >
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
                    <span
                      className="nav-link-title"
                      style={{ color: "#ffffffa5" }}
                    >
                      Users
                    </span>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
