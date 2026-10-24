import { useState } from "react";
import { useUserExperience } from "../../../config/redux/hooks";
import { getUserId } from "../../../config/storage";
import {
  addExperience,
  deleteExperience,
  updateExperience,
} from "../../../config/redux/actions/experienceAction";
import formatDateRange from "../formatDateRange";
import Modal from "../../alert/modal";
import ExperienceForm from "./ExperienceForm";

const ExperienceItem = ({ experience, onUpdate, onDelete }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const initialValues = {
    position: experience.position || "",
    company_name: experience.company_name || "",
    working_start: experience.working_start
      ? String(experience.working_start).slice(0, 10)
      : "",
    working_end: experience.working_end
      ? String(experience.working_end).slice(0, 10)
      : "",
    description: experience.description || "",
  };

  return (
    <div>
      <div className="form-row">
        <div className="col-md-8">
          <p className="h5 font-weight-bolder">{experience.position}</p>
          <p className="h6">{experience.company_name}</p>
          <p className="text-muted">
            {formatDateRange(
              experience.working_start,
              experience.working_end,
            )}
          </p>
          <p className="text-black">{experience.description}</p>
        </div>
        <div className="col-md-4 d-flex flex-md-column align-items-end">
          <Modal
            modalTitle="Edit experience"
            btnTitle="Edit"
            buttonClassName="text-warning font-weight-bold"
            show={isEditOpen}
            onOpen={() => setIsEditOpen(true)}
            onClose={() => setIsEditOpen(false)}
          >
            <ExperienceForm
              initialValues={initialValues}
              onSubmit={(values) => onUpdate(experience.id, values)}
              onCancel={() => setIsEditOpen(false)}
              submitLabel="Save changes"
            />
          </Modal>
          <Modal
            modalTitle="Delete confirmation"
            btnTitle="Delete"
            buttonClassName="text-danger font-weight-bold"
          >
            <p className="h4 text-center font-weight-bolder">Are you sure you want to delete this work experience?</p>
            <hr />
            <button
              type="button"
              className="btn btn-danger rounded-pill w-100"
              onClick={() => onDelete(experience.id)}
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

const Experience = () => {
  const userId = getUserId();
  const [refetch, setRefetch] = useState(0);
  const { userExperience, isLoading } = useUserExperience(userId, {}, refetch);

  const handleCreate = async (values) => {
    const succeeded = await addExperience({ ...values, user_id: userId });
    if (succeeded) setRefetch((current) => current + 1);
    return succeeded;
  };

  const handleUpdate = async (id, values) => {
    const succeeded = await updateExperience(id, values);
    if (succeeded) setRefetch((current) => current + 1);
    return succeeded;
  };

  const handleDelete = async (id) => {
    const succeeded = await deleteExperience(id);
    if (succeeded) setRefetch((current) => current + 1);
  };

  return (
    <div className="mt-3 rounded-lg bg-white p-3 p-md-4 shadow">
      <p className="h4 font-weight-bolder">Experience</p>
      <hr />
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100px" }}
        >
          <p>Loading...</p>
        </div>
      ) : userExperience.length === 0 ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100px" }}
        >
          <p>No experience found.</p>
        </div>
      ) : (
        userExperience.map((experience) => (
          <ExperienceItem
            key={experience.id}
            experience={experience}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))
      )}

      <ExperienceForm
        initialValues={{ user_id: userId }}
        onSubmit={handleCreate}
        submitLabel="Add Work Experience"
        submitClassName="btn btn-outline-warning w-100"
      />
    </div>
  );
};

export default Experience;
