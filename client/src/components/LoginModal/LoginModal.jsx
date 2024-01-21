import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { loginRoute } from "../../utills/apiRoutes";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import toast from "react-hot-toast";
import "./loginmodal.css";

const LoginModal = ({ setModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({ data: "", isVisible: false });

  const dispatch = useDispatch();

  const loginUser = async () => {
    try {
      const { data } = await axios.post(`${loginRoute}`, {
        email,
        password: password.data,
      });
      dispatch(setUser(data.data.user));
      setModal((p) => ({ ...p, login: false }));
      console.log(data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return ReactDOM.createPortal(
    <div
      className="loginModalCnt"
      onClick={() => setModal((p) => ({ ...p, login: false }))}
    >
      <div
        className="card card-md"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className={`card-body loginModal`}>
          <h2 className="h2 text-center mb-4">Login to your account</h2>
          <form
            action="./"
            method="get"
            autoComplete="off"
            // noValidate
            onSubmit={(e) => {
              e.preventDefault();
              loginUser();
            }}
          >
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="your@email.com"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-2">
              <label className="form-label">
                Password
                <span className="form-label-description">
                  <a href="./forgot-password.html">I forgot password</a>
                </span>
              </label>
              <div className="input-group input-group-flat">
                <input
                  type={password.isVisible ? "text" : "password"}
                  className="form-control"
                  placeholder="Your password"
                  autoComplete="off"
                  value={password.data}
                  onChange={(e) =>
                    setPassword((p) => ({ ...p, data: e.target.value }))
                  }
                  required
                />
                <span className="input-group-text">
                  <a
                    href="#"
                    className="link-secondary"
                    data-bs-toggle="tooltip"
                    aria-label="Show password"
                    data-bs-original-title="Show password"
                    onClick={() =>
                      setPassword((p) => ({ ...p, isVisible: !p.isVisible }))
                    }
                  >
                    {/* Download SVG icon from http://tabler-icons.io/i/eye */}
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
                      <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                      <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                    </svg>
                  </a>
                </span>
              </div>
            </div>
            <div className="mb-2">
              <label className="form-check">
                <input type="checkbox" className="form-check-input" />
                <span className="form-check-label">
                  Remember me on this device
                </span>
              </label>
            </div>
            <div className="form-footer">
              <button
                type="submit"
                className="btn btn-primary w-100"
                onClick={() => loginUser()}
              >
                Sign in
              </button>
            </div>
            <div className="row" style={{ marginTop: "20px" }}>
              <div className="col">
                <Link to="/signup" className="btn w-100">
                  {/* Download SVG icon from http://tabler-icons.io/i/brand-github */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-user-scan"
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
                    <path d="M10 9a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                    <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
                    <path d="M4 16v2a2 2 0 0 0 2 2h2" />
                    <path d="M16 4h2a2 2 0 0 1 2 2v2" />
                    <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
                    <path d="M8 16a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2" />
                  </svg>
                  Register New User
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default LoginModal;
