import Image from "next/image";
import React, { useEffect } from "react";
import profile from "./imgProfile/profile.png";
import map from "./imgEditProfile/map-pin.png";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import DataDiri from "./profileEdit/DataDiri";
import Skill from "./profileEdit/skill";
import Pengalaman from "./profileEdit/Pengalaman";
import Portofolio from "./profileEdit/Portofolio";
import UploadPhoto from "../modal photo/uploadPhoto";

const EditProfile = () => {
  const router = useRouter();
  const [worker, setWorker] = useState([]);
  useEffect(() => {
    if (router.isReady) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API}/worker/${router.query.id}`)
        .then((res) => {
          setWorker(res.data.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return (
    <div>
      <main style={{ backgroundColor: "#f6f7f8" }}>
        <section
          style={{
            background:
              "linear-gradient( to bottom,#5e50a1 0%,#5e50a1 350px, #f3f4f8 350px,#f3f4f8 100%)",
          }}
        >
          <div className="container pt-5 pb-5">
            <div className="row">
              <section className="col-lg-4">
                <div
                  style={{ borderRadius: 8, background: "white", padding: 20 }}
                >
                  <div
                    className="pt-3 pb-3 justify-content-center d-flex align-items-center"
                    style={{ flexDirection:"column" }}
                  >
                    <div style={{ width: "150px", height: "150px" }}>
                      {!worker.worker_photo ? (
                        <Image
                          src={profile}
                          alt="profile"
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "100%",
                          }}
                        />
                      ) : (
                        <Image
                          src={worker.worker_photo}
                          alt="profile"
                          width={100}
                          height={100}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "100%",
                          }}
                        />
                      )}
                    </div>
                    <UploadPhoto
                      worker_id={worker.worker_id}
                      photo={worker.worker_photo}
                    ></UploadPhoto>
                  </div>
                  <p style={{ fontSize: 22, fontWeight: 600 }}>
                    {worker.worker_name}
                  </p>
                  <p>{worker.worker_jobdesk}</p>
                  <div style={{ display: "flex" }}>
                    <div className="mr-2">
                      <Image src={map} alt="map" />
                    </div>
                    <p
                      style={{
                        color: "#9ea0a5",
                        fontSize: 14,
                        fontWeight: 400,
                      }}
                    >
                      {worker.worker_city}, {worker.worker_province}
                    </p>
                  </div>
                  <p
                    style={{ color: "#9ea0a5", fontSize: 14, fontWeight: 400 }}
                  >
                    {worker.worker_workplace}
                  </p>
                </div>
                <button
                  className="w-100 mt-3"
                  style={{
                    height: 50,
                    backgroundColor: "#5e50a1",
                    borderRadius: 10,
                    color: "white",
                  }}
                >
                  Simpan
                </button>
                <button
                  className="w-100 mt-3"
                  style={{
                    height: 50,
                    backgroundColor: "white",
                    borderRadius: 10,
                    color: "#5e50a1",
                  }}
                >
                  Batal
                </button>
              </section>
              <section className="col-lg-8 pt-3 pt-lg-0">
                <DataDiri />
                <Skill />
                <Pengalaman />
                <Portofolio />
              </section>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EditProfile;
