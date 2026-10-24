import { useId } from "react";
import { useForm } from "react-hook-form";

const emptyExperience = {
  position: "",
  company_name: "",
  working_start: "",
  working_end: "",
  description: "",
};

const ExperienceForm = ({
  initialValues = emptyExperience,
  onSubmit,
  onCancel,
  submitLabel,
  submitClassName = "btn btn-warning rounded-pill w-100",
}) => {
  const formId = useId();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { ...emptyExperience, ...initialValues },
  });

  const submitForm = handleSubmit(async (values) => {
    const succeeded = await onSubmit(values);
    if (!succeeded) return;

    if (onCancel) {
      onCancel();
    } else {
      reset({ ...emptyExperience, ...initialValues });
    }
  });

  return (
    <form onSubmit={submitForm} className="text-black-50">
      {initialValues.user_id && (
        <input type="hidden" {...register("user_id")} />
      )}
      <div className="form-group">
        <label htmlFor={`${formId}-position`}>
          Position <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id={`${formId}-position`}
          placeholder="Enter position"
          maxLength={100}
          {...register("position", { required: true, maxLength: 100 })}
        />
        {errors.position && (
          <small className="text-danger">
            {errors.position.type === "maxLength"
              ? "Position must be less than 100 characters"
              : "Position is required"}
          </small>
        )}
      </div>
      <div className="form-group">
        <label htmlFor={`${formId}-company`}>
          Company Name <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control"
          id={`${formId}-company`}
          placeholder="Enter company name"
          maxLength={100}
          {...register("company_name", { required: true, maxLength: 100 })}
        />
        {errors.company_name && (
          <small className="text-danger">
            {errors.company_name.type === "maxLength"
              ? "Company name must be less than 100 characters"
              : "Company name is required"}
          </small>
        )}
      </div>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor={`${formId}-start`}>
            Start Date <span className="text-danger">*</span>
          </label>
          <input
            type="date"
            className="form-control"
            id={`${formId}-start`}
            {...register("working_start", { required: true })}
          />
          {errors.working_start && (
            <small className="text-danger">
              Start date is required
            </small>
          )}
        </div>
        <div className="form-group col-md-6">
          <label htmlFor={`${formId}-end`}>
            End Date <span className="text-danger">*</span>
          </label>
          <input
            type="date"
            className="form-control"
            id={`${formId}-end`}
            {...register("working_end", { required: true })}
          />
          {errors.working_end && (
            <small className="text-danger">
              End date is required
            </small>
          )}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor={`${formId}-description`}>
          Description <span className="text-danger">*</span>
        </label>
        <textarea
          className="form-control"
          id={`${formId}-description`}
          rows={3}
          placeholder="Enter description"
          maxLength={200}
          {...register("description", { required: true, maxLength: 200 })}
        />
        {errors.description && (
          <small className="text-danger">
            {errors.description.type === "maxLength"
              ? "Description must be less than 200 characters"
              : "Description is required"}
          </small>
        )}
      </div>
      <hr />
      <div className="d-flex" style={{ gap: 8 }}>
        {onCancel && (
          <button
            type="button"
            className="btn btn-outline-secondary rounded-pill w-100"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className={submitClassName}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Menyimpan..." : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default ExperienceForm;
