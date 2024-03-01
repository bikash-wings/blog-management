import { useState } from "react";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import DataTables from "../../components/DataTables/Datatables";

const Admin = () => {
  const [category, setCategory] = useState<string>("/");
  const [modal, setModal] = useState<{
    updateConfirm: boolean;
    confirm: boolean;
  }>({
    updateConfirm: false,
    confirm: false,
  });

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
