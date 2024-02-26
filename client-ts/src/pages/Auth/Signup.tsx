import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import { signupRoute } from "../../utills/apiRoutes";

import logo from "../../assets/logo.png";

const Signup = () => {
  const { user } = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  const [auth, setAuth] = useState<{
    fname: string;
    lname: string;
    email: string;
    password: string;
    answer: string;
  }>({
    fname: "",
    lname: "",
    email: "",
    password: "",
    answer: "",
  });
  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);

  const onRegisterUser = async () => {
    try {
      const { data } = await axios.post(signupRoute, auth);
      toast.success(data.message);
      navigate("/");
      console.log(data);
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
    <div className="container-tight py-2">
      <div className="text-center mb-2">
        <Link to="/">
          <img src={logo} alt="site logo" height={50} />
        </Link>
      </div>

      <form
        className="card card-md"
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          onRegisterUser();
        }}
      >
        <div className="card-body">
          <h2
            className="card-title text-center mb-4"
            style={{ fontSize: "1.2rem", fontWeight: "600" }}
          >
            Create new account
          </h2>

          <div className="row">
            <div className="mb-3 col">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter first name"
                onChange={(e) =>
                  setAuth((p) => ({ ...p, fname: e.target.value }))
                }
                value={auth?.fname}
                required
              />
            </div>
            <div className="mb-3 col">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter last name"
                onChange={(e) =>
                  setAuth((p) => ({ ...p, lname: e.target.value }))
                }
                value={auth?.lname}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email address"
              onChange={(e) =>
                setAuth((p) => ({ ...p, email: e.target.value }))
              }
              value={auth?.email}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group input-group-flat">
              <input
                type={isPassVisible ? "text" : "password"}
                className="form-control"
                placeholder="Type Password"
                autoComplete="off"
                onChange={(e) =>
                  setAuth((p) => ({ ...p, password: e.target.value }))
                }
                value={auth?.password}
                required
              />
              <span className="input-group-text">
                <a
                  href="#"
                  className="link-secondary"
                  data-bs-toggle="tooltip"
                  aria-label="Show password"
                  data-bs-original-title="Show password"
                  onClick={() => setIsPassVisible((p) => !p)}
                >
                  {isPassVisible ? (
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
          <div className="mb-3">
            <label className="form-label">Favorite Sport?</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter favorite sport"
              onChange={(e) =>
                setAuth((p) => ({ ...p, answer: e.target.value }))
              }
              value={auth?.answer}
              required
            />
          </div>
          {/* <div className="">
            <label className="form-check">
              <input type="checkbox" className="form-check-input" />
              <span className="form-check-label">
                Agree the{" "}
                <span tabIndex={-1} style={{ color: "#206bc4" }}>
                  terms and policy
                </span>
                .
              </span>
            </label>
          </div> */}
          <div className="form-footer">
            <button type="submit" className="btn btn-primary w-100">
              Create new account
            </button>
          </div>
        </div>
      </form>

      <div className="text-center text-secondary mt-3">
        Already have account?{" "}
        <Link to="/login" tabIndex={-1} style={{ color: "#206bc4" }}>
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default Signup;
