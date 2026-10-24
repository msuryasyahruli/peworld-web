import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../config/redux/hooks/userHook";
import Modal from "../alert/modal";
import PersonalData from "./profileEdit/PersonalData";
import Skill from "./profileEdit/skill";
import Experience from "./profileEdit/Experience";
import Portofolio from "./profileEdit/Portofolio";
import { getUserId } from "../../config/storage";

import profile from "./imgProfile/profile.png";
import map from "./imgEditProfile/map-pin.png";

const EditProfile = () => {
  const router = useRouter();
  const paramName = router.query.id;
  const userId = getUserId();
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(0);
  const { data: userData, isLoading } = useUser(refetch);

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setImageFile(file);
    } else {
      setImagePreview(null);
      setImageFile(null);
    }
  };

  return paramName !== userId ? (
    <div>
      <h3 className="text-center">Loading...</h3>
    </div>
  ) : (
    <main
      style={{
        background:
          "linear-gradient(to bottom, #5e50a1 0%, #5e50a1 350px, #f3f4f8 350px, #f3f4f8 100%)",
      }}
    >
      <div className="container pt-5 pb-5">
        <div className="row">
          <section className="col-lg-4 px-2 px-sm-3">
            <div className="rounded-lg bg-white p-3 p-md-4 shadow">
              <div className="py-3 d-flex flex-column align-items-center">
                <Image
                  src={!userData?.photo ? profile : userData?.photo}
                  alt="profile"
                  className="rounded-circle"
                  width={150}
                  height={150}
                />
                <Modal
                  modalTitle="Edit photo"
                  btnTitle={
                    <>
                      <i className="bi bi-pencil-square" /> Edit
                    </>
                  }
                  buttonClassName="font-weight-bold text-black-50 rounded-pill"
                >
                  <form>
                    <div className="form-group">
                      <div className="mx-auto mb-3 d-flex align-items-center">
                        <Image
                          src={imagePreview || userData?.user_photo || profile}
                          alt="userPicture"
                          className="rounded-circle mr-3"
                          style={{ objectFit: "cover" }}
                          width={144}
                          height={144}
                        />
                        <input
                          type="file"
                          id="image"
                          className="form-control"
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>
                    <hr />
                    <div className="form-row">
                      <div className="col">
                        <button
                          type="button"
                          className="btn btn-outline-danger rounded-pill w-100"
                          data-dismiss="modal"
                        >
                          Batal
                        </button>
                      </div>
                      <div className="col">
                        <button
                          type="button"
                          className="btn btn-primary rounded-pill w-100"
                        >
                          Simpan
                        </button>
                      </div>
                    </div>
                  </form>
                </Modal>
              </div>
              <div className="d-flex flex-column align-items-center align-items-lg-start">
                <p className="h4 font-weight-bolder">{userData?.name}</p>
                <p className="h6">{userData?.last_work}</p>
                <div className="d-flex">
                  <Image src={map} alt="pin" width={16} />
                  <p className="h6 text-muted ml-2">
                    {userData?.city}, {userData?.province}
                  </p>
                </div>
                <p className="text-muted">{userData?.workplace}</p>
                <p className="h6 text-muted">{userData?.description}</p>
              </div>
            </div>
            {/* <button className="btn btn-primary mt-3 w-100 shadow">
              Simpan
            </button>
            <button className="btn btn-outline-primary mt-3 w-100 shadow">
              Batal
            </button> */}
          </section>

          <section className="col-lg-8 pt-3 pt-lg-0 px-2 px-sm-3">
            <PersonalData
              onData={userData}
              onLoading={setLoading}
              onRefetch={setRefetch}
            />
            <Skill onData={userData} onRefetch={setRefetch} />
            <Experience />
            <Portofolio />
          </section>
        </div>
      </div>
    </main>
  );
};

export default EditProfile;
