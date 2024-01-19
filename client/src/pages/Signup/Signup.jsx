import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupRoute, uploadAvatarRoute } from "../../utills/apiRoutes";
import toast from "react-hot-toast";

const Signup = () => {
  const [auth, setAuth] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    answer: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [isPassVisible, setIsPassVisible] = useState(false);

  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      const { data } = await axios.post(signupRoute, auth);
      toast.success(data.message);
      await uploadAvatar(data.data?.id);
        navigate("/");
      console.log(data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const uploadAvatar = async (userid) => {
    try {
      const formData = new FormData("avatar", avatar);
      const { data } = await axios.post(
        `${uploadAvatarRoute}/${userid}`,
        formData
      );
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    console.log(auth);
  }, [auth]);

  return (
    <div className="container-tight py-4">
      <form
        className="card card-md"
        autoComplete="off"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          registerUser();
        }}
      >
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Create new account</h2>
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
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) =>
                setAuth((p) => ({ ...p, email: e.target.value }))
              }
              value={auth?.email}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group input-group-flat">
              <input
                type={isPassVisible ? "text" : "password"}
                className="form-control"
                placeholder="Password"
                autoComplete="off"
                onChange={(e) =>
                  setAuth((p) => ({ ...p, password: e.target.value }))
                }
                value={auth?.password}
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
          <div className="mb-3">
            <label className="form-label">Favorite Sport?</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter favorite sport"
              onChange={(e) =>
                setAuth((p) => ({ ...p, answer: e.target.value }))
              }
              value={auth?.answer}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Select Profile Pic</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
          </div>
          <div className="mb-3">
            <label className="form-check">
              <input type="checkbox" className="form-check-input" />
              <span className="form-check-label">
                Agree the{" "}
                <a href="./terms-of-service.html" tabIndex={-1}>
                  terms and policy
                </a>
                .
              </span>
            </label>
          </div>
          <div className="form-footer">
            <button type="submit" className="btn btn-primary w-100">
              Create new account
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
