import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { updateSkill } from "../../../config/redux/actions/userAction";

const Skill = ({ onData, onRefetch }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({});

  useEffect(() => {
    if (onData) {
      reset({
        skills: onData?.skills || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onData, reset]);

  const skillSubmit = async (data) => {
    await updateSkill(data, onData?.user_id)
      .then(() => {
        onRefetch((current) => current + 1);
      })
      .catch(() => {});
  };

  return (
    <div className="mt-3 rounded-lg bg-white p-3 p-md-4 shadow">
      <p className="h4 font-weight-bolder">Skills</p>
      <hr />
      <form onSubmit={handleSubmit(skillSubmit)}>
        <div className="form-row">
          <div className="form-group col-md-10">
            <input
              type="text"
              className="form-control"
              placeholder="Tambahkan skill"
              {...register("skills", { required: true })}
            />
            {errors.skills && (
              <small className="text-danger">Skill is required</small>
            )}
          </div>
          <div className="col-md-2">
            <button
              type="submit"
              className="btn btn-warning text-white w-100"
              disabled={!isDirty}
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Skill;
