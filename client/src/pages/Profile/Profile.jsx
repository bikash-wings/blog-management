import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

import { updateUserRoute, uploadAvatarRoute } from "../../utills/apiRoutes";
import { setUser } from "../../store/userSlice";

const Profile = () => {
  let { user } = useSelector((state) => state.user);
  user = user.user;
  const dispatch = useDispatch();

  const [auth, setAuth] = useState({
    fname: "",
    lname: "",
    phone: 0,
    address: "",
    password: "",
    answer: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [isPassVisible, setIsPassVisible] = useState(false);

  const onUpdateUserInfo = async () => {
    try {
      const { data } = await axios.put(`${updateUserRoute}/${user?.id}`, {
        fname: auth.fname,
        lname: auth.lname,
        phone: auth.phone,
        address: auth.address,
        answer: auth.answer,
        password: auth.password,
      });
      dispatch(setUser({ user: data.data.user, token: data.data.token }));

      toast.success(data.message);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const onUploadAvatar = async () => {
    if (!avatar) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("avatar", avatar);

      const { data } = await axios.post(
        `${uploadAvatarRoute}/${user?.id}`,
        formData
      );
      dispatch(setUser({ user: data.data.user }));
      toast.success(data.message);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (user) {
      setAuth({
        fname: user?.fname,
        lname: user?.lname,
        phone: user?.phone,
        answer: user?.answer,
        address: user?.address,
      });
    }
  }, [user]);

  return (
    <div className="">
      <Sidebar />

      <div>
        <Navbar />

        {/* User details update section */}
        <div className="container-xl pb-4">
          <div className="container">
            <form
              className="card container pt-2"
              autoComplete="off"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onUpdateUserInfo();
                onUploadAvatar();
              }}
              // style={{padding:"0 10px"}}
            >
              <div className="card-body">
                <div className="row">
                  <h1 className="mb-4 ">Profile Settings</h1>
                  <div className="mb-2 col">
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
                  <label className="form-label">Mobile number</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter mobile number"
                    onChange={(e) =>
                      setAuth((p) => ({ ...p, phone: e.target.value }))
                    }
                    value={auth?.phone}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Address Line</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter address here"
                    onChange={(e) =>
                      setAuth((p) => ({ ...p, address: e.target.value }))
                    }
                    value={auth?.address}
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
                  <label className="form-label">Favorite Sport</label>
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
                  <label className="form-label">Upload Avatar</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setAvatar(e.target.files[0])}
                  />
                </div>
                <div className="form-footer text-center">
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
