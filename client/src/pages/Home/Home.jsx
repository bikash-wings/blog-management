import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import DataTables from "../../components/DataTables/DataTables";
import "./home.css";

const Home = () => {
  const [category, setCategory] = useState("/");
  const [modal, setModal] = useState({
    updateConfirm: false,
    edit: false,
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

export default Home;
