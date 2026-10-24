import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateUser } from "../../../config/redux/actions/userAction";

const PersonalData = ({ onData, onLoading, onRefetch }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({});

  useEffect(() => {
    if (onData) {
      reset({
        name: onData?.name || "",
        last_work: onData?.last_work || "",
        company_name: onData?.company_name || "",
        company_email: onData?.company_email || "",
        company_phone: onData?.company_phone || "",
        company_field: onData?.company_field || "",
        city: onData?.city || "",
        province: onData?.province || "",
        description: onData?.description || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onData, reset]);

  const dataSubmit = async (data) => {
    onLoading(true);
    try {
      const succeeded = await updateUser(data, {
        userId: onData?.user_id,
        profileId: onData?.id,
        role: onData?.role,
      });
      if (succeeded) onRefetch(Date.now());
    } finally {
      onLoading(false);
    }
  };

  return (
    <div className="rounded-lg bg-white p-3 p-md-4 shadow">
      <p className="h4 font-weight-bolder">Personal data</p>
      <hr />
      <form onSubmit={handleSubmit(dataSubmit)} className="text-black-50">
        <div className="form-group">
          <label htmlFor="inputName">Full name</label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            placeholder="Enter full name"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <small className="text-danger">Full name is required</small>
          )}
        </div>
        {onData?.role ? (
          <div className="form-group">
            <label htmlFor="inputWork">Job desk</label>
            <input
              type="text"
              className="form-control"
              id="inputWork"
              placeholder="Enter job desk"
              {...register("last_work", { required: true })}
            />
            {errors.last_work && (
              <small className="text-danger">Job desk is required</small>
            )}
          </div>
        ) : (
          <>
            <div className="form-group">
              <label htmlFor="inputCompanyName">Company name</label>
              <input
                type="text"
                className="form-control"
                id="inputCompanyName"
                {...register("company_name")}
              />
            </div>
            <div className="form-row">
              <div className="form-group col-sm-6">
                <label htmlFor="inputCompanyEmail">Company email</label>
                <input
                  type="email"
                  className="form-control"
                  id="inputCompanyEmail"
                  {...register("company_email")}
                />
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="inputCompanyPhone">Company phone</label>
                <input
                  type="tel"
                  className="form-control"
                  id="inputCompanyPhone"
                  {...register("company_phone")}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputCompanyField">Company field</label>
              <input
                type="text"
                className="form-control"
                id="inputCompanyField"
                {...register("company_field")}
              />
            </div>
          </>
        )}
        <div className="form-row">
          <div className="form-group col-sm-6">
            <label htmlFor="inputCity">City</label>
            <input
              type="text"
              className="form-control"
              id="inputCity"
              placeholder="Enter city"
              {...register("city", { required: true })}
            />
            {errors.city && (
              <small className="text-danger">City is required</small>
            )}
          </div>
          <div className="form-group col-sm-6">
            <label htmlFor="inputProvince">Province</label>
            <input
              type="text"
              className="form-control"
              id="inputProvince"
              placeholder="Enter province"
              {...register("province", { required: true })}
            />
            {errors.province && (
              <small className="text-danger">Province is required</small>
            )}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputDescription">Short Description</label>
          <textarea
            className="form-control"
            id="inputDescription"
            rows="5"
            placeholder="Enter short description max 200 characters"
            {...register("description", { required: true, maxLength: 200 })}
          ></textarea>
          {errors.description && (
            <small className="text-danger">Short description is required</small>
          )}
          {errors.description?.type === "maxLength" && (
            <small className="text-danger">
              Short description must be less than 200 characters
            </small>
          )}
        </div>
        <hr />
        <button
          type="submit"
          className="btn btn-outline-warning w-100"
          disabled={!isDirty}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default PersonalData;
