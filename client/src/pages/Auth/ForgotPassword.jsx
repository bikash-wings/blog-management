import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { forgotPasswordRoute } from "../../utills/apiRoutes";

import logo from "../../assets/logo.png";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    new: "",
    confirm: "",
    isPassShow: false,
    isConfirmShow: false,
  });
  const [answer, setAnswer] = useState("");

  const onForgotPassword = async () => {
    try {
      const { data } = await axios.post(forgotPasswordRoute, {
        email: email,
        newPassword: password.new,
        confirmPassword: password.confirm,
        answer: answer,
      });

      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="container container-tight py-2">
      <div className="text-center mb-2">
        <Link to="/">
          <img src={logo} alt="site logo" height={50} />
        </Link>
      </div>

      <div className="card card-md">
        <div className={`card-body`}>
          <h2 className="h2 text-center mb-4">Forgot Password</h2>
          <form
            action="./"
            method="get"
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              onForgotPassword();
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
              <label className="form-label">New Password</label>
              <div className="input-group input-group-flat">
                <input
                  type={password.isPassShow ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter new password"
                  autoComplete="off"
                  value={password.new}
                  onChange={(e) =>
                    setPassword((p) => ({ ...p, new: e.target.value }))
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
                      setPassword((p) => ({ ...p, isPassShow: !p.isPassShow }))
                    }
                  >
                    {password.isPassShow ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-eye-off"
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
                        <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                        <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                        <path d="M3 3l18 18" />
                      </svg>
                    ) : (
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
                    )}
                  </a>
                </span>
              </div>
            </div>

            <div className="mb-2">
              <label className="form-label">Confirm New Password</label>
              <div className="input-group input-group-flat">
                <input
                  type={password.isConfirmShow ? "text" : "password"}
                  className="form-control"
                  placeholder="Re-enter new password"
                  autoComplete="off"
                  value={password.confirm}
                  onChange={(e) =>
                    setPassword((p) => ({ ...p, confirm: e.target.value }))
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
                      setPassword((p) => ({
                        ...p,
                        isConfirmShow: !p.isConfirmShow,
                      }))
                    }
                  >
                    {password.isConfirmShow ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-eye-off"
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
                        <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                        <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                        <path d="M3 3l18 18" />
                      </svg>
                    ) : (
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
                    )}
                  </a>
                </span>
              </div>
            </div>

            <div className="mb-2">
              <label className="form-label">Favorite Sport ?</label>
              <div className="input-group input-group-flat">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter favorite sport here"
                  autoComplete="off"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-footer">
              <button type="submit" className="btn btn-primary w-100">
                Reset password
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="text-center text-secondary mt-3">
        Forget it,{" "}
        <Link
          to="/login"
          tabIndex={-1}
          style={{ color: "#206bc4", textDecoration: "none" }}
        >
          send me back
        </Link>{" "}
        to the sign in screen.
      </div>
    </div>
  );
};

export default ForgotPassword;
