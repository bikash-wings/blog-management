import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/userSlice";

const OAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const setAuthDetails = () => {
    const token = queryParams.get("token");
    const user = queryParams.get("user");

    if (user && token) {
      dispatch(setUser({ user: JSON.parse(user), token: token }));
      navigate("/");
    }
  };

  useEffect(() => {
    setAuthDetails();
  }, []);

  return <h1>redirecting...</h1>;
};

export default OAuth;
