import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import DataTables from "../../components/DataTables/Datatables";

import { checkUserRoleRoute } from "../../utills/apiRoutes";

const UsersCatalog = () => {
  const { user } = useSelector((state: any) => state);
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
    checkUserAccessibility();
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

export default UsersCatalog;
