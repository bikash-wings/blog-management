import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

const Profile = () => {
  const [modal, setModal] = useState({});

  return (
    <div>
      <Navbar modal={modal} setModal={setModal} />
      Profile
    </div>
  );
};

export default Profile;
