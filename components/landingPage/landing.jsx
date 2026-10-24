import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import img1 from "./imgLandingPage/landingImg1.png";
import img2 from "./imgLandingPage/landingImg2.png";
import img3 from "./imgLandingPage/landingImg3.png";
import tick1 from "./imgLandingPage/tick 1.png";
import tick2 from "./imgLandingPage/tick 2.png";
import profile1 from "./imgLandingPage/profile1.png";
import profile2 from "./imgLandingPage/profile2.png";
import profile3 from "./imgLandingPage/profile3.png";

const Landing = () => {
  const router = useRouter();

  const testimoni = [
    {
      img: profile1,
      name: "Harry Styles",
      role: "Web Developer",
      description:
        "Peworld membantu saya menemukan proyek yang sesuai dengan keahlian saya. Platform ini sangat user-friendly dan memberikan banyak kesempatan kerja!",
    },
    {
      img: profile2,
      name: "Niall Horan",
      role: "Web Developer",
      description:
        "Saya sangat puas dengan layanan Peworld. Proses pencarian pekerjaan menjadi lebih mudah, dan saya bisa terhubung langsung dengan perusahaan terbaik.",
    },
    {
      img: profile3,
      name: "Louis Tomlinson",
      role: "Web Developer",
      description:
        "Dengan Peworld, saya mendapatkan pekerjaan impian saya dalam waktu singkat. Rekomendasi pekerjaannya sangat akurat dan sesuai dengan keahlian saya!",
    },
  ];

  return (
    <main>
      <section className="container">
        <section className="row my-4">
          <div className="col-md-6 d-flex align-items-center">
            <div>
              <p className="h2 font-weight-bold">
                The Best Talents for the 4.0 Revolution
              </p>
              <p className="text-muted">
                Together with us, bring innovation and change with the best
                capabilities in the industrial revolution era.
              </p>
              <button
                className="btn rounded text-white p-3 font-weight-bold"
                style={{
                  backgroundColor: "#5e50a1",
                }}
                onClick={() => router.push("/home")}
              >
                Start Now
              </button>
            </div>
          </div>
          <div className="col-md-6 p-3">
            <Image src={img1} alt="img1" className="w-100 h-100" />
          </div>
        </section>
        <section className="row flex-md-row-reverse my-4">
          <div className="col-md-6">
            <div style={{ marginTop: 30 }}>
              <p className="h2 font-weight-bold">
                Why Should You Look for Talents on Peworld?
              </p>
              {[
                "Access to thousands of quality professionals.",
                "Faster and more efficient recruitment process.",
                "Talents ready to work with various skills.",
                "Trusted platform with a high-security system.",
              ].map((data, i) => (
                <div key={i} className="d-flex">
                  <Image src={tick1} alt="tick1" />
                  <p className="mx-3">{data}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-6">
            <Image src={img2} alt="img2" className="w-100 h-100" />
          </div>
        </section>
        <section className="row my-4">
          <div className="col-md-6 d-flex align-items-center">
            <div>
              <p className="h2 font-weight-bold">Skill Talent</p>
              <p className="text-muted">
                Various technology skills mastered by the best talents in their
                fields.
              </p>
              <div className="d-flex flex-wrap">
                {[
                  "Java",
                  "Kotlin",
                  "PHP",
                  "Javascript",
                  "Golang",
                  "C++",
                  "Ruby",
                  "10+ more skills",
                ].map((data, i) => (
                  <div key={i} className="d-flex w-50">
                    <Image src={tick2} alt="tick2" />
                    <p className="mx-3">{data}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <Image src={img3} alt="img3" className="w-100 h-100" />
          </div>
        </section>
      </section>
      <section className="py-5 bg-light">
        <div className="container">
          <p className="h2 font-weight-bold text-center mb-4">
            Their Opinions About Peworld
          </p>
          <section className="row">
            {testimoni.map((data, i) => (
              <div key={i} className="col-lg-4 col-sm-6 my-2">
                <div className="h-100 d-flex align-items-center flex-column text-center bg-white rounded p-4 shadow">
                  <div
                    className="rounded-circle d-flex justify-content-center align-items-center m-3"
                    style={{
                      width: 140,
                      height: 140,
                      backgroundColor: "#fbb0175e",
                    }}
                  >
                    <Image src={data.img} alt="profile" />
                  </div>
                  <p className="h3 font-weight-bold">{data.name}</p>
                  <p className="h6 text-muted">{data.role}</p>
                  <p className="h6">{data.description}</p>
                </div>
              </div>
            ))}
          </section>
        </div>
      </section>
      <section className="container py-3 py-sm-5">
        <div
          className="d-flex p-4 p-md-5 align-items-center flex-column flex-sm-row"
          style={{
            backgroundColor: "#5e50a1",
            borderRadius: "40px 8px 40px 8px",
            gap: 8,
          }}
        >
          <p className="h2 text-white flex-1">
            Find the Best Talents for Your Business
          </p>
          <button
            className="btn btn-light font-weight-bold p-3"
            style={{ color: "#5e50a1" }}
            onClick={() => router.push("/home")}
          >
            Start Now
          </button>
        </div>
      </section>
    </main>
  );
};

export default Landing;
