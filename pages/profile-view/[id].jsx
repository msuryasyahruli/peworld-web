import React, { useEffect, useState } from "react";
import Navlogin from "../../components/header/navlogin";
import Profile from "../../components/profile/profile";
import Footer from "../../components/footer/footer";
import Nav from "../../components/header/nav";
import NavHire from "../../components/header/navHire";
import ProfileViewer from "../../components/profile viewer/profileViewer";

const index = () => {
  const [login, setLogin] = useState();
  useEffect(() => {
    const login = localStorage.getItem("token");
    setLogin(login);
  }, []);

  const [role, setRole] = useState();
  useEffect(() => {
    const isRole = localStorage.getItem("role");
    setRole(isRole);
  }, []);

  if (!login) {
    return (
      <>
        <Navlogin />
        <Profile />
        <Footer />
      </>
    );
  } else if (role === "worker") {
    return (
      <>
        <Nav />
        <Profile />
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <NavHire />
        <ProfileViewer />
        <Footer />
      </>
    );
  }
};

export default index;
