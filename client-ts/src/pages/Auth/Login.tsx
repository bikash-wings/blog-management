import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { loginRoute } from "../../utills/apiRoutes";
import { setUser } from "../../store/userSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import logo from "../../assets/logo.png";

const Login = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<{
    data: string;
    isVisible: boolean;
  }>({ data: "", isVisible: false });

  const onUserLogin = async () => {
    try {
      const { data } = await axios.post(`${loginRoute}`, {
        email,
        password: password?.data,
      });
      dispatch(setUser({ user: data.data.user, token: data.data.token }));
      toast.success(data.message);
      navigate("/");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="container container-tight py-2">
      <div className="text-center mb-2">
        <Link to="/">
          <img src={logo} alt="site logo" height={50} />
        </Link>
      </div>

      <div className="card card-md">
        <div className={`card-body`}>
          <h2 className="h2 text-center mb-4">Login to your account</h2>
          <form
            action="./"
            method="get"
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              onUserLogin();
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
                  <Link to="/forgot-password" style={{ color: "#206bc4" }}>
                    I forgot password
                  </Link>
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
                    {password.isVisible ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-eye-off"
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
            {/* <div className="row" style={{ marginTop: "20px" }}>
              <div className="col">
                <Link to="/signup" className="btn w-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-user-scan"
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
            </div> */}
          </form>
        </div>
      </div>

      <div className="text-center text-secondary mt-3">
        Don't have account yet?{" "}
        <Link
          to="/signup"
          tabIndex={-1}
          style={{ color: "#206bc4", textDecoration: "none" }}
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
