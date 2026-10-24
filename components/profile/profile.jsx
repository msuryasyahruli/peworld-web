import Image from "next/image";
import { useState } from "react";
import {
  useUser,
  useUserExperience,
  useUserPortfolio,
} from "../../config/redux/hooks";
import { useRouter } from "next/router";
import formatDateRange from "./formatDateRange";
import { getUserId } from "../../config/storage";

import profile from "./imgProfile/profile.png";
import map from "./imgProfile/map-pin.png";
import mail from "./imgProfile/mail.png";
import instagram from "./imgProfile/instagram.png";
import github from "./imgProfile/github.png";
import gitlab from "./imgProfile/gitlab.png";

const Profile = () => {
  const router = useRouter();
  const paramName = router.query.id;
  const userId = getUserId();
  const [refetch, setRefetch] = useState(0);
  const { data: userData, isLoading } = useUser(refetch, paramName);
  const { userExperience, isLoading: isLoadingExperience } = useUserExperience(
    userData?.user_id,
    {},
    refetch,
  );
  const { userPortfolio, isLoading: isLoadingPortfolio } = useUserPortfolio(
    userData?.user_id,
    {},
    refetch,
  );

  return isLoading ? (
    <div>
      <h5 className="text-center flex-fill">Loading...</h5>
    </div>
  ) : (
    <main className="flex-grow-1">
      <section
        style={{
          background:
            "linear-gradient(to bottom, #5e50a1 0%, #5e50a1 350px, #f3f4f8 350px, #f3f4f8 100%)",
        }}
      >
        <div className="container py-5">
          <div className="row">
            <section className="col-lg-4 px-2 px-sm-3">
              <div className="rounded-lg bg-white p-3 p-md-4 shadow">
                <div className="py-3 d-flex justify-content-center">
                  <Image
                    src={!userData?.photo ? profile : userData?.photo}
                    alt="profile"
                    className="rounded-circle"
                    width={150}
                    height={150}
                  />
                </div>
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
                {paramName === userId && (
                  <button
                    className="btn w-100 rounded text-white py-2 mt-3"
                    style={{
                      background: "#5e50a1",
                    }}
                    onClick={() =>
                      router.push(`/profile/edit/${userData?.user_id}`)
                    }
                  >
                    {userData?.role ? "Edit Profile" : "Hire"}
                  </button>
                )}
                <p className="h4 font-weight-bolder mt-4">Skill</p>
                <div className="d-flex flex-wrap" style={{ gap: 8 }}>
                  {userData?.skills?.split(", ").map((skill, i) => (
                    <div key={i} className="bg-warning text-white rounded px-2">
                      <p className="m-1">{skill}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  {userData?.sosial_media?.map((account, i) => (
                    <div key={i} className="d-flex">
                      <Image src={account.icon} alt="mail" width={16} />
                      <p className="h6 text-muted ml-2">{account.media}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="col-lg-8 pt-3 pt-lg-0 px-2 px-sm-3">
              <div className="rounded-lg bg-white p-3 p-md-4 h-100 shadow">
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a
                      className="nav-item nav-link active"
                      id="nav-Portfolio-tab"
                      data-toggle="tab"
                      href="#nav-Portfolio"
                      role="tab"
                      aria-controls="nav-Portfolio"
                      aria-selected="true"
                    >
                      Portfolio
                    </a>
                    <a
                      className="nav-item nav-link"
                      id="nav-Experience-tab"
                      data-toggle="tab"
                      href="#nav-Experience"
                      role="tab"
                      aria-controls="nav-Experience"
                      aria-selected="false"
                    >
                      Experience
                    </a>
                  </div>
                </nav>
                <div className="tab-content mt-4" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="nav-Portfolio"
                    role="tabpanel"
                    aria-labelledby="nav-Portfolio-tab"
                  >
                    <div>
                      {isLoadingPortfolio ? (
                        <div>
                          <h5 className="text-center flex-fill">Loading...</h5>
                        </div>
                      ) : userPortfolio.length === 0 ? (
                        <div>
                          <h5 className="text-center flex-fill">
                            No portfolio available
                          </h5>
                        </div>
                      ) : (
                        <div className="row mx-n2">
                          {userPortfolio.map((data, index) => (
                            <div
                              key={index}
                              className="col-md-4 col-sm-6 text-center px-2"
                            >
                              <Image
                                src={data.photo}
                                alt={`${data.app_name} portfolio`}
                                height={150}
                                width={150}
                                className="rounded w-100"
                                style={{ objectFit: "cover" }}
                              />
                              <p>{data?.app_name}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-Experience"
                    role="tabpanel"
                    aria-labelledby="nav-Experience-tab"
                  >
                    <div>
                      {isLoadingExperience ? (
                        <h5 className="text-center flex-fill">Loading...</h5>
                      ) : userExperience.length === 0 ? (
                        <div>
                          <h5 className="text-center flex-fill">
                            No experience available
                          </h5>
                        </div>
                      ) : (
                        userExperience.map((data, index) => (
                          <div key={index}>
                            <p className="h5 font-weight-bolder">
                              {data?.position}
                            </p>
                            <p className="h6">{data?.company_name}</p>
                            <p className="text-muted">
                              {formatDateRange(
                                data?.working_start,
                                data?.working_end,
                              )}
                            </p>
                            <p className="text-muted">{data?.description}</p>
                            <hr />
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;
