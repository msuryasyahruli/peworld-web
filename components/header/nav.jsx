import Image from "next/image";
import React from "react";
import logo from "./imgNav/logo.png";
import bell from "./imgNav/bell.png";
import mail from "./imgNav/mail.png";
import Profile from "./imgNav/profile.png";

const Nav = () => {
  const isLogout = () => {
    localStorage.clear();
    window.location.reload()
  };

  return (
    <div>
      <header>
        <nav
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: 100,
          }}
        >
          <div>
            <Image src={logo} alt="logo" />
          </div>
          <div className="row">
            <div className="pt-2">
              <Image className="ml-3 mr-3" src={bell} alt="bell" />
            </div>
            <div className="pt-2">
              <Image className="ml-3 mr-3" src={mail} alt="mail" />
            </div>
            <div className="mr-3">
              <ul className="navbar-nav dropdown">
                <li className="nav-item">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <Image className="ml-3" src={Profile} alt="profile" />
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <a className="dropdown-item" href="/profile/edit">
                      Profile
                    </a>
                    <a
                      className="dropdown-item"
                      href="#logout"
                      onClick={isLogout}
                    >
                      Log Out
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Nav;
