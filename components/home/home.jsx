import Image from "next/image";
import React, { useState } from "react";
import profile1 from "./imgHome/profile.png";
import map from "./imgHome/map-pin.png";
import { useRouter } from "next/router";
import Pagination from "../pagination/pagination";
import { useListWorker } from "../../config/redux/hooks/userHook";

const Home = () => {
  const router = useRouter();
  const [refetch, setRefetch] = useState(Date.now());
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");

  const params = {
    page: Number(router.query.page) || 1,
    limit: 10,
    // search: router.query.search || search,
    sortby: router.query.sortby || sort,
  };

  const {
    data: worker,
    isLoading,
    pagination,
  } = useListWorker(params, refetch);

  const handleRoute = (id) => {
    router.push(`/profile/${id}`);
  };

  return (
    <main className="bg-light d-flex flex-column h-auto">
      <div style={{ backgroundColor: "#5e50a1" }}>
        <div className="container py-3">
          <p className="h2 font-weight-bold text-white">Top Jobs</p>
        </div>
      </div>

      <div className="container my-5">
        <div className="input-group bg-white d-flex align-items-center rounded-lg p-2 shadow">
          <input
            type="search"
            className="form-control border-0"
            placeholder="Search..."
            aria-label="Search"
            aria-describedby="Search input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="input-group-append mx-2">
            <select
              className="custom-select border-0"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option className="text-muted" value="">
                Sort
              </option>
              <option value="name">Name</option>
              <option value="skills">Skill</option>
              <option value="city">Location</option>
              <option value="last_work">Freelance</option>
              <option value="worker_jobdesk">Fulltime</option>
            </select>
          </div>
          <button
            className="btn text-white"
            type="button"
            style={{
              backgroundColor: "#5e50a1",
            }}
          >
            Search
          </button>
        </div>
      </div>

      {isLoading && <h5 className="text-center flex-grow-1">Loading...</h5>}
      <div className="container pb-5">
        <div className="row mx-n2">
          {worker.map((data, i) => (
            <div key={i} className="col-sm-6 col-md-4 col-lg-3 p-2">
              <div
                className="bg-white rounded-lg p-3 shadow card btn-card"
                onClick={() => handleRoute(data?.user_id)}
              >
                <Image
                  src={profile1}
                  alt="profile"
                  width={100}
                  className="rounded mb-3"
                />
                <p className="h5 font-weight-bolder">{data?.name}</p>
                <p className="h6 text-muted">{data?.last_work}</p>
                <div className="d-flex mb-2">
                  <Image src={map} alt="pin" width={16} />
                  <p className="h6 text-muted ml-2">{data?.city}</p>
                </div>
                <div className="d-flex" style={{ gap: 8 }}>
                  {data?.skills
                    ?.split(", ")
                    .slice(0, 2)
                    .map((skill, i) => (
                      <div
                        key={i}
                        className="bg-warning text-white rounded px-2"
                      >
                        <p className="m-1">{skill}</p>
                      </div>
                    ))}
                  {data?.skills?.split(", ").length > 2 && (
                    <p className="h6 m-1 text-muted">
                      {data?.skills.split(", ").length - 2}+
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-1">
        <Pagination
          totalPages={pagination?.totalPage}
          currentPage={pagination?.currentPage}
        />
      </div>
    </main>
  );
};

export default Home;
