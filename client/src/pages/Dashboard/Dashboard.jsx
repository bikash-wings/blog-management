import React, { useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

const Dashboard = () => {
  const [category, setCategory] = useState("/dashboard");

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
