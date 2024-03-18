/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import DataTables from "../../components/DataTables/Datatables";

import { checkAdminUserRoute } from "../../utills/apiRoutes";
import { useAppSelector } from "../../store/hooks";

const Admin = () => {
  const { user } = useAppSelector((state) => state);
  const navigate = useNavigate();

  const [category, setCategory] = useState<string>("/");
  const [modal, setModal] = useState<{
    updateConfirm: boolean;
    confirm: boolean;
  }>({
    updateConfirm: false,
    confirm: false,
  });

  const handleAdminUserLogin = async () => {
    try {
      const { data } = await axios.get(checkAdminUserRoute, {
        headers: { authorization: user?.token },
      });

      if (!data.success) {
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      navigate("/");
    }
  };

  useEffect(() => {
    handleAdminUserLogin();

    return () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home-cnt">
      <Sidebar category={category} setCategory={setCategory} />

      <div>
        <Navbar />
        <DataTables category={category} modal={modal} setModal={setModal} />
      </div>
    </div>
  );
};

export default Admin;
