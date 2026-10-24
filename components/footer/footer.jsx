import Image from "next/image";
import React from "react";
import logo from "./imgFooter//logo.png";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex-fill" style={{ backgroundColor: "#5e50a1" }}>
      <div className="container">
        <Image src={logo} className="my-3" alt="logo" />
        <p className="text-white" style={{ maxWidth: 420 }}>
          Peworld is a platform that connects companies with the best talents in various fields. Find professionals that match your needs now!
        </p>
        <hr className="border-white" />
        <div className="d-flex flex-column flex-sm-row w-100 text-white pb-3">
          <p className="flex-1 m-0">2020 Peworld. All right reserved</p>
          <div className="d-flex" style={{ gap: "3rem" }}>
            <Link href="/" className="text-white">
              Phone
            </Link>
            <Link href="/" className="text-white">
              Email
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
