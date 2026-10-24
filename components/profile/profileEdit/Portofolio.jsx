import Image from "next/image";
import { useState } from "react";
import { useUserPortfolio } from "../../../config/redux/hooks";
import { getUserId } from "../../../config/storage";
import {
  addPortfolio,
  deletePortfolio,
  updatePortfolio,
} from "../../../config/redux/actions/portfolioAction";
import Modal from "../../alert/modal";
import PortfolioForm from "./PortfolioForm";
import upload from "../imgEditProfile/upload.png";

const PortfolioItem = ({ portfolio, onUpdate, onDelete }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const initialValues = {
    app_name: portfolio.app_name || "",
    type: portfolio.type || "",
    link: portfolio.link || "",
    photo: portfolio.photo || "",
  };

  return (
    <div>
      <div className="form-row align-items-center">
        <div className="col-md-4 mb-3 mb-md-0">
          {portfolio.photo ? (
            <Image
              src={portfolio.photo}
              alt={`${portfolio.app_name} portfolio`}
              width={320}
              height={200}
              unoptimized
              className="rounded w-100 h-auto"
            />
          ) : (
            <Image
              src={upload}
              alt="No portfolio image"
              className="rounded w-100 h-auto"
            />
          )}
        </div>
        <div className="col-md-6">
          <p className="mt-2 h6 font-weight-bold">{portfolio.app_name}</p>
          <a
            className="h6 d-block text-break"
            href={portfolio.link}
            target="_blank"
            rel="noreferrer"
          >
            {portfolio.link}
          </a>
          <p className="h6 text-black-50">{portfolio.type}</p>
        </div>
        <div className="col-md-2 d-flex flex-md-column align-items-end">
          <Modal
            modalTitle="Edit portfolio"
            btnTitle="Edit"
            buttonClassName="text-warning font-weight-bold"
            show={isEditOpen}
            onOpen={() => setIsEditOpen(true)}
            onClose={() => setIsEditOpen(false)}
          >
            <PortfolioForm
              initialValues={initialValues}
              onSubmit={(values) => onUpdate(portfolio.id, values)}
              onCancel={() => setIsEditOpen(false)}
              submitLabel="Save changes"
            />
          </Modal>
          <Modal
            modalTitle="Delete confirmation"
            btnTitle="Delete"
            buttonClassName="text-danger font-weight-bold"
            show={isDeleteOpen}
            onOpen={() => setIsDeleteOpen(true)}
            onClose={() => setIsDeleteOpen(false)}
          >
            <p className="h4 text-center font-weight-bolder">Are you sure you want to delete this portfolio?</p>
            <hr />
            <button
              type="button"
              className="btn btn-danger rounded-pill w-100"
              onClick={async () => {
                const succeeded = await onDelete(portfolio.id);
                if (succeeded) setIsDeleteOpen(false);
              }}
            >
              Yes, Delete
            </button>
          </Modal>
        </div>
      </div>
      <hr />
    </div>
  );
};

const Portofolio = () => {
  const userId = getUserId();
  const [refetch, setRefetch] = useState(0);
  const { userPortfolio, isLoading } = useUserPortfolio(userId, {}, refetch);

  const createPortfolioFormData = (values, includeUserId = false) => {
    const formData = new FormData();
    formData.append("app_name", values.app_name);
    formData.append("type", values.type);
    formData.append("link", values.link);
    if (includeUserId) formData.append("user_id", userId);
    if (values.photo instanceof File) {
      formData.append("photo", values.photo);
    }
    return formData;
  };

  const handleCreate = async (values) => {
    const succeeded = await addPortfolio(
      createPortfolioFormData(values, true),
    );
    if (succeeded) setRefetch((current) => current + 1);
    return succeeded;
  };

  const handleUpdate = async (id, values) => {
    const succeeded = await updatePortfolio(
      id,
      createPortfolioFormData(values),
    );
    if (succeeded) setRefetch((current) => current + 1);
    return succeeded;
  };

  const handleDelete = async (id) => {
    const succeeded = await deletePortfolio(id);
    if (succeeded) setRefetch((current) => current + 1);
    return succeeded;
  };

  return (
    <div className="mt-3 rounded-lg bg-white p-3 p-md-4 shadow">
      <p className="h4 font-weight-bolder">Portfolio</p>
      <hr />
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100px" }}
        >
          <p>Loading...</p>
        </div>
      ) : userPortfolio.length === 0 ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100px" }}
        >
          <p>No portfolio found.</p>
        </div>
      ) : (
        userPortfolio.map((portfolio) => (
          <PortfolioItem
            key={portfolio.id}
            portfolio={portfolio}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))
      )}

      <PortfolioForm
        initialValues={{ user_id: userId }}
        onSubmit={handleCreate}
        submitLabel="Add portfolio"
        submitClassName="btn btn-outline-warning w-100"
      />
    </div>
  );
};

export default Portofolio;
