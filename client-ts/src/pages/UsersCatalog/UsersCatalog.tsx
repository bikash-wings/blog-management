import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import DataTables from "../../components/DataTables/Datatables";

import { checkUserRoleRoute } from "../../utills/apiRoutes";
import { useAppSelector } from "../../store/hooks";

const UsersCatalog = () => {
  const { user } = useAppSelector((state) => state);
  const navigate = useNavigate();

  const [category, setCategory] = useState("/users");
  const [modal, setModal] = useState({
    updateConfirm: false,
    confirm: false,
  });

  const checkUserAccessibility = async () => {
    try {
      const { data } = await axios.get(checkUserRoleRoute, {
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
    // checkUserAccessibility();
  }, []);

  useEffect(() => {
    if (!user?.user?.permissions.includes("view-users")) {
      navigate("/");
    }
  }, [user?.user]);

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

export default UsersCatalog;
