import styles from "./LoginModal.module.css";
import { RxCross1 } from "react-icons/rx";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import ReactDOM from "react-dom";
import { useState } from "react";
import axios from "axios";
import { loginRoute } from "../../utills/apiRoutes";

const LoginModal = ({ setModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({ data: "", isVisible: false });

  const loginUser = async () => {
    try {
      const { data } = await axios.post(`${loginRoute}`, { email, password });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return ReactDOM.createPortal(
    <div
      className={styles.modalCnt}
      onClick={() => setModal((p) => ({ ...p, login: false }))}
    >
      <div
        className="card card-md"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div
          className={`card-body ${styles.modal}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onSubmit={(e) => {
            e.preventDefault();
            loginUser();
          }}
        >
          <h2 className="h2 text-center mb-4">Login to your account</h2>
          <form action="./" method="get" autoComplete="off" noValidate>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="your@email.com"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <button type="submit" className="btn btn-primary w-100">
                Sign in
              </button>
            </div>
          </form>
        </div>
        {/* <div className={styles.top}>
          <div className={styles.heading}>
            <span>Sign In</span>
          </div>
          <RxCross1
            cursor="pointer"
            onClick={() => setModal((p) => ({ ...p, login: false }))}
          />
        </div>

        <div className={styles.field}>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <MdOutlineMail />
        </div>

        <div className={styles.field}>
          <input
            type={password.isVisible ? "text" : "password"}
            placeholder="Password"
            onChange={(e) =>
              setPassword((p) => ({ ...p, data: e.target.value }))
            }
            value={password.data}
            required
          />
          <RiLockPasswordLine
            onClick={() =>
              setPassword((p) => ({ ...p, isVisible: !p.isVisible }))
            }
          />
        </div>

        {/* Sign in button is below */}
        {/* <div
          className={`${styles.field} ${styles.signBtn}`}
          onClick={() => loginUser()}
        >
          Sign In
        </div>{" "}
        */}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default LoginModal;
