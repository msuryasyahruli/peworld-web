import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { clearStorage, getUserData } from "../../config/storage";

import logo from "../../public/assets/imgNav/logo.png";
import bell from "../../public/assets/imgNav/bell.png";
import mail from "../../public/assets/imgNav/mail.png";
import Profile2 from "../../public/assets/imgNav/profile2.png";

const Nav = () => {
  const router = useRouter();
  const [userData, setData] = useState();

  useEffect(() => {
    const data = getUserData();
    setData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLogout = () => {
    router.push("/");
    setData(null);
    clearStorage();
  };

  return (
    <header className="py-2 sticky-top bg-white shadow-sm flex-fill">
      <nav
        className="container d-flex align-items-center"
        style={{ height: 50 }}
      >
        <section className="flex-1">
          <Image src={logo} alt="logo" />
        </section>
        {!userData ? (
          <section>
            <button
              className="btn border-primary mr-2 px-3"
              onClick={() => router.push("/auth/sign-in?as=worker")}
            >
              Masuk Untuk Pekerja
            </button>
            <button
              className="btn text-white px-3"
              style={{ backgroundColor: "#5e50a1" }}
              onClick={() => router.push("/auth/sign-in?as=recruiter")}
            >
              Masuk Untuk Perekrut
            </button>
          </section>
        ) : (
          <section className="d-flex row">
            <button className="btn p-0 m-3">
              <Image src={bell} alt="bell" />
            </button>
            <button className="btn p-0 m-3">
              <Image src={mail} alt="mail" />
            </button>
            <div className="btn-group">
              <button
                className="btn p-0 m-3"
                type="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <Image
                  className="rounded-circle"
                  src={Profile2}
                  alt="profile"
                  width={28}
                  height={28}
                />
              </button>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="dropdown"
              >
                <button
                  className="dropdown-item btn-light"
                  onClick={() =>
                    router.push(`/profile/${userData?.user_id || userData?.id}`)
                  }
                >
                  Profile
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => router.push(`/profile/edit/${userData?.id}`)}
                >
                  Edit profile
                </button>
                <button
                  className="dropdown-item btn-light text-danger"
                  onClick={isLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </section>
        )}
      </nav>
    </header>
  );
};

export default Nav;
