/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Navbar from "../../components/Navbar/Navbar";

import {
  updateUserRoute,
  uploadAvatarRoute,
  userProfileRoute,
} from "../../utills/apiRoutes";
import { setUser } from "../../store/userSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const Profile = () => {
  const { user } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const [auth, setAuth] = useState<{
    fname: string;
    lname: string;
    phone: number;
    address: string;
    password: string;
    answer: string;
  }>({
    fname: "",
    lname: "",
    phone: 0,
    address: "",
    password: "",
    answer: "",
  });
  const [avatar, setAvatar] = useState<null | File>(null);
  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);

  const getProfileInfo = async () => {
    try {
      const { data } = await axios.get(userProfileRoute, {
        headers: { authorization: user?.token },
      });

      setAuth({
        fname: data.data?.fname,
        lname: data.data?.lname,
        phone: data.data?.phone,
        answer: data.data?.answer,
        address: data.data?.address,
        password: "",
      });
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const onUpdateUserInfo = async () => {
    try {
      const { data } = await axios.put(`${updateUserRoute}/${user.user?.id}`, {
        fname: auth.fname,
        lname: auth.lname,
        phone: auth.phone,
        address: auth.address,
        answer: auth.answer,
        password: auth.password,
      });
      dispatch(setUser({ user: data.data.user, token: data.data.token }));

      toast.success(data.message);
    } catch (error: any) {
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
        `${uploadAvatarRoute}/${user.user?.id}`,
        formData
      );
      dispatch(
        setUser({
          user: data.data.user,
          token: user.token,
        })
      );
      toast.success(data.message);
    } catch (error: any) {
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  return (
    <div className="">
      <div>
        <Navbar />

        {/* User details update section */}
        <div className="container pb-4">
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
                    setAuth((p) => ({ ...p, phone: Number(e.target.value) }))
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
                  onChange={(e) =>
                    e.target.files?.length && setAvatar(e.target.files[0])
                  }
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
  );
};

export default Profile;
