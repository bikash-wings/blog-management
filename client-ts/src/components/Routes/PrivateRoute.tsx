import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { ClockLoader } from "react-spinners";

const PrivateRoute = () => {
  const { user } = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    if (!user) {
      setCounter(3);
    }
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev === 1) {
          navigate("/login");
          clearInterval(interval);
          return 0;
        } else {
          return prev - 1;
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [navigate]);

  return user ? (
    <Outlet />
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div style={{ fontSize: "1.5rem" }}>Redirecting in {counter}</div>
      <ClockLoader />
    </div>
  );
};

export default PrivateRoute;
