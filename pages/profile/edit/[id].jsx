import React, { useEffect, useState } from "react";
import EditProfile from "../../../components/profile/editProfile";
import Nav from "../../../components/header/nav";
import Footer from "../../../components/footer/footer";
import EditProfileRecruiter from "../../../components/profile recruit/editProfileRecruiter";
import NavHire from "../../../components/header/navHire";

const Edit = () => {
  const [role, setRole] =
    useState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const isRole = localStorage.getItem("role");
    setRole(isRole);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (role === "worker") {
    return (
      <>
        <Nav />
        <EditProfile />
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <NavHire />
        <EditProfileRecruiter />
        <Footer />
      </>
    );
  }
};

export default Edit;
