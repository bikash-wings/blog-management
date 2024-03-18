/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAppSelector((state) => state);
  const navigate = useNavigate();
  const [category, setCategory] = useState<string>("/dashboard");

  useEffect(() => {
    if (!user?.user?.permissions.includes("dashboard")) {
      navigate("/");
    }
  }, [user]);

  return (
    <div>
      <Sidebar setCategory={setCategory} category={category} />

      <div>
        <Navbar />
      </div>
    </div>
  );
};

export default Dashboard;
